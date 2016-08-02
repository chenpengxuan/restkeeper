/*
 * (C) Copyright 2016 Ymatou (http://www.ymatou.com/). All rights reserved.
 */
package com.ymatou.restkeeper.service;

import com.ymatou.restkeeper.model.pojo.Function;
import com.ymatou.restkeeper.model.vo.FunctionVo;

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
    String submit(FunctionVo function);
}
