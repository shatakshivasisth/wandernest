package com.wandernest.backend.dto.ai;

import jakarta.validation.constraints.NotBlank;

public class AiTripRequest {

    @NotBlank
    private String prompt;

    public AiTripRequest() {
    }

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }

}