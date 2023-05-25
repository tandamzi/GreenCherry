FROM openjdk:17-ea-11-jdk-slim
VOLUME /tmp
COPY build/libs/store-service-1.0.jar StoreService.jar
ENTRYPOINT ["java", "-Duser.timezone=Asia/Seoul", "-jar", "StoreService.jar"]