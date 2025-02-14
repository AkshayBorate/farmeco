package com.farmeco.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
	
	 @Bean
	    public ModelMapper modelMapper() {
	        return new ModelMapper();
	    }  
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") 
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*");
    }
    private static final String UPLOAD_DIR = "D:\\FarmEcoUploads\\";

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Configure static resource handler to serve uploaded files
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:///" + UPLOAD_DIR);
    }
    
   
}
