package com.launchcode.intheloop.WebConfig.java;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
                .addResourceHandler("/uploads/images/**")
                .addResourceLocations("file:///C:/Users/stace/Documents/java-junkies/java-junkies/uploads/images/");
    }
}