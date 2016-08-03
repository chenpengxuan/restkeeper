/*
 *
 * (C) Copyright 2016 Ymatou (http://www.ymatou.com/). All rights reserved.
 *
 */

package com.ymatou.restkeeper.contoller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ymatou.restkeeper.model.pojo.Application;
import com.ymatou.restkeeper.model.vo.AppVo;
import com.ymatou.restkeeper.model.vo.FunctionVo;
import com.ymatou.restkeeper.service.ApplicationService;
import com.ymatou.restkeeper.util.WapperUtil;


@RestController
@RequestMapping("/application")
public class ApplicationController {

    private final static Logger logger = LoggerFactory.getLogger(ApplicationController.class);
    @Autowired
    private ApplicationService applicationService;

    @RequestMapping("/listAppForMenu")
    public Object list() {

        List<AppVo> appVoList = applicationService.listAppForMenu();
        return WapperUtil.success(appVoList);
    }

    @RequestMapping("/listFunc")
    public Object listFunc(Pageable pageable){

        List<FunctionVo> list = new ArrayList<>();
        for(int i=0;i<30;i++){
            FunctionVo functionVo = new FunctionVo();
            functionVo.setId(Long.valueOf(i));
            functionVo.setName("发送消息"+i);
            list.add(functionVo);
        }
        List<FunctionVo> newList = list.subList
                (pageable.getPageNumber() * pageable.getPageSize(),
                        (pageable.getPageNumber() + 1) * pageable.getPageSize());
        Page<FunctionVo> page = new PageImpl<FunctionVo>(newList,pageable,list.size());
        return WapperUtil.success(page);
    }

    @RequestMapping("/getAll")
    public Object getAll(){
        List<Application> applications = applicationService.findAll();
        return WapperUtil.success(applications);
    }
}
