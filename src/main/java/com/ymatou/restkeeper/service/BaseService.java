/*
 *
 *  (C) Copyright 2016 Ymatou (http://www.ymatou.com/).
 *  All rights reserved.
 *
 */

package com.ymatou.restkeeper.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface BaseService<T>{

    void save(T t);

    void deleteById(Long id);

    void delete(T t);

    T findById(Long id);

    void saveAll(Iterable<T> entities);

    Page<T> findByPage(Pageable pageable);

}
