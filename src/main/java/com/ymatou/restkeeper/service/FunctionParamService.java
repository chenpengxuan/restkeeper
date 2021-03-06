/*
 *
 *  (C) Copyright 2016 Ymatou (http://www.ymatou.com/).
 *  All rights reserved.
 *
 */
package com.ymatou.restkeeper.service;

import com.ymatou.restkeeper.model.pojo.FunctionParam;
import com.ymatou.restkeeper.model.vo.FunctionParamVo;

import java.util.List;

/**
 * 
 * @author qianmin 2016年8月2日 下午2:33:48
 *
 */
public interface FunctionParamService extends BaseService<FunctionParam>{

    List<FunctionParamVo> findByFunctionId(Long functionId);

}
