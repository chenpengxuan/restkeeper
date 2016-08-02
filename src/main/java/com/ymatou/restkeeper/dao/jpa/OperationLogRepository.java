/*
 * (C) Copyright 2016 Ymatou (http://www.ymatou.com/). All rights reserved.
 */
package com.ymatou.restkeeper.dao.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ymatou.restkeeper.model.pojo.OperationLog;

/**
 * 
 * @author qianmin 2016年8月2日 下午1:58:28
 *
 */
public interface OperationLogRepository extends JpaRepository<OperationLog, Long>{

}
