/*
 *
 * (C) Copyright 2016 Ymatou (http://www.ymatou.com/). All rights reserved.
 *
 */

package com.ymatou.restkeeper.background;

import java.util.Date;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.orm.jpa.EntityManagerFactoryUtils;
import org.springframework.orm.jpa.EntityManagerHolder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import org.springframework.transaction.support.TransactionTemplate;
import org.springframework.util.CollectionUtils;

import com.ymatou.restkeeper.model.ExecStatusEnum;
import com.ymatou.restkeeper.model.pojo.Exection;
import com.ymatou.restkeeper.model.pojo.OperationLog;
import com.ymatou.restkeeper.service.ExectionService;
import com.ymatou.restkeeper.service.OperationLogService;
import com.ymatou.restkeeper.util.Constants;
import com.ymatou.restkeeper.util.HttpClientUtil;

/**
 * @author luoshiqian 2016/8/17 11:01
 */
@Component
public class Exections implements DisposableBean{

    private static final Logger logger = LoggerFactory.getLogger(Exections.class);

    @Autowired
    private ExectionService exectionService;
    @Autowired
    private OperationLogService operationLogService;
    @Autowired
    private TransactionTemplate transactionTemplate;
    @Autowired
    private EntityManagerFactory entityManagerFactory;
    private ExecutorService executorService = Executors.newFixedThreadPool(10);


    @PostConstruct
    public void start() {

        new Thread(() -> {

            logger.info("------------ start to exections ,threadName:{}-----------------------------------------",Thread.currentThread().getName());
            while (true) {

                List<Exection> exectionList = exectionService.findNeedExec(new PageRequest(0, 1000));

                logger.info("------------ find exections size:{},threadName:{} -----------------------------------------",
                        exectionList == null ? 0 : exectionList.size(),Thread.currentThread().getName());
                if (!CollectionUtils.isEmpty(exectionList)) {

                    CountDownLatch countDownLatch = new CountDownLatch(exectionList.size());
                    for (Exection exec : exectionList) {
                        executorService.execute(() -> {
                            try {
                                openEntity();
                                if (StringUtils.isNotBlank(exec.getJson())) {
                                    transactionTemplate.execute(status -> {
                                        int count = exectionService.updateToWait(exec.getId());

                                        if (count > 0) {

                                            String request = exec.getJson();
                                            String response = null;
                                            try {
                                                response = HttpClientUtil.sendPost(exec.getUrl(), request, Constants.APPLICATION_JSON);
                                                exec.setExecStatus(ExecStatusEnum.SUCCESS.name());
                                            } catch (Exception e1) {
                                                logger.error("error post :{}", request, e1);
                                                exec.setExecStatus(ExecStatusEnum.FAIL.name());
                                            }
                                            exectionService.save(exec);
                                            OperationLog operationLog = generateOperationLog(request, response);
                                            operationLogService.save(operationLog);
                                        }
                                        return null;
                                    });
                                }
                            } catch (Exception e1) {
                                logger.error("do exection error",e1);
                            } finally {
                                colseEntity();
                                countDownLatch.countDown();
                            }
                        });
                    }

                    try {
                        countDownLatch.await(180,TimeUnit.SECONDS); //最多等待3分钟
                    } catch (InterruptedException e) {
                        logger.error("InterruptedException", e);
                    }

                } else {
                    try {
                        TimeUnit.SECONDS.sleep(60);
                    } catch (InterruptedException e) {
                        logger.error("InterruptedException", e);
                    }
                }
            }
        }).start();
    }


    private OperationLog generateOperationLog(String request, String response) {
        OperationLog operationLog = new OperationLog();
        operationLog.setOperateTime(new Date());
        operationLog.setRequest(request);
        operationLog.setResponse(response);
        operationLog.setUserId(0L);
        operationLog.setUserName("system");
        return operationLog;
    }


    private void openEntity(){
        EntityManager em = entityManagerFactory.createEntityManager();
        EntityManagerHolder emHolder = new EntityManagerHolder(em);
        TransactionSynchronizationManager.bindResource(entityManagerFactory, emHolder);
    }

    private void colseEntity(){
        EntityManagerHolder emHolder = (EntityManagerHolder)
                TransactionSynchronizationManager.unbindResource(entityManagerFactory);
        logger.debug("Closing JPA EntityManager in OpenEntityManagerInViewInterceptor");
        EntityManagerFactoryUtils.closeEntityManager(emHolder.getEntityManager());
    }


    @Override
    public void destroy() throws Exception {
        executorService.shutdown();
    }
}
