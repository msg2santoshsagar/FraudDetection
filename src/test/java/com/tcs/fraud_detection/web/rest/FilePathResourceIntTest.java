package com.tcs.fraud_detection.web.rest;

import com.tcs.fraud_detection.FraudDetectionApp;

import com.tcs.fraud_detection.domain.FilePath;
import com.tcs.fraud_detection.repository.FilePathRepository;
import com.tcs.fraud_detection.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.tcs.fraud_detection.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the FilePathResource REST controller.
 *
 * @see FilePathResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FraudDetectionApp.class)
public class FilePathResourceIntTest {

    private static final Long DEFAULT_CLIENT_ID = 1L;
    private static final Long UPDATED_CLIENT_ID = 2L;

    private static final String DEFAULT_FILE_PARAM = "AAAAAAAAAA";
    private static final String UPDATED_FILE_PARAM = "BBBBBBBBBB";

    private static final String DEFAULT_FILE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FILE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DELETE_FLAG = "AAAAAAAAAA";
    private static final String UPDATED_DELETE_FLAG = "BBBBBBBBBB";

    @Autowired
    private FilePathRepository filePathRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFilePathMockMvc;

    private FilePath filePath;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FilePathResource filePathResource = new FilePathResource(filePathRepository);
        this.restFilePathMockMvc = MockMvcBuilders.standaloneSetup(filePathResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FilePath createEntity(EntityManager em) {
        FilePath filePath = new FilePath()
            .clientId(DEFAULT_CLIENT_ID)
            .fileParam(DEFAULT_FILE_PARAM)
            .fileName(DEFAULT_FILE_NAME)
            .deleteFlag(DEFAULT_DELETE_FLAG);
        return filePath;
    }

    @Before
    public void initTest() {
        filePath = createEntity(em);
    }

    @Test
    @Transactional
    public void createFilePath() throws Exception {
        int databaseSizeBeforeCreate = filePathRepository.findAll().size();

        // Create the FilePath
        restFilePathMockMvc.perform(post("/api/file-paths")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(filePath)))
            .andExpect(status().isCreated());

        // Validate the FilePath in the database
        List<FilePath> filePathList = filePathRepository.findAll();
        assertThat(filePathList).hasSize(databaseSizeBeforeCreate + 1);
        FilePath testFilePath = filePathList.get(filePathList.size() - 1);
        assertThat(testFilePath.getClientId()).isEqualTo(DEFAULT_CLIENT_ID);
        assertThat(testFilePath.getFileParam()).isEqualTo(DEFAULT_FILE_PARAM);
        assertThat(testFilePath.getFileName()).isEqualTo(DEFAULT_FILE_NAME);
        assertThat(testFilePath.getDeleteFlag()).isEqualTo(DEFAULT_DELETE_FLAG);
    }

    @Test
    @Transactional
    public void createFilePathWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = filePathRepository.findAll().size();

        // Create the FilePath with an existing ID
        filePath.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFilePathMockMvc.perform(post("/api/file-paths")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(filePath)))
            .andExpect(status().isBadRequest());

        // Validate the FilePath in the database
        List<FilePath> filePathList = filePathRepository.findAll();
        assertThat(filePathList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFilePaths() throws Exception {
        // Initialize the database
        filePathRepository.saveAndFlush(filePath);

        // Get all the filePathList
        restFilePathMockMvc.perform(get("/api/file-paths?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(filePath.getId().intValue())))
            .andExpect(jsonPath("$.[*].clientId").value(hasItem(DEFAULT_CLIENT_ID.intValue())))
            .andExpect(jsonPath("$.[*].fileParam").value(hasItem(DEFAULT_FILE_PARAM.toString())))
            .andExpect(jsonPath("$.[*].fileName").value(hasItem(DEFAULT_FILE_NAME.toString())))
            .andExpect(jsonPath("$.[*].deleteFlag").value(hasItem(DEFAULT_DELETE_FLAG.toString())));
    }

    @Test
    @Transactional
    public void getFilePath() throws Exception {
        // Initialize the database
        filePathRepository.saveAndFlush(filePath);

        // Get the filePath
        restFilePathMockMvc.perform(get("/api/file-paths/{id}", filePath.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(filePath.getId().intValue()))
            .andExpect(jsonPath("$.clientId").value(DEFAULT_CLIENT_ID.intValue()))
            .andExpect(jsonPath("$.fileParam").value(DEFAULT_FILE_PARAM.toString()))
            .andExpect(jsonPath("$.fileName").value(DEFAULT_FILE_NAME.toString()))
            .andExpect(jsonPath("$.deleteFlag").value(DEFAULT_DELETE_FLAG.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFilePath() throws Exception {
        // Get the filePath
        restFilePathMockMvc.perform(get("/api/file-paths/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFilePath() throws Exception {
        // Initialize the database
        filePathRepository.saveAndFlush(filePath);
        int databaseSizeBeforeUpdate = filePathRepository.findAll().size();

        // Update the filePath
        FilePath updatedFilePath = filePathRepository.findOne(filePath.getId());
        // Disconnect from session so that the updates on updatedFilePath are not directly saved in db
        em.detach(updatedFilePath);
        updatedFilePath
            .clientId(UPDATED_CLIENT_ID)
            .fileParam(UPDATED_FILE_PARAM)
            .fileName(UPDATED_FILE_NAME)
            .deleteFlag(UPDATED_DELETE_FLAG);

        restFilePathMockMvc.perform(put("/api/file-paths")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFilePath)))
            .andExpect(status().isOk());

        // Validate the FilePath in the database
        List<FilePath> filePathList = filePathRepository.findAll();
        assertThat(filePathList).hasSize(databaseSizeBeforeUpdate);
        FilePath testFilePath = filePathList.get(filePathList.size() - 1);
        assertThat(testFilePath.getClientId()).isEqualTo(UPDATED_CLIENT_ID);
        assertThat(testFilePath.getFileParam()).isEqualTo(UPDATED_FILE_PARAM);
        assertThat(testFilePath.getFileName()).isEqualTo(UPDATED_FILE_NAME);
        assertThat(testFilePath.getDeleteFlag()).isEqualTo(UPDATED_DELETE_FLAG);
    }

    @Test
    @Transactional
    public void updateNonExistingFilePath() throws Exception {
        int databaseSizeBeforeUpdate = filePathRepository.findAll().size();

        // Create the FilePath

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFilePathMockMvc.perform(put("/api/file-paths")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(filePath)))
            .andExpect(status().isCreated());

        // Validate the FilePath in the database
        List<FilePath> filePathList = filePathRepository.findAll();
        assertThat(filePathList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFilePath() throws Exception {
        // Initialize the database
        filePathRepository.saveAndFlush(filePath);
        int databaseSizeBeforeDelete = filePathRepository.findAll().size();

        // Get the filePath
        restFilePathMockMvc.perform(delete("/api/file-paths/{id}", filePath.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FilePath> filePathList = filePathRepository.findAll();
        assertThat(filePathList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FilePath.class);
        FilePath filePath1 = new FilePath();
        filePath1.setId(1L);
        FilePath filePath2 = new FilePath();
        filePath2.setId(filePath1.getId());
        assertThat(filePath1).isEqualTo(filePath2);
        filePath2.setId(2L);
        assertThat(filePath1).isNotEqualTo(filePath2);
        filePath1.setId(null);
        assertThat(filePath1).isNotEqualTo(filePath2);
    }
}
