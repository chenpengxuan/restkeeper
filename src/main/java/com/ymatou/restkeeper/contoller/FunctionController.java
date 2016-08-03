/*
 * (C) Copyright 2016 Ymatou (http://www.ymatou.com/). All rights reserved.
 */
package com.ymatou.restkeeper.contoller;

import java.util.ArrayList;
import java.util.List;

import com.ymatou.restkeeper.model.StatusEnum;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
import com.ymatou.restkeeper.util.CurrentUserUtil;
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

        functionService.saveFunction(functionVo);

        return WapperUtil.success();
    }

    @RequestMapping(path = "/list")
    public Object list(FunctionVo functionVo, Pageable pageable){

        functionVo.setStatus(StatusEnum.ENABLE.name());
        Page<FunctionVo> functionPage = functionService.list(functionVo,pageable);

        return WapperUtil.success(functionPage);
    }


    @RequestMapping(path = "/get")
    public Object get(Long id){
        Function function = functionService.findById(id);

        FunctionVo functionVo = new FunctionVo();
        BeanUtils.copyProperties(function,functionVo);

        functionVo.setFunctionParams(functionParamService.findByFunctionId(id));

        return WapperUtil.success(functionVo);
    }

    @RequestMapping(path = "/delete")
    public Object delete(Long id){
        Function function = functionService.findById(id);

        function.setStatus(StatusEnum.DISABLE.name());
        functionService.save(function);

        return WapperUtil.success("删除成功");
    }

}
