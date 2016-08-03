/*
 *
 *  (C) Copyright 2016 Ymatou (http://www.ymatou.com/).
 *  All rights reserved.
 *
 */
package com.ymatou.restkeeper.service.impl;

import com.ymatou.restkeeper.dao.jpa.FunctionRepository;
import com.ymatou.restkeeper.model.StatusEnum;
import com.ymatou.restkeeper.model.pojo.Function;
import com.ymatou.restkeeper.model.vo.AppVo;
import com.ymatou.restkeeper.model.vo.FunctionVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ymatou.restkeeper.dao.jpa.ApplicationRepository;
import com.ymatou.restkeeper.model.pojo.Application;
import com.ymatou.restkeeper.service.ApplicationService;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;


@Service
public class ApplicationServiceImpl extends BaseServiceImpl<Application> implements ApplicationService {

    private ApplicationRepository repository;
    @Autowired
    private FunctionRepository functionRepository;

    @Autowired
    public ApplicationServiceImpl(ApplicationRepository repository) {
        super(repository);
        this.repository = repository;
    }

    @Override
    public List<AppVo> listAppForMenu() {
        List<Application> applicationList = repository.findAll();
        List<AppVo> appVoList = new ArrayList<>();
        if (!CollectionUtils.isEmpty(applicationList)) {
            applicationList.forEach(application -> {
                AppVo appVo = new AppVo();
                appVo.setName(application.getName());
                appVo.setId(application.getId());

                List<Function> functionList = functionRepository.findByApplicationIdAndStatus(application.getId(), StatusEnum.ENABLE.name());

                if (!CollectionUtils.isEmpty(functionList)) {
                    functionList.forEach(function -> {

                        FunctionVo functionVo = new FunctionVo();
                        functionVo.setId(function.getId());
                        functionVo.setName(function.getName());

                        appVo.getFunctions().add(functionVo);
                    });
                }
                appVoList.add(appVo);
            });
        }
        return appVoList;
    }
}
