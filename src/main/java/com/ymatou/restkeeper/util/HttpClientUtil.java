/*
 * (C) Copyright 2016 Ymatou (http://www.ymatou.com/). All rights reserved.
 */
package com.ymatou.restkeeper.util;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 
 * @author qianmin 2016年8月2日 下午12:02:25
 *
 */
public class HttpClientUtil {

    private static Logger logger = LoggerFactory.getLogger(HttpClientUtil.class);

    /**
     * 发送Get请求
     * 
     * @param url
     * @param httpClient
     * @return
     * @throws IOException
     */
    public static String sendGet(String url, HttpClient httpClient) throws IOException {
        String result = null;

        HttpGet httpGet = new HttpGet(url);
        logger.info("executing request" + httpGet.getRequestLine());
        logger.info("request header: " + Arrays.toString(httpGet.getAllHeaders()));

        try {
            HttpResponse response = httpClient.execute(httpGet);
            HttpEntity entity = response.getEntity();
            result = EntityUtils.toString(entity, "UTF-8");
            logger.info("response message:" + result);
        } finally {
            httpGet.releaseConnection();
        }

        return result;
    }


    /**
     * 发送Post请求
     * 
     * @param url
     * @param body
     * @param contentType
     * @param header
     * @param httpClient
     * @return
     * @throws IOException
     */
    public static String sendPost(String url, String body, String contentType, HashMap<String, String> header,
            HttpClient httpClient) throws IOException {
        String result = null;

        HttpPost httpPost = new HttpPost(url);
        StringEntity postEntity = new StringEntity(body, "UTF-8");
        httpPost.setEntity(postEntity); // set request body
        httpPost.addHeader("Content-Type", contentType); // 设置body类型

        logger.info("executing request" + httpPost.getRequestLine());
        logger.info("request header: " + Arrays.toString(httpPost.getAllHeaders()));
        logger.info("request body: " + body);

        try {
            HttpResponse response = httpClient.execute(httpPost);
            HttpEntity entity = response.getEntity();
            result = EntityUtils.toString(entity, "UTF-8");
            logger.info("response message:" + result);
        } finally {
            httpPost.releaseConnection();
        }

        return result;
    }
}
