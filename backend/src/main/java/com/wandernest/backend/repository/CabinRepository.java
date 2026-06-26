package com.wandernest.backend.repository;

import com.wandernest.backend.entity.Cabin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CabinRepository extends JpaRepository<Cabin, Long> {

}