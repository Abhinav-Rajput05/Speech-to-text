package com.audio.transcribe.service;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class TranscriptionService {

    private final WebClient webClient;

    public TranscriptionService(WebClient webClient) {
        this.webClient = webClient;
    }

    public String transcribe(MultipartFile file, String mode) throws Exception {

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();

        body.add("file", new ByteArrayResource(file.getBytes()) {
            @Override
            public String getFilename() {
                return file.getOriginalFilename();
            }
        });

        return webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/transcribe")
                        .queryParam("mode", mode)
                        .build())
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(String.class)
                .block(); // MVC → blocking is correct
    }
}
