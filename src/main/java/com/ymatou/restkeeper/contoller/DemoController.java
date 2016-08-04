/*
 *
 *  (C) Copyright 2016 Ymatou (http://www.ymatou.com/).
 *  All rights reserved.
 *
 */
package com.ymatou.restkeeper.contoller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ymatou.restkeeper.model.vo.DemoVo;

/**
 * 
 * @author qianmin 2016年8月2日 上午11:47:38
 *
 */
@RestController
@RequestMapping("/demo")
public class DemoController {
    
    private final static Logger logger = LoggerFactory.getLogger(DemoController.class);


    @RequestMapping(path = "/json", method = RequestMethod.POST,
            consumes="application/json", produces="application/json")
    public Object submit(@RequestBody DemoVo demoVo){
        demoVo.setName("resp:"+demoVo.getName());
        demoVo.setDesc("resp:"+demoVo.getDesc());
        return demoVo;
    }



}
