package com.wandernest.backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.wandernest.backend.dto.image.ImageUploadResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.ArrayList;
import java.util.List;
import java.io.IOException;
import java.util.Map;

@Service
public class ImageUploadService {

    private final Cloudinary cloudinary;

    public ImageUploadService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public ImageUploadResponse uploadImage(MultipartFile file)
            throws IOException {

        Map<?, ?> uploadResult = cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.emptyMap()
        );

        String imageUrl = uploadResult.get("secure_url").toString();

        return new ImageUploadResponse(imageUrl);
    }
    public List<String> uploadMultipleImages(List<MultipartFile> files)
            throws IOException {

        List<String> imageUrls = new ArrayList<>();

        for (MultipartFile file : files) {

            Map<?, ?> uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.emptyMap()
            );

            imageUrls.add(uploadResult.get("secure_url").toString());
        }

        return imageUrls;
    }
}