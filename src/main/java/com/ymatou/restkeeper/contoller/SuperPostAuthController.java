/*
 *
 *  (C) Copyright 2016 Ymatou (http://www.ymatou.com/).
 *  All rights reserved.
 *
 */
package com.ymatou.restkeeper.contoller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ymatou.restkeeper.service.FunctionParamService;
import com.ymatou.restkeeper.service.FunctionService;

/**
 * 
 * @author luoshiqian 2016年8月2日 上午11:47:38
 *
 */
@RestController
@RequestMapping("/superPost")
public class SuperPostAuthController {
    
    private final static Logger logger = LoggerFactory.getLogger(SuperPostAuthController.class);

    
    @Autowired
    private FunctionService functionService;
    @Autowired
    private FunctionParamService functionParamService;

    @RequestMapping(path = "/auth")
    public Object auth(){
        return "success";
    }


}
