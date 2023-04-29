FROM openjdk:17-ea-11-jdk-slim
VOLUME /tmp
COPY build/libs/gateway-service-1.0.jar GatewayService.jar
ENTRYPOINT ["java","-jar", "GatewayService.jar"]