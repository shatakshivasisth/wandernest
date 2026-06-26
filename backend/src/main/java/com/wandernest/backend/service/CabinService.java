package com.wandernest.backend.service;

import com.wandernest.backend.dto.cabin.CabinRequest;
import com.wandernest.backend.dto.cabin.CabinResponse;
import com.wandernest.backend.entity.Cabin;
import com.wandernest.backend.entity.CabinImage;
import com.wandernest.backend.repository.CabinRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CabinService {

    private final CabinRepository cabinRepository;

    public CabinService(CabinRepository cabinRepository) {
        this.cabinRepository = cabinRepository;
    }

    public CabinResponse addCabin(CabinRequest request) {

        Cabin cabin = new Cabin();

        cabin.setTitle(request.getTitle());
        cabin.setDescription(request.getDescription());
        cabin.setLocation(request.getLocation());
        cabin.setPricePerNight(request.getPricePerNight());
        cabin.setCapacity(request.getCapacity());
        cabin.setBedrooms(request.getBedrooms());
        cabin.setBathrooms(request.getBathrooms());
        cabin.setHostName(request.getHostName());

        if (request.getImageUrls() != null) {

            for (int i = 0; i < request.getImageUrls().size(); i++) {

                CabinImage image = new CabinImage();

                image.setImageUrl(request.getImageUrls().get(i));

                image.setPrimaryImage(i == 0);

                image.setCabin(cabin);

                cabin.getImages().add(image);
            }
        }

        Cabin saved = cabinRepository.save(cabin);

        CabinResponse response = new CabinResponse();

        response.setId(saved.getId());
        response.setTitle(saved.getTitle());
        response.setDescription(saved.getDescription());
        response.setLocation(saved.getLocation());
        response.setPricePerNight(saved.getPricePerNight());
        response.setCapacity(saved.getCapacity());
        response.setBedrooms(saved.getBedrooms());
        response.setBathrooms(saved.getBathrooms());
        response.setRating(saved.getRating());
        response.setStatus(saved.getStatus().name());
        response.setHostName(saved.getHostName());

        response.setImageUrls(
                saved.getImages()
                        .stream()
                        .map(CabinImage::getImageUrl)
                        .collect(Collectors.toList())
        );

        return response;
    }

    public List<Cabin> getAllCabins() {
        return cabinRepository.findAll();
    }
}