package com.wandernest.backend.service;

import com.wandernest.backend.dto.cabin.CabinRequest;
import com.wandernest.backend.dto.cabin.CabinResponse;
import com.wandernest.backend.entity.Cabin;
import com.wandernest.backend.entity.CabinImage;
import com.wandernest.backend.repository.CabinRepository;
import org.springframework.stereotype.Service;
import com.wandernest.backend.exception.CabinNotFoundException;
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
        Cabin saved = cabinRepository.save(cabin);

        return mapToResponse(saved);
    }

    public List<CabinResponse> getAllCabins() {

        return cabinRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
    public CabinResponse getCabinById(Long id) {

        Cabin cabin = cabinRepository.findById(id)
                .orElseThrow(() ->
                        new CabinNotFoundException("Cabin not found."));

        return mapToResponse(cabin);
    }

    public void deleteCabin(Long id) {

        Cabin cabin = cabinRepository.findById(id)
                .orElseThrow(() ->
                        new CabinNotFoundException("Cabin not found."));

        cabinRepository.delete(cabin);
    }
    public CabinResponse updateCabin(Long id, CabinRequest request) {

        Cabin cabin = cabinRepository.findById(id)
                .orElseThrow(() ->
                        new CabinNotFoundException("Cabin not found."));

        cabin.setTitle(request.getTitle());
        cabin.setDescription(request.getDescription());
        cabin.setLocation(request.getLocation());
        cabin.setPricePerNight(request.getPricePerNight());
        cabin.setCapacity(request.getCapacity());
        cabin.setBedrooms(request.getBedrooms());
        cabin.setBathrooms(request.getBathrooms());
        cabin.setHostName(request.getHostName());

        Cabin updatedCabin = cabinRepository.save(cabin);

        return mapToResponse(updatedCabin);
    }
    public List<CabinResponse> searchByLocation(String location) {

        return cabinRepository.findByLocationContainingIgnoreCase(location)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
    private CabinResponse mapToResponse(Cabin cabin) {

        CabinResponse response = new CabinResponse();

        response.setId(cabin.getId());
        response.setTitle(cabin.getTitle());
        response.setDescription(cabin.getDescription());
        response.setLocation(cabin.getLocation());
        response.setPricePerNight(cabin.getPricePerNight());
        response.setCapacity(cabin.getCapacity());
        response.setBedrooms(cabin.getBedrooms());
        response.setBathrooms(cabin.getBathrooms());
        response.setRating(cabin.getRating());
        response.setStatus(cabin.getStatus().name());
        response.setHostName(cabin.getHostName());

        response.setImageUrls(
                cabin.getImages()
                        .stream()
                        .map(CabinImage::getImageUrl)
                        .toList()
        );

        return response;
    }
}