/*
 * (C) Copyright 2016 Ymatou (http://www.ymatou.com/). All rights reserved.
 */
package com.ymatou.restkeeper.service;

import com.ymatou.restkeeper.model.pojo.Function;
import com.ymatou.restkeeper.model.vo.FunctionVo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Map;

/**
 * 
 * @author qianmin 2016年8月2日 下午2:33:48
 *
 */
public interface FunctionService extends BaseService<Function>{
    
    /**
     * 提交请求
     * 
     * @param function
     * @return
     */
    Map submit(FunctionVo function);

    Page<Function> list(Function function, Pageable pageable);

    Page<FunctionVo> list(FunctionVo functionVo, Pageable pageable);

    void saveFunction(FunctionVo functionVo);
}
