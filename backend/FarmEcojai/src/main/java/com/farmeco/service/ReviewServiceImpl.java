package com.farmeco.service;

import com.farmeco.dto.FarmerDTO;
import com.farmeco.dto.ReviewDTO;
import com.farmeco.entity.Farmer;
import com.farmeco.entity.Review;
import com.farmeco.repository.ReviewRepository;
import com.farmeco.repository.FarmerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReviewServiceImpl {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private FarmerRepository farmerRepository;

    public Review createReview(Review review) {
        if (review.getFarmer() != null && review.getFarmer().getId() != null) {
            Optional<Farmer> farmer = farmerRepository.findById(review.getFarmer().getId());
            farmer.ifPresent(review::setFarmer);
        }
        return reviewRepository.save(review);
    }

    private ReviewDTO convertToDTO(Review review) {
        ReviewDTO dto = new ReviewDTO();
        dto.setId(review.getId());
        dto.setReviewText(review.getReviewText());
        dto.setRating(review.getRating());
        dto.setCreatedAt(review.getCreatedAt());


        if (review.getFarmer() != null) {
            FarmerDTO farmerDTO = new FarmerDTO();
            farmerDTO.setId(review.getFarmer().getId());
            farmerDTO.setName(review.getFarmer().getName());
            farmerDTO.setEmail(review.getFarmer().getEmail());  
            farmerDTO.setMobileNo(review.getFarmer().getMobileNo());  
            dto.setFarmer(farmerDTO);
        }

        return dto;
    }


    public List<ReviewDTO> getAllReviews() {
        return reviewRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public Optional<ReviewDTO> getReviewById(Long id) {
        return reviewRepository.findById(id).map(this::convertToDTO);
    }
    
    public Double getAverageRating() {
        return reviewRepository.findAverageRating();
    }
}
