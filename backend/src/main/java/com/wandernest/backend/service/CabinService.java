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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import com.wandernest.backend.specification.CabinSpecification;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
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
    public Page<CabinResponse> getCabins(int page, int size, String sortBy) {

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(sortBy).ascending()
        );

        return cabinRepository.findAll(pageable)
                .map(this::mapToResponse);
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
    public List<CabinResponse> filterCabins(
            String location,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Integer capacity) {

        Specification<Cabin> specification = Specification
                .where(CabinSpecification.hasLocation(location))
                .and(CabinSpecification.hasMinPrice(minPrice))
                .and(CabinSpecification.hasMaxPrice(maxPrice))
                .and(CabinSpecification.hasCapacity(capacity));

        return cabinRepository.findAll(specification)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
}