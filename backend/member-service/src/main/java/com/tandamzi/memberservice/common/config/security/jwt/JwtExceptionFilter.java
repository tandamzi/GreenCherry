package com.tandamzi.memberservice.common.config.security.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tandamzi.memberservice.common.response.ResponseService;
import com.tandamzi.memberservice.common.result.Result;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtExceptionFilter extends OncePerRequestFilter {

    private final ResponseService responseService;
    private ObjectMapper objectMapper = new ObjectMapper();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try{
            filterChain.doFilter(request, response);  // go to "JwtAuthenticationFilter"
        } catch (JwtException e){
            setErrorResponse(HttpStatus.UNAUTHORIZED, response, e, -99);
        }
    }

    public void setErrorResponse(HttpStatus status, HttpServletResponse res, Throwable e, int code) throws IOException{
        res.setStatus(status.value());
        res.setContentType("application/json; charset=UTF-8");

        Result result = responseService.getFailureResult(code, e.getMessage());
        res.getWriter().write(objectMapper.writeValueAsString(result));
    }
}
