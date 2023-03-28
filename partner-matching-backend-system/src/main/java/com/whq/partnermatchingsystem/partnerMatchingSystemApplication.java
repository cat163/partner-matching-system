package com.whq.partnermatchingsystem;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.whq.partnermatchingsystem.mapper")
public class partnerMatchingSystemApplication {
    public static void main(String[] args) {
        SpringApplication.run(partnerMatchingSystemApplication.class, args);
    }

}
