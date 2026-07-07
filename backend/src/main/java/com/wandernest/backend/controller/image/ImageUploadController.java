package com.wandernest.backend.controller.image;

import com.wandernest.backend.dto.image.ImageUploadResponse;
import com.wandernest.backend.service.ImageUploadService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/images")
public class ImageUploadController {

    private final ImageUploadService imageUploadService;

    public ImageUploadController(ImageUploadService imageUploadService) {
        this.imageUploadService = imageUploadService;
    }

    @PostMapping(
            value = "/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ImageUploadResponse uploadImage(
            @RequestParam("file") MultipartFile file
    ) throws IOException {

        return imageUploadService.uploadImage(file);

    }

    @PostMapping(
            value = "/upload-multiple",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public List<String> uploadMultipleImages(
            @RequestParam("files") List<MultipartFile> files
    ) throws IOException {

        return imageUploadService.uploadMultipleImages(files);

    }

}