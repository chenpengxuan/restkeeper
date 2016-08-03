/*
 *
 *  (C) Copyright 2016 Ymatou (http://www.ymatou.com/).
 *  All rights reserved.
 *
 */
package com.ymatou.restkeeper.dao.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ymatou.restkeeper.model.pojo.FunctionParam;

/**
 * 
 * @author qianmin 2016年8月2日 下午2:35:52
 *
 */
@Repository
public interface FunctionParamRepository extends JpaRepository<FunctionParam,Long>{


    List<FunctionParam> findByFunctionIdAndStatus(Long functionId,String status);

    @Modifying
    @Query("update FunctionParam f set f.status = 'DISABLE' where f.functionId = ?1 and f.status = 'ENABLE'")
    void disableParamByFunctionId(Long functionId);
}
