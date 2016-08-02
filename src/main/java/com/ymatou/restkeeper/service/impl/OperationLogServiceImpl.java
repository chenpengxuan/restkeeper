/*
 * (C) Copyright 2016 Ymatou (http://www.ymatou.com/). All rights reserved.
 */
package com.ymatou.restkeeper.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ymatou.restkeeper.dao.jpa.OperationLogRepository;
import com.ymatou.restkeeper.model.pojo.OperationLog;
import com.ymatou.restkeeper.service.OperationLogService;

/**
 * 
 * @author qianmin 2016年8月2日 下午1:55:59
 *
 */
@Service
public class OperationLogServiceImpl extends BaseServiceImpl<OperationLog> implements OperationLogService {

    private OperationLogRepository operationLogRepository;

    @Autowired
    public OperationLogServiceImpl(OperationLogRepository operationLogRepository) {
        super(operationLogRepository);
        this.operationLogRepository = operationLogRepository;
    }

}
