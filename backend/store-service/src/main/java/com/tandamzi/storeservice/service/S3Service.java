package com.tandamzi.storeservice.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class S3Service {
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final AmazonS3Client amazonS3Client;

    /*
    dirName에 이미지 파일의 저장될 위치 지정(예: "store")
    파일 배열 각각 업로드 후 업로드된 파일의 URL을 리스트에 저장 후 반환
    controller에서 @RequestPart로 List<MultiPartFile>을 받아오기. @RequestBody안됩니다.
     */
    public List<String> uploadFiles(List<MultipartFile> multipartFileList, String dirName) throws IOException {
        List<String> imageUrlList = new ArrayList<>();
        StringBuilder sb = new StringBuilder();
        for(MultipartFile multipartFile: multipartFileList) {
            sb.setLength(0);
            sb.append(dirName)
                    .append("/")
                    .append(UUID.randomUUID())
                    .append(multipartFile.getOriginalFilename());

            String storedFilePath = sb.toString();
            long size = multipartFile.getSize();
            ObjectMetadata objectMetaData = new ObjectMetadata();
            objectMetaData.setContentType(multipartFile.getContentType());
            objectMetaData.setContentLength(size);
            amazonS3Client.putObject(
                    new PutObjectRequest(bucket, storedFilePath, multipartFile.getInputStream(), objectMetaData)
                            .withCannedAcl(CannedAccessControlList.PublicRead)
            );
            String imagePath = amazonS3Client.getUrl(bucket, storedFilePath).toString();
            imageUrlList.add(imagePath);
        }
        return imageUrlList;
    }

}
