package com.farmeco.serviceAbs;

import com.farmeco.entity.Review;
import java.util.List;
import java.util.Optional;

public interface ReviewService {
    Review createReview(Review review);
    Optional<Review> getReviewById(Long id);
    List<Review> getAllReviews();
    List<Review> getReviewsByFarmerId(Long farmerId);
    Review updateReview(Long id, String reviewText, int rating);
}
