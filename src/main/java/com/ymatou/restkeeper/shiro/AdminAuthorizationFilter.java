/*
 *
 *  (C) Copyright 2016 Ymatou (http://www.ymatou.com/).
 *  All rights reserved.
 *
 */

package com.ymatou.restkeeper.shiro;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.apache.shiro.web.filter.authz.AuthorizationFilter;

import com.ymatou.restkeeper.model.pojo.User;
import com.ymatou.restkeeper.util.CurrentUserUtil;


public class AdminAuthorizationFilter extends AuthorizationFilter {

    @Override
    protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue) throws Exception {
        User user = CurrentUserUtil.getCurrentUser();

        if(user != null){
            return true;
        }

        return false;
    }

}
