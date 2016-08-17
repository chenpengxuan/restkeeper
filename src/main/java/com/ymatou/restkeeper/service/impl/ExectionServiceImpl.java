/*
 *
 *  (C) Copyright 2016 Ymatou (http://www.ymatou.com/).
 *  All rights reserved.
 *
 */

package com.ymatou.restkeeper.service.impl;

import com.ymatou.restkeeper.model.ExecStatusEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ymatou.restkeeper.dao.jpa.ExectionRepository;
import com.ymatou.restkeeper.model.pojo.Exection;
import com.ymatou.restkeeper.service.ExectionService;

import java.util.List;

/**
 * @author luoshiqian 2016/8/17 11:26
 */
@Service
public class ExectionServiceImpl extends BaseServiceImpl<Exection> implements ExectionService{

    private ExectionRepository repository;

    @Autowired
    public ExectionServiceImpl(ExectionRepository repository) {
        super(repository);
        this.repository = repository;
    }

    @Override
    public List<Exection> findNeedExec(Pageable pageable) {
        return repository.findByExecStatus(ExecStatusEnum.INIT.name(),pageable);
    }

    @Override
    public int updateToWait(Long id) {
        return repository.updateToWait(id);
    }

    @Override
    public int updateExecStatus(Long id, String execStatus) {
        return repository.updateToExecStatus(id,execStatus);
    }
}
