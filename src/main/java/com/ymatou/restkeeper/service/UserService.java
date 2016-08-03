/*
 *
 *  (C) Copyright 2016 Ymatou (http://www.ymatou.com/).
 *  All rights reserved.
 *
 */

package com.ymatou.restkeeper.service;

import com.ymatou.restkeeper.model.pojo.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface UserService extends BaseService<User> {

    Page<User> findByUser(User user, Pageable pageable);

    User getUser(String username,String password);
    
    User getUser(String username);
}
