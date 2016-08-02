/*
 * (C) Copyright 2016 Ymatou (http://www.ymatou.com/). All rights reserved.
 */
package com.ymatou.restkeeper.contoller;

import java.util.ArrayList;
import java.util.List;

import com.ymatou.restkeeper.util.CurrentUserUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ymatou.restkeeper.model.pojo.Function;
import com.ymatou.restkeeper.model.pojo.FunctionParam;
import com.ymatou.restkeeper.model.vo.FunctionParamVo;
import com.ymatou.restkeeper.model.vo.FunctionVo;
import com.ymatou.restkeeper.service.FunctionParamService;
import com.ymatou.restkeeper.service.FunctionService;
import com.ymatou.restkeeper.util.WapperUtil;

/**
 * 
 * @author qianmin 2016年8月2日 上午11:47:38
 *
 */
@RestController
@RequestMapping("/function")
public class FunctionController {
    
    private final static Logger logger = LoggerFactory.getLogger(FunctionController.class);

    
    @Autowired
    private FunctionService functionService;
    @Autowired
    private FunctionParamService functionParamService;

    @RequestMapping(path = "/submit", method = RequestMethod.POST, 
            consumes="application/json", produces="application/json")
    public Object submit(@RequestBody FunctionVo function){
        
        String result = functionService.submit(function);
        
        return WapperUtil.success(result);
    }


    @RequestMapping(path = "/save", method = RequestMethod.POST,
            consumes="application/json", produces="application/json")
    public Object save(@RequestBody FunctionVo functionVo){

        Function function = new Function();
        BeanUtils.copyProperties(functionVo,function);
        function.setApplicationId(1L);
        function.setAuthor(CurrentUserUtil.getCurrentUser().getUsername());
        functionService.save(function);

        List<FunctionParamVo> functionParamVoList = functionVo.getFunctionParams();

        List<FunctionParam> paramList = new ArrayList<>();
        functionParamVoList.forEach(functionParamVo -> {
            FunctionParam param = new FunctionParam();
            BeanUtils.copyProperties(functionParamVo,param);
            param.setFunctionId(function.getId());
            paramList.add(param);
        });

        functionParamService.saveAll(paramList);

        System.out.println(functionVo);
        return null;
    }

}
