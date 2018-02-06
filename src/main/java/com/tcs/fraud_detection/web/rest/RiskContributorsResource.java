package com.tcs.fraud_detection.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.tcs.fraud_detection.domain.RiskContributors;

import com.tcs.fraud_detection.repository.RiskContributorsRepository;
import com.tcs.fraud_detection.web.rest.errors.BadRequestAlertException;
import com.tcs.fraud_detection.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing RiskContributors.
 */
@RestController
@RequestMapping("/api")
public class RiskContributorsResource {

	private final Logger log = LoggerFactory.getLogger(RiskContributorsResource.class);

	private static final String ENTITY_NAME = "riskContributors";

	private final RiskContributorsRepository riskContributorsRepository;

	public RiskContributorsResource(RiskContributorsRepository riskContributorsRepository) {
		this.riskContributorsRepository = riskContributorsRepository;
	}

	/**
	 * POST  /risk-contributors : Create a new riskContributors.
	 *
	 * @param riskContributors the riskContributors to create
	 * @return the ResponseEntity with status 201 (Created) and with body the new riskContributors, or with status 400 (Bad Request) if the riskContributors has already an ID
	 * @throws URISyntaxException if the Location URI syntax is incorrect
	 */
	@PostMapping("/risk-contributors")
	@Timed
	public ResponseEntity<RiskContributors> createRiskContributors(@RequestBody RiskContributors riskContributors) throws URISyntaxException {
		log.debug("REST request to save RiskContributors : {}", riskContributors);
		if (riskContributors.getId() != null) {
			throw new BadRequestAlertException("A new riskContributors cannot already have an ID", ENTITY_NAME, "idexists");
		}
		RiskContributors result = riskContributorsRepository.save(riskContributors);
		return ResponseEntity.created(new URI("/api/risk-contributors/" + result.getId()))
				.headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
				.body(result);
	}

	/**
	 * PUT  /risk-contributors : Updates an existing riskContributors.
	 *
	 * @param riskContributors the riskContributors to update
	 * @return the ResponseEntity with status 200 (OK) and with body the updated riskContributors,
	 * or with status 400 (Bad Request) if the riskContributors is not valid,
	 * or with status 500 (Internal Server Error) if the riskContributors couldn't be updated
	 * @throws URISyntaxException if the Location URI syntax is incorrect
	 */
	@PutMapping("/risk-contributors")
	@Timed
	public ResponseEntity<RiskContributors> updateRiskContributors(@RequestBody RiskContributors riskContributors) throws URISyntaxException {
		log.debug("REST request to update RiskContributors : {}", riskContributors);
		if (riskContributors.getId() == null) {
			return createRiskContributors(riskContributors);
		}
		RiskContributors result = riskContributorsRepository.save(riskContributors);
		return ResponseEntity.ok()
				.headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, riskContributors.getId().toString()))
				.body(result);
	}

	@PutMapping("/risk-contributors/list")
	@Timed
	public ResponseEntity<List<RiskContributors>> updateRiskContributorsList(@RequestBody List<RiskContributors> riskContributors) throws URISyntaxException {
		log.debug("REST request to update RiskContributors : {}", riskContributors);
		/*if (riskContributors.getId() == null) {
            return createRiskContributors(riskContributors);
        }*/
		List<RiskContributors> result = riskContributorsRepository.save(riskContributors);
		return ResponseEntity.ok()
				.headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ""))
				.body(result);
	}

	/**
	 * GET  /risk-contributors : get all the riskContributors.
	 *
	 * @return the ResponseEntity with status 200 (OK) and the list of riskContributors in body
	 */
	@GetMapping("/risk-contributors")
	@Timed
	public List<RiskContributors> getAllRiskContributors() {
		log.debug("REST request to get all RiskContributors");
		return riskContributorsRepository.findAll();
	}

	/**
	 * GET  /risk-contributors/:id : get the "id" riskContributors.
	 *
	 * @param id the id of the riskContributors to retrieve
	 * @return the ResponseEntity with status 200 (OK) and with body the riskContributors, or with status 404 (Not Found)
	 */
	@GetMapping("/risk-contributors/{id}")
	@Timed
	public ResponseEntity<RiskContributors> getRiskContributors(@PathVariable Long id) {
		log.debug("REST request to get RiskContributors : {}", id);
		RiskContributors riskContributors = riskContributorsRepository.findOne(id);
		return ResponseUtil.wrapOrNotFound(Optional.ofNullable(riskContributors));
	}

	/**
	 * DELETE  /risk-contributors/:id : delete the "id" riskContributors.
	 *
	 * @param id the id of the riskContributors to delete
	 * @return the ResponseEntity with status 200 (OK)
	 */
	@DeleteMapping("/risk-contributors/{id}")
	@Timed
	public ResponseEntity<Void> deleteRiskContributors(@PathVariable Long id) {
		log.debug("REST request to delete RiskContributors : {}", id);
		riskContributorsRepository.delete(id);
		return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
	}
}
