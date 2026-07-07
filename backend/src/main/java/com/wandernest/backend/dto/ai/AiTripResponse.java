package com.wandernest.backend.dto.ai;

public class AiTripResponse {

    private String response;

    public AiTripResponse() {
    }

    public AiTripResponse(String response) {
        this.response = response;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

}