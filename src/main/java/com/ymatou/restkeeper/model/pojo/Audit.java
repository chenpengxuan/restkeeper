/*
 *
 *  (C) Copyright 2016 Ymatou (http://www.ymatou.com/).
 *  All rights reserved.
 *
 */

package com.ymatou.restkeeper.model.pojo;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 *
 * @desc  审计类
 */
@MappedSuperclass
public class Audit {


    @Column(name="create_time",updatable=false)
    @JsonFormat(pattern = "yyyy-MM-dd")
    protected Date createTime;
    @Column(name="update_time")
    @JsonFormat(pattern = "yyyy-MM-dd")
    protected Date updateTime;

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    @PreUpdate
    public void preUpdate(){
        setUpdateTime(new Date());
    }

    @PrePersist
    public void PrePersist() {
        setCreateTime(new Date());
        setUpdateTime(new Date());
    }

}
