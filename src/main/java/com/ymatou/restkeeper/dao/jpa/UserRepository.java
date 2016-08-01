/*
 *
 *  (C) Copyright 2016 Ymatou (http://www.ymatou.com/).
 *  All rights reserved.
 *
 */

package com.ymatou.restkeeper.dao.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ymatou.restkeeper.model.pojo.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long>{

}