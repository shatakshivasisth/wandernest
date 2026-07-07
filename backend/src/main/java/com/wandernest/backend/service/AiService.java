package com.wandernest.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wandernest.backend.dto.ai.AiTripResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class AiService {

    private final WebClient webClient;

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.url}")
    private String geminiUrl;

    public AiService(WebClient.Builder builder) {

        this.webClient = builder.build();

    }

    public AiTripResponse generateTrip(String prompt) {

        try {

            String body = """
            {
              "contents": [
                {
                  "parts": [
                    {
                      "text": "%s"
                    }
                  ]
                }
              ]
            }
            """.formatted(prompt.replace("\"", "\\\""));

            String response = webClient.post()
                    .uri(geminiUrl + "?key=" + apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(body)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            ObjectMapper mapper = new ObjectMapper();

            JsonNode root = mapper.readTree(response);

            String text =
                    root.path("candidates")
                            .get(0)
                            .path("content")
                            .path("parts")
                            .get(0)
                            .path("text")
                            .asText();

            return new AiTripResponse(text);

        }

        catch (Exception e) {

            return new AiTripResponse(

                    "AI Error : " + e.getMessage()

            );

        }

    }

}