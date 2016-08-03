/*
 *
 *  (C) Copyright 2016 Ymatou (http://www.ymatou.com/).
 *  All rights reserved.
 *
 */

package com.ymatou.restkeeper.dao.mapper;

import java.util.List;

import com.ymatou.restkeeper.model.vo.FunctionVo;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ymatou.common.mybatis.annotation.MyBatisDao;
import com.ymatou.restkeeper.model.pojo.Function;


@MyBatisDao
public interface FunctionMapper {

    List<Function> findByFunction(@Param("function") Function function);

    Page<Function> findByFunction(@Param("function") Function function, @Param("pageable") Pageable pageable);

    Page<FunctionVo> findByFunctionVo(@Param("function") FunctionVo function, @Param("pageable") Pageable pageable);

}
