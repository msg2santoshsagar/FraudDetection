package com.tcs.fraud_detection.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.tcs.fraud_detection.domain.FilePath;

import com.tcs.fraud_detection.repository.FilePathRepository;
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
 * REST controller for managing FilePath.
 */
@RestController
@RequestMapping("/api")
public class FilePathResource {

    private final Logger log = LoggerFactory.getLogger(FilePathResource.class);

    private static final String ENTITY_NAME = "filePath";

    private final FilePathRepository filePathRepository;

    public FilePathResource(FilePathRepository filePathRepository) {
        this.filePathRepository = filePathRepository;
    }

    /**
     * POST  /file-paths : Create a new filePath.
     *
     * @param filePath the filePath to create
     * @return the ResponseEntity with status 201 (Created) and with body the new filePath, or with status 400 (Bad Request) if the filePath has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/file-paths")
    @Timed
    public ResponseEntity<FilePath> createFilePath(@RequestBody FilePath filePath) throws URISyntaxException {
        log.debug("REST request to save FilePath : {}", filePath);
        if (filePath.getId() != null) {
            throw new BadRequestAlertException("A new filePath cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FilePath result = filePathRepository.save(filePath);
        return ResponseEntity.created(new URI("/api/file-paths/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /file-paths : Updates an existing filePath.
     *
     * @param filePath the filePath to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated filePath,
     * or with status 400 (Bad Request) if the filePath is not valid,
     * or with status 500 (Internal Server Error) if the filePath couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/file-paths")
    @Timed
    public ResponseEntity<FilePath> updateFilePath(@RequestBody FilePath filePath) throws URISyntaxException {
        log.debug("REST request to update FilePath : {}", filePath);
        if (filePath.getId() == null) {
            return createFilePath(filePath);
        }
        FilePath result = filePathRepository.save(filePath);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, filePath.getId().toString()))
            .body(result);
    }
    
    @PutMapping("/file-paths/list")
    @Timed
    public ResponseEntity<List<FilePath>> updateFilePathList(@RequestBody List<FilePath> filePath) throws URISyntaxException {
        log.debug("REST request to update FilePath : {}", filePath);
       /* if (filePath.getId() == null) {
            return createFilePath(filePath);
        }*/
        List<FilePath> result = filePathRepository.save(filePath);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ""))
            .body(result);
    }

    /**
     * GET  /file-paths : get all the filePaths.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of filePaths in body
     */
    @GetMapping("/file-paths")
    @Timed
    public List<FilePath> getAllFilePaths() {
        log.debug("REST request to get all FilePaths");
        return filePathRepository.findAll();
        }

    /**
     * GET  /file-paths/:id : get the "id" filePath.
     *
     * @param id the id of the filePath to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the filePath, or with status 404 (Not Found)
     */
    @GetMapping("/file-paths/{id}")
    @Timed
    public ResponseEntity<FilePath> getFilePath(@PathVariable Long id) {
        log.debug("REST request to get FilePath : {}", id);
        FilePath filePath = filePathRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(filePath));
    }

    /**
     * DELETE  /file-paths/:id : delete the "id" filePath.
     *
     * @param id the id of the filePath to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/file-paths/{id}")
    @Timed
    public ResponseEntity<Void> deleteFilePath(@PathVariable Long id) {
        log.debug("REST request to delete FilePath : {}", id);
        filePathRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
