FROM openjdk:17-ea-11-jdk-slim
VOLUME /tmp
COPY build/libs/order-service-1.0.jar OrderService.jar
ENTRYPOINT ["java", "-Duser.timezone=Asia/Seoul", "-jar", "OrderService.jar"]