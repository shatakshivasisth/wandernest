package com.wandernest.backend.controller.ai;

import com.wandernest.backend.dto.ai.AiTripRequest;
import com.wandernest.backend.dto.ai.AiTripResponse;
import com.wandernest.backend.service.AiService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/ai")
@CrossOrigin(origins = "http://localhost:5173")
public class AiController {

    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/trip-plan")
    public AiTripResponse generateTripPlan(
            @Valid @RequestBody AiTripRequest request
    ) {

        return aiService.generateTrip(request.getPrompt());

    }

}