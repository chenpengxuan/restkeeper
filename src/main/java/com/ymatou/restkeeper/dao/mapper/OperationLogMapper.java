/*
 * (C) Copyright 2016 Ymatou (http://www.ymatou.com/). All rights reserved.
 */
package com.ymatou.restkeeper.dao.mapper;

import org.apache.ibatis.annotations.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ymatou.common.mybatis.annotation.MyBatisDao;
import com.ymatou.restkeeper.model.pojo.OperationLog;
import com.ymatou.restkeeper.model.vo.OperationLogVo;

/**
 * 
 * @author qianmin 2016年8月3日 下午4:24:51
 *
 */
@MyBatisDao
public interface OperationLogMapper {
    
    Page<OperationLogVo> findByOperationLogVo(@Param("operationLog") OperationLogVo operationLog, @Param("pageable") Pageable pageable);
}
