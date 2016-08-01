/*
 *
 * (C) Copyright 2016 Ymatou (http://www.ymatou.com/). All rights reserved.
 *
 */

package com.ymatou.restkeeper.contoller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ymatou.restkeeper.model.vo.AppVo;
import com.ymatou.restkeeper.model.vo.FunctionVo;
import com.ymatou.restkeeper.model.vo.GroupVo;
import com.ymatou.restkeeper.model.vo.IdNameVo;
import com.ymatou.restkeeper.util.WapperUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//import com.google.common.collect.Lists;
//import com.google.common.collect.Maps;


@RestController
@RequestMapping("/system")
public class SystemController {

    private final static Logger logger = LoggerFactory.getLogger(SystemController.class);

    @RequestMapping("/list")
    public Object list() {

        FunctionVo functionVo = new FunctionVo();
        functionVo.setId(1L);
        functionVo.setName("发送消息");

        FunctionVo functionVo2 = new FunctionVo();
        functionVo2.setId(2L);
        functionVo2.setName("发送消息2");

        FunctionVo functionVo3 = new FunctionVo();
        functionVo3.setId(3L);
        functionVo3.setName("发送消息3");


        AppVo appVo = new AppVo();
        appVo.setId(1L);
        appVo.setName("交易系统");
        AppVo appVo1 = new AppVo();
        appVo1.setId(2L);
        appVo1.setName("支付网关");

        appVo.getFunctions().add(functionVo);
        appVo.getFunctions().add(functionVo2);
        appVo.getFunctions().add(functionVo3);

        appVo1.getFunctions().add(functionVo);
        appVo1.getFunctions().add(functionVo2);
        appVo1.getFunctions().add(functionVo3);

        List<AppVo> appVos = new ArrayList<>();
        appVos.add(appVo);
        appVos.add(appVo1);

        return WapperUtil.success(appVos);
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
}
