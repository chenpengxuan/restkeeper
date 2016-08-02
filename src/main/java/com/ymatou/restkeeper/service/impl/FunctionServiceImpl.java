/*
 * (C) Copyright 2016 Ymatou (http://www.ymatou.com/). All rights reserved.
 */
package com.ymatou.restkeeper.service.impl;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.ymatou.restkeeper.dao.jpa.FunctionRepository;
import com.ymatou.restkeeper.model.pojo.Function;
import com.ymatou.restkeeper.model.pojo.OperationLog;
import com.ymatou.restkeeper.model.vo.FunctionParamVo;
import com.ymatou.restkeeper.model.vo.FunctionVo;
import com.ymatou.restkeeper.service.FunctionService;
import com.ymatou.restkeeper.service.OperationLogService;
import com.ymatou.restkeeper.util.Constants;
import com.ymatou.restkeeper.util.CurrentUserUtil;
import com.ymatou.restkeeper.util.HttpClientUtil;

/**
 * 
 * @author qianmin 2016年8月2日 下午2:34:44
 *
 */
@Service
public class FunctionServiceImpl extends BaseServiceImpl<Function> implements FunctionService {

    private static final Logger logger = LoggerFactory.getLogger(FunctionServiceImpl.class);

    private FunctionRepository functionRepository;

    @Autowired
    private OperationLogService OperationLogService;

    @Autowired
    public FunctionServiceImpl(FunctionRepository functionRepository) {
        super(functionRepository);
        this.functionRepository = functionRepository;
    }

    @Override
    public String submit(FunctionVo function) {
        String request = null;
        String response = null;

        String url = function.getUrl();
        String contentType = function.getContentType();
        String paramJson = function.getFunctionParam();
        Map<String, Object> paramMap = getParamMap(function);
        try {
            if (Constants.HTTP_METHOD_GET.equals(function.getHttpMethod())) { // get
                
                response = HttpClientUtil.sendGet(function.getUrl(), paramMap);
                
            } else if (Constants.HTTP_METHOD_POST.equals(function.getHttpMethod())) { // post

                if (Constants.APPLICATION_JSON.equals(contentType)) { // post json
                    request = StringUtils.isBlank(paramJson) ? JSON.toJSONString(paramMap) : paramJson;
                    response = HttpClientUtil.sendPost(function.getUrl(), request, contentType);
                } else if (Constants.APPLICATION_FORM_URLENCODED.equals(contentType)) { // post form
                    response = HttpClientUtil.sendPost(url, paramMap, contentType);
                }else{
                    throw new Exception("HttpMethod not supported.");
                }
                
            }else{
                throw new Exception("ContentType not supported.");
            }
        } catch (Exception e) {
            logger.error("submit request failed. ", e);
            response = e.toString();
        }

        OperationLog operationLog = generateOperationLog(function, request, response);
        OperationLogService.save(operationLog);

        return response;
    }

    private Map<String, Object> getParamMap(FunctionVo function) {
        HashMap<String, Object> paramMap = new HashMap<>();
        for (FunctionParamVo functionParam : function.getFunctionParams()) {
            String name = functionParam.getName();
            String type = functionParam.getType();
            String format = functionParam.getFormat();
            Object value = functionParam.getValue();
            if (functionParam.isArray()) {
                value = Arrays.asList(value.toString().split(","))
                        .stream().map(v -> format(type, format, v)).collect(Collectors.toList());
            } else {
                value = format(type, format, value);
            }
            paramMap.put(name, value);
        }

        return paramMap;
    }

    private Object format(String type, String format, Object original) {
        Object result = null;
        switch (type) {
            case Constants.FORMAT_STRING:
                result = String.valueOf(original);
                break;
            case Constants.FORMAT_NUMBER:
                result = new BigDecimal(String.valueOf(original));
                break;
            case Constants.FORMAT_DATE:
                result = new SimpleDateFormat(format).format(original);
                break;
            default:
                break;
        }
        return result;
    }

    private OperationLog generateOperationLog(FunctionVo function, String request, String response) {
        OperationLog operationLog = new OperationLog();
        operationLog.setCreateTime(new Date());
        operationLog.setUpdateTime(new Date());
        operationLog.setOperateTime(new Date());
        operationLog.setFunctionId(function.getId());
        operationLog.setRequest(request);
        operationLog.setResponse(response);
        operationLog.setUserId(CurrentUserUtil.getCurrentUserId());
        operationLog.setUserName(CurrentUserUtil.getCurrentUserName());
        return operationLog;
    }

}
