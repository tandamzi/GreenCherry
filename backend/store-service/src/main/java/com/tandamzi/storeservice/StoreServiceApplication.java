package com.tandamzi.storeservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class StoreServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(StoreServiceApplication.class, args);
    }

}
