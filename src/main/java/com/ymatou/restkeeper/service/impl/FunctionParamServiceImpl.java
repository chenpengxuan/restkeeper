/*
 *
 *  (C) Copyright 2016 Ymatou (http://www.ymatou.com/).
 *  All rights reserved.
 *
 */
package com.ymatou.restkeeper.service.impl;

import com.ymatou.restkeeper.model.vo.FunctionParamVo;
import com.ymatou.restkeeper.util.Converter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ymatou.restkeeper.dao.jpa.FunctionParamRepository;
import com.ymatou.restkeeper.model.pojo.FunctionParam;
import com.ymatou.restkeeper.service.FunctionParamService;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * 
 * @author qianmin 2016年8月2日 下午2:34:44
 *
 */
@Service
public class FunctionParamServiceImpl extends BaseServiceImpl<FunctionParam> implements FunctionParamService {

    private static final Logger logger = LoggerFactory.getLogger(FunctionParamServiceImpl.class);

    private FunctionParamRepository repository;

    @Autowired
    public FunctionParamServiceImpl(FunctionParamRepository repository) {
        super(repository);
        this.repository = repository;
    }


    @Override
    public List<FunctionParamVo> findByFunctionId(Long functionId) {
        List<FunctionParamVo> functionParamVoList = new ArrayList<>();
        List<FunctionParam> paramList = repository.findByFunctionId(functionId);
        if(!CollectionUtils.isEmpty(paramList)){
            paramList.forEach(functionParam -> {
                functionParamVoList.add(Converter.convert(functionParam,FunctionParamVo.class));
            });
        }
        return functionParamVoList;
    }
}
