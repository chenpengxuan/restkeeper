/*
 *
 *  (C) Copyright 2016 Ymatou (http://www.ymatou.com/).
 *  All rights reserved.
 *
 */
package com.ymatou.restkeeper.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ymatou.restkeeper.dao.jpa.ApplicationRepository;
import com.ymatou.restkeeper.model.pojo.Application;
import com.ymatou.restkeeper.service.ApplicationService;


@Service
public class ApplicationServiceImpl extends BaseServiceImpl<Application> implements ApplicationService {

    private ApplicationRepository repository;

    @Autowired
    public ApplicationServiceImpl(ApplicationRepository repository) {
        super(repository);
        this.repository = repository;
    }

}
