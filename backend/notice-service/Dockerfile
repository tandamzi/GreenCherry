FROM openjdk:17-ea-11-jdk-slim
VOLUME /tmp
COPY build/libs/notice-service-1.0.jar NoticeService.jar
ENTRYPOINT ["java", "-Duser.timezone=Asia/Seoul", "-jar", "NoticeService.jar"]