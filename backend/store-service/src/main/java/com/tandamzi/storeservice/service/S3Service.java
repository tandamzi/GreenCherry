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


    public String uploadFile(MultipartFile file) {
        try {
            String fileName=file.getOriginalFilename();
            String fileUrl= "https://" + bucket + "/test" +fileName;
            ObjectMetadata metadata= new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());
            amazonS3Client.putObject(bucket,fileName,file.getInputStream(),metadata);
            return fileUrl;
        } catch (IOException e) {
            e.printStackTrace();
            return "fail";
        }
    }

    public String uploadFileV2(MultipartFile file, String dirName) throws IOException{
        String storedFilePath = dirName + "/" + UUID.randomUUID() + file.getOriginalFilename();
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        amazonS3Client.putObject(bucket, storedFilePath, file.getInputStream(), metadata);
        return amazonS3Client.getUrl(bucket, storedFilePath).toString();
    }

    public List<String> uploadFiles(MultipartFile[] multipartFileList, String dirName) throws IOException{
        List<String> imageUrlList = new ArrayList<>();
        StringBuilder sb = new StringBuilder();
        for(MultipartFile multipartFile: multipartFileList) {
            sb.setLength(0);
            sb.append(dirName);
            sb.append("/");
            sb.append(UUID.randomUUID());
            sb.append(multipartFile.getOriginalFilename());
            String storedFilePath = sb.toString();
            long size = multipartFile.getSize(); // 파일 크기
            ObjectMetadata objectMetaData = new ObjectMetadata();
            objectMetaData.setContentType(multipartFile.getContentType());
            objectMetaData.setContentLength(size);
            // S3에 업로드
            amazonS3Client.putObject(
                    new PutObjectRequest(bucket, storedFilePath, multipartFile.getInputStream(), objectMetaData)
                            .withCannedAcl(CannedAccessControlList.PublicRead)
            );
            String imagePath = amazonS3Client.getUrl(bucket, storedFilePath).toString(); // 접근가능한 URL 가져오기
            imageUrlList.add(imagePath);
        }
        return imageUrlList;
    }

}
