package com.tandamzi.storeservice.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
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

    /*public String uploadFileV3(MultipartFile[] files, String dirName) throws IOException{
        Arrays.stream(files).forEach(file -> {
            try {
                String storedFilePath = dirName + "/" + UUID.randomUUID() + file.getOriginalFilename();
                ObjectMetadata metadata = new ObjectMetadata();
                metadata.setContentLength(file.getSize());
                metadata.setContentType(file.getContentType());
                amazonS3Client.putObject(bucket, storedFilePath, file.getInputStream(), metadata);
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
        String storedFilePath = dirName + "/" + UUID.randomUUID() + file.getOriginalFilename();
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        amazonS3Client.putObject(bucket, storedFilePath, file.getInputStream(), metadata);
        return amazonS3Client.getUrl(bucket, storedFilePath).toString();
    }*/

}
