package com.wandernest.backend.controller.cabin;

import com.wandernest.backend.dto.cabin.CabinRequest;
import com.wandernest.backend.dto.cabin.CabinResponse;
import com.wandernest.backend.entity.Cabin;
import com.wandernest.backend.service.CabinService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cabins")
public class CabinController {

    private final CabinService cabinService;

    public CabinController(CabinService cabinService) {
        this.cabinService = cabinService;
    }

    @PostMapping
    public CabinResponse addCabin(@Valid @RequestBody CabinRequest request) {
        return cabinService.addCabin(request);
    }

    @GetMapping
    public List<CabinResponse> getAllCabins() {
        return cabinService.getAllCabins();
    }
    @GetMapping("/{id}")
    public CabinResponse getCabinById(@PathVariable Long id) {
        return cabinService.getCabinById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteCabin(@PathVariable Long id) {

        cabinService.deleteCabin(id);

        return "Cabin deleted successfully.";
    }

    @GetMapping("/search")
    public List<CabinResponse> searchCabins(@RequestParam String location) {

        return cabinService.searchByLocation(location);
    }
    @PutMapping("/{id}")
    public CabinResponse updateCabin(
            @PathVariable Long id,
            @Valid @RequestBody CabinRequest request) {

        return cabinService.updateCabin(id, request);
    }
}