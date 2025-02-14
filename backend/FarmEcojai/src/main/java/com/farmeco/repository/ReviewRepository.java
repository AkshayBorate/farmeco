package com.farmeco.repository;

import com.farmeco.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByFarmerId(Long farmerId);
    
    @Query("SELECT AVG(r.rating) FROM Review r")
    Double findAverageRating();
}
