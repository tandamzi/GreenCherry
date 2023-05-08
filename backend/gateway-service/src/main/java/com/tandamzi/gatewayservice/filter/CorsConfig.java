package com.tandamzi.gatewayservice.filter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.web.cors.reactive.CorsUtils;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

@Configuration
public class CorsConfig {
    private static final String ALLOWED_HEADERS = "authorization, Content-Type, Content-Length, Authorization, credential, X-XSRF-TOKEN, refreshtoken, RefreshToken";
    private static final String ALLOWED_METHODS = "GET, PUT, POST, DELETE, OPTIONS, PATCH";
    private static final String EXPOSE_HEADERS = "*, Authorization";
    private static final String MAX_AGE = "7200"; //2 hours (2 * 60 * 60)

    @Bean
    public WebFilter corsFilter() {
        return (ServerWebExchange ctx, WebFilterChain chain) -> {
            ServerHttpRequest request = ctx.getRequest();
            String origin = request.getHeaders().getOrigin();

            if (CorsUtils.isCorsRequest(request)) {
                ServerHttpResponse response = ctx.getResponse();
                HttpHeaders headers = response.getHeaders();

                if (origin.startsWith("http://localhost") || origin.startsWith("http://j8c209.p.ssafy.io") ||
                        origin.startsWith("http://green")) {
                    headers.add("Access-Control-Allow-Origin", origin);
                }

                headers.add("Access-Control-Allow-Methods", ALLOWED_METHODS);
                headers.add("Access-Control-Max-Age", MAX_AGE);
                headers.add("Access-Control-Allow-Headers", ALLOWED_HEADERS);
                headers.add("Access-Control-Expose-Headers", EXPOSE_HEADERS);
                headers.setAccessControlAllowCredentials(true);
                if (request.getMethod() == HttpMethod.OPTIONS) {
                    response.setStatusCode(HttpStatus.OK);
                    return Mono.empty();
                }
            }
            return chain.filter(ctx);
        };
    }
}
