package com.wandernest.backend.repository;

import com.wandernest.backend.entity.Cabin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CabinRepository extends JpaRepository<Cabin, Long> {

    List<Cabin> findByLocationContainingIgnoreCase(String location);

}