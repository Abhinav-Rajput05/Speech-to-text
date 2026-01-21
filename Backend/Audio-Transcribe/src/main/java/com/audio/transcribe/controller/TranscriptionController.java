package com.audio.transcribe.controller;

import com.audio.transcribe.service.TranscriptionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class TranscriptionController {

    private final TranscriptionService service;

    public TranscriptionController(TranscriptionService service) {
        this.service = service;
    }

    @PostMapping("/transcribe")
    public ResponseEntity<String> transcribe(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "mode", defaultValue = "fast") String mode
    ) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("File is empty");
            }

            String result = service.transcribe(file, mode);
            return ResponseEntity.ok(result);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Transcription failed");
        }
    }
}
