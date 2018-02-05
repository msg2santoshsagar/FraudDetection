package com.tcs.fraud_detection.repository;

import com.tcs.fraud_detection.domain.RiskContributors;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the RiskContributors entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RiskContributorsRepository extends JpaRepository<RiskContributors, Long> {

}
