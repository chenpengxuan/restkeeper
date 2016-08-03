/*
 * (C) Copyright 2016 Ymatou (http://www.ymatou.com/). All rights reserved.
 */
package com.ymatou.restkeeper.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ymatou.restkeeper.model.pojo.OperationLog;
import com.ymatou.restkeeper.model.vo.OperationLogVo;

/**
 * 
 * @author qianmin 2016年8月2日 下午1:55:03
 *
 */
public interface OperationLogService extends BaseService<OperationLog>{
  
    Page<OperationLogVo> findByOperationLogVo(OperationLogVo operationLog, Pageable pageable);
}
