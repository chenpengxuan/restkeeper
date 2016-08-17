/*
 *
 *  (C) Copyright 2016 Ymatou (http://www.ymatou.com/).
 *  All rights reserved.
 *
 */

package com.ymatou.restkeeper.service;

import com.ymatou.restkeeper.model.pojo.Exection;
import com.ymatou.restkeeper.model.pojo.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface ExectionService extends BaseService<Exection> {


    List<Exection> findNeedExec(Pageable pageable);

    int updateToWait(Long id);

    int updateExecStatus(Long id,String execStatus);

}
