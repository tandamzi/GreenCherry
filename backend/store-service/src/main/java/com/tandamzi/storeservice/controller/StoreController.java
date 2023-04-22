package com.tandamzi.storeservice.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/store")
public class StoreController {
    @RequestMapping("/test")
    public String test() {
        return "Hello World";
    }

    @PostMapping("")
    public String registerStore() {
        return "Hello World";
    }
}
