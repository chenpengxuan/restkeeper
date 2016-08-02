/*
 *
 *  (C) Copyright 2016 Ymatou (http://www.ymatou.com/).
 *  All rights reserved.
 *
 */

package com.ymatou.restkeeper.shiro;


import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

import com.ymatou.restkeeper.exception.BaseRunTimeException;
import com.ymatou.restkeeper.model.pojo.User;
import com.ymatou.restkeeper.service.UserService;


public class MyAuthorizingRealm extends AuthorizingRealm {

    private static Log logger = LogFactory.getLog(MyAuthorizingRealm.class);

    @Autowired
    private UserService userService;

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        return null;
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        UsernamePasswordToken authcToken = (UsernamePasswordToken) token;

        String email = authcToken.getUsername();
        String password = String.valueOf(authcToken.getPassword());

        logger.info("login email : "+email);

        if(StringUtils.isNotBlank(email) && StringUtils.isNotBlank(password)){
            User user = userService.getUser(email, password);

            if(user != null){

                return new SimpleAuthenticationInfo(user.getUsername(), user.getPassword(), getName());
            }else {
                throw new BaseRunTimeException("用户名或密码错误");
            }
        }

        return null;
    }
}
