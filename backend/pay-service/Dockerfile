FROM openjdk:17-ea-11-jdk-slim
VOLUME /tmp
COPY build/libs/demo-1.0.jar PayService.jar
ENTRYPOINT ["java", "-Duser.timezone=Asia/Seoul", "-jar", "PayService.jar"]