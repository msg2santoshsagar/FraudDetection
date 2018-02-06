package com.tcs.fraud_detection.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.tcs.fraud_detection.domain.FileParameters;

import com.tcs.fraud_detection.repository.FileParametersRepository;
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
 * REST controller for managing FileParameters.
 */
@RestController
@RequestMapping("/api")
public class FileParametersResource {

    private final Logger log = LoggerFactory.getLogger(FileParametersResource.class);

    private static final String ENTITY_NAME = "fileParameters";

    private final FileParametersRepository fileParametersRepository;

    public FileParametersResource(FileParametersRepository fileParametersRepository) {
        this.fileParametersRepository = fileParametersRepository;
    }

    /**
     * POST  /file-parameters : Create a new fileParameters.
     *
     * @param fileParameters the fileParameters to create
     * @return the ResponseEntity with status 201 (Created) and with body the new fileParameters, or with status 400 (Bad Request) if the fileParameters has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/file-parameters")
    @Timed
    public ResponseEntity<FileParameters> createFileParameters(@RequestBody FileParameters fileParameters) throws URISyntaxException {
        log.debug("REST request to save FileParameters : {}", fileParameters);
        if (fileParameters.getId() != null) {
            throw new BadRequestAlertException("A new fileParameters cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FileParameters result = fileParametersRepository.save(fileParameters);
        return ResponseEntity.created(new URI("/api/file-parameters/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /file-parameters : Updates an existing fileParameters.
     *
     * @param fileParameters the fileParameters to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated fileParameters,
     * or with status 400 (Bad Request) if the fileParameters is not valid,
     * or with status 500 (Internal Server Error) if the fileParameters couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/file-parameters")
    @Timed
    public ResponseEntity<FileParameters> updateFileParameters(@RequestBody FileParameters fileParameters) throws URISyntaxException {
        log.debug("REST request to update FileParameters : {}", fileParameters);
        if (fileParameters.getId() == null) {
            return createFileParameters(fileParameters);
        }
        FileParameters result = fileParametersRepository.save(fileParameters);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, fileParameters.getId().toString()))
            .body(result);
    }

    /**
     * GET  /file-parameters : get all the fileParameters.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of fileParameters in body
     */
    @GetMapping("/file-parameters")
    @Timed
    public List<FileParameters> getAllFileParameters() {
        log.debug("REST request to get all FileParameters");
        return fileParametersRepository.findAll();
        }

    /**
     * GET  /file-parameters/:id : get the "id" fileParameters.
     *
     * @param id the id of the fileParameters to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the fileParameters, or with status 404 (Not Found)
     */
    @GetMapping("/file-parameters/{id}")
    @Timed
    public ResponseEntity<FileParameters> getFileParameters(@PathVariable Long id) {
        log.debug("REST request to get FileParameters : {}", id);
        FileParameters fileParameters = fileParametersRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(fileParameters));
    }

    /**
     * DELETE  /file-parameters/:id : delete the "id" fileParameters.
     *
     * @param id the id of the fileParameters to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/file-parameters/{id}")
    @Timed
    public ResponseEntity<Void> deleteFileParameters(@PathVariable Long id) {
        log.debug("REST request to delete FileParameters : {}", id);
        fileParametersRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
