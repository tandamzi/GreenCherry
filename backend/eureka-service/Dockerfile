FROM openjdk:17-ea-11-jdk-slim
VOLUME /tmp
COPY build/libs/eureka-service-1.0.jar EurekaService.jar
ENTRYPOINT ["java","-jar", "EurekaService.jar"]