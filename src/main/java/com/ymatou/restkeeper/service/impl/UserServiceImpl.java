/*
 *
 *  (C) Copyright 2016 Ymatou (http://www.ymatou.com/).
 *  All rights reserved.
 *
 */

package com.ymatou.restkeeper.service.impl;

import com.ymatou.restkeeper.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ymatou.restkeeper.dao.jpa.UserRepository;
import com.ymatou.restkeeper.dao.mapper.UserMapper;
import com.ymatou.restkeeper.model.pojo.User;


@Service
public class UserServiceImpl extends BaseServiceImpl<User> implements UserService {

	private UserRepository userRepository;
	
	@Autowired
	private UserMapper userMapper;

	@Autowired
	public UserServiceImpl(UserRepository userRepository){
			super(userRepository);
			this.userRepository = userRepository;
	}

	@Override
	public Page<User> findByUser(User user, Pageable pageable) {
		return userMapper.findByUser(user,pageable);
	}

	@Override
	public User getUser(String username, String password) {
		return userRepository.findByUsernameAndPassword(username,password);
	}
	
	public User getUser(String username) {
	    return userRepository.findByUsername(username);
	};
}
