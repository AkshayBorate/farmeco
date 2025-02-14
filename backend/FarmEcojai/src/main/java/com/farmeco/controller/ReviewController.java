package com.farmeco.controller;

import com.farmeco.dto.ReviewDTO;
import com.farmeco.entity.Review;
import com.farmeco.service.ReviewServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    @Autowired
    private ReviewServiceImpl reviewService;

    @PostMapping("/add")
    public Review createReview(@RequestBody Review review) {
        return reviewService.createReview(review);
    }

    @GetMapping("/get")
    public List<ReviewDTO> getAllReviews() {
        return reviewService.getAllReviews();
    }

    @GetMapping("/{id}")
    public Optional<ReviewDTO> getReviewById(@PathVariable Long id) {
        return reviewService.getReviewById(id);
    }
    
    @GetMapping("/average")
    public Double getAverageRating() {
        Double average = reviewService.getAverageRating();
        return average != null ? average : 0.0;
    }
}
