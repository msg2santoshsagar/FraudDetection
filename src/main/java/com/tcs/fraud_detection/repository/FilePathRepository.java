package com.tcs.fraud_detection.repository;

import com.tcs.fraud_detection.domain.FilePath;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the FilePath entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FilePathRepository extends JpaRepository<FilePath, Long> {

}
