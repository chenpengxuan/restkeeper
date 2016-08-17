/*
 *
 *  (C) Copyright 2016 Ymatou (http://www.ymatou.com/).
 *  All rights reserved.
 *
 */

package com.ymatou.restkeeper.dao.jpa;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ymatou.restkeeper.model.pojo.Exection;

@Repository
public interface ExectionRepository extends JpaRepository<Exection,Long>{

    List<Exection> findByExecStatus(String execStatus, Pageable pageable);


    @Modifying
    @Query("update Exection e set e.execStatus = 'WAIT' where e.id = ?1 and e.execStatus = 'INIT'")
    int updateToWait(Long id);


    @Modifying
    @Query("update Exection e set e.execStatus = ?2 where e.id = ?1 and e.execStatus != ?2")
    int updateToExecStatus(Long id,String execStatus);
}