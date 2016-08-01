/*
 *
 *  (C) Copyright 2016 Ymatou (http://www.ymatou.com/).
 *  All rights reserved.
 *
 */

package com.ymatou.restkeeper.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.request.RequestContextListener;

import javax.servlet.http.HttpSessionListener;


@Configuration
public class ApplicationListener {

    @Bean
    public RequestContextListener requestContextListener(){
        return new RequestContextListener();
    }
    @Bean
    public HttpSessionListener httpSessionListener(){
        return new SessionListener();
    }

}
