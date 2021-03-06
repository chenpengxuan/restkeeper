/*
 *
 *  (C) Copyright 2016 Ymatou (http://www.ymatou.com/).
 *  All rights reserved.
 *
 */
package com.ymatou.restkeeper.service;

import com.ymatou.restkeeper.model.pojo.Application;
import com.ymatou.restkeeper.model.vo.AppVo;

import java.util.List;

/**
 * 
 * @author qianmin 2016年8月2日 下午1:55:03
 *
 */
public interface ApplicationService extends BaseService<Application>{

    List<AppVo> listAppForMenu();

}
