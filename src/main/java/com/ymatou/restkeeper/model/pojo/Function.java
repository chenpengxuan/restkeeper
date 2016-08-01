/*
 *
 *  (C) Copyright 2016 Ymatou (http://www.ymatou.com/).
 *  All rights reserved.
 *
 */

package com.ymatou.restkeeper.model.pojo;

import javax.persistence.*;

/**
 * @author luoshiqian 2016/8/1 18:09
 */
@Entity
@Table(name = "function")
public class Function extends Audit {

    @Id
    @Column(name = "function_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;
    @Column(name = "application_id")
    protected Long applicationId;

    @Column(name = "name")
    protected String name;

    @Column(name = "description")
    protected String description;

    @Column(name = "url")
    protected String url;

    @Column(name = "http_method")
    protected String httpMethod;

    @Column(name = "content_type")
    protected String contentType;

    @Column(name = "author")
    protected String author;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(Long applicationId) {
        this.applicationId = applicationId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getHttpMethod() {
        return httpMethod;
    }

    public void setHttpMethod(String httpMethod) {
        this.httpMethod = httpMethod;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}
