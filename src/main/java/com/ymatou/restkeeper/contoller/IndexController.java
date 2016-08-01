/*
 *
 *  (C) Copyright 2016 Ymatou (http://www.ymatou.com/).
 *  All rights reserved.
 *
 */

package com.ymatou.restkeeper.contoller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("")
public class IndexController {

    private final static Logger logger = LoggerFactory.getLogger(IndexController.class);
//
//    @Autowired
//    private UserService userService;

    @RequestMapping("/")
    public String index(){

        return "forward:/login.html";
    }

//    @RequestMapping("/test")
//    @ResponseBody
//    public Object test(){
//
//        Page<User> page1 = userService.findByPage(new PageRequest(0,10));
//        Page<User> page2 = userService.findByUser(new User(),new PageRequest(0,10));
//        return new Object[]{page1,page2};
//    }

}
