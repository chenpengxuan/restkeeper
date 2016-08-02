/*
 *
 *  (C) Copyright 2016 Ymatou (http://www.ymatou.com/).
 *  All rights reserved.
 *
 */
package com.ymatou.restkeeper.dao.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ymatou.restkeeper.model.pojo.FunctionParam;

import java.util.List;

/**
 * 
 * @author qianmin 2016年8月2日 下午2:35:52
 *
 */
@Repository
public interface FunctionParamRepository extends JpaRepository<FunctionParam,Long>{

    List<FunctionParam> findByFunctionId(Long functionId);
}
