FROM openjdk:17-ea-11-jdk-slim
VOLUME /tmp
COPY build/libs/review-service-1.0.jar ReviewService.jar
ENTRYPOINT ["java", "-Duser.timezone=Asia/Seoul", "-jar", "ReviewService.jar"]