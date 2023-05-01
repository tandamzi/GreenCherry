FROM openjdk:17-ea-11-jdk-slim
VOLUME /tmp
COPY build/libs/member-service-1.0.jar MemberService.jar
ENTRYPOINT ["java","-jar", "MemberService.jar"]