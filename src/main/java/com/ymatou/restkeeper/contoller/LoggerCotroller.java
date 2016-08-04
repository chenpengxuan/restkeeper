/*
 * (C) Copyright 2016 Ymatou (http://www.ymatou.com/). All rights reserved.
 */
package com.ymatou.restkeeper.contoller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ymatou.restkeeper.model.pojo.OperationLog;
import com.ymatou.restkeeper.model.vo.OperationLogVo;
import com.ymatou.restkeeper.service.OperationLogService;
import com.ymatou.restkeeper.util.WapperUtil;

/**
 * 
 * @author qianmin 2016年8月3日 下午4:18:00
 *
 */
@RestController
@RequestMapping("/logger")
public class LoggerCotroller {

    @Autowired
    private OperationLogService operationLogService;

    @RequestMapping(path = "/list")
    public Object listLogger(OperationLogVo operationLog, Pageable pageable) {

        Page<OperationLogVo> operationLogVoPage = operationLogService.findByOperationLogVo(operationLog, pageable);

        return WapperUtil.success(operationLogVoPage);
    }
}
