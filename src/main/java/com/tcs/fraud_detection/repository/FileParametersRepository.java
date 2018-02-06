package com.tcs.fraud_detection.repository;

import com.tcs.fraud_detection.domain.FileParameters;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the FileParameters entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FileParametersRepository extends JpaRepository<FileParameters, Long> {

}
