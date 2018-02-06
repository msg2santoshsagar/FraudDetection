package com.tcs.fraud_detection.web.rest;

import com.tcs.fraud_detection.FraudDetectionApp;

import com.tcs.fraud_detection.domain.FileParameters;
import com.tcs.fraud_detection.repository.FileParametersRepository;
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
 * Test class for the FileParametersResource REST controller.
 *
 * @see FileParametersResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FraudDetectionApp.class)
public class FileParametersResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private FileParametersRepository fileParametersRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFileParametersMockMvc;

    private FileParameters fileParameters;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FileParametersResource fileParametersResource = new FileParametersResource(fileParametersRepository);
        this.restFileParametersMockMvc = MockMvcBuilders.standaloneSetup(fileParametersResource)
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
    public static FileParameters createEntity(EntityManager em) {
        FileParameters fileParameters = new FileParameters()
            .name(DEFAULT_NAME);
        return fileParameters;
    }

    @Before
    public void initTest() {
        fileParameters = createEntity(em);
    }

    @Test
    @Transactional
    public void createFileParameters() throws Exception {
        int databaseSizeBeforeCreate = fileParametersRepository.findAll().size();

        // Create the FileParameters
        restFileParametersMockMvc.perform(post("/api/file-parameters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fileParameters)))
            .andExpect(status().isCreated());

        // Validate the FileParameters in the database
        List<FileParameters> fileParametersList = fileParametersRepository.findAll();
        assertThat(fileParametersList).hasSize(databaseSizeBeforeCreate + 1);
        FileParameters testFileParameters = fileParametersList.get(fileParametersList.size() - 1);
        assertThat(testFileParameters.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createFileParametersWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fileParametersRepository.findAll().size();

        // Create the FileParameters with an existing ID
        fileParameters.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFileParametersMockMvc.perform(post("/api/file-parameters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fileParameters)))
            .andExpect(status().isBadRequest());

        // Validate the FileParameters in the database
        List<FileParameters> fileParametersList = fileParametersRepository.findAll();
        assertThat(fileParametersList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFileParameters() throws Exception {
        // Initialize the database
        fileParametersRepository.saveAndFlush(fileParameters);

        // Get all the fileParametersList
        restFileParametersMockMvc.perform(get("/api/file-parameters?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fileParameters.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getFileParameters() throws Exception {
        // Initialize the database
        fileParametersRepository.saveAndFlush(fileParameters);

        // Get the fileParameters
        restFileParametersMockMvc.perform(get("/api/file-parameters/{id}", fileParameters.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(fileParameters.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFileParameters() throws Exception {
        // Get the fileParameters
        restFileParametersMockMvc.perform(get("/api/file-parameters/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFileParameters() throws Exception {
        // Initialize the database
        fileParametersRepository.saveAndFlush(fileParameters);
        int databaseSizeBeforeUpdate = fileParametersRepository.findAll().size();

        // Update the fileParameters
        FileParameters updatedFileParameters = fileParametersRepository.findOne(fileParameters.getId());
        // Disconnect from session so that the updates on updatedFileParameters are not directly saved in db
        em.detach(updatedFileParameters);
        updatedFileParameters
            .name(UPDATED_NAME);

        restFileParametersMockMvc.perform(put("/api/file-parameters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFileParameters)))
            .andExpect(status().isOk());

        // Validate the FileParameters in the database
        List<FileParameters> fileParametersList = fileParametersRepository.findAll();
        assertThat(fileParametersList).hasSize(databaseSizeBeforeUpdate);
        FileParameters testFileParameters = fileParametersList.get(fileParametersList.size() - 1);
        assertThat(testFileParameters.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingFileParameters() throws Exception {
        int databaseSizeBeforeUpdate = fileParametersRepository.findAll().size();

        // Create the FileParameters

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFileParametersMockMvc.perform(put("/api/file-parameters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fileParameters)))
            .andExpect(status().isCreated());

        // Validate the FileParameters in the database
        List<FileParameters> fileParametersList = fileParametersRepository.findAll();
        assertThat(fileParametersList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFileParameters() throws Exception {
        // Initialize the database
        fileParametersRepository.saveAndFlush(fileParameters);
        int databaseSizeBeforeDelete = fileParametersRepository.findAll().size();

        // Get the fileParameters
        restFileParametersMockMvc.perform(delete("/api/file-parameters/{id}", fileParameters.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FileParameters> fileParametersList = fileParametersRepository.findAll();
        assertThat(fileParametersList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FileParameters.class);
        FileParameters fileParameters1 = new FileParameters();
        fileParameters1.setId(1L);
        FileParameters fileParameters2 = new FileParameters();
        fileParameters2.setId(fileParameters1.getId());
        assertThat(fileParameters1).isEqualTo(fileParameters2);
        fileParameters2.setId(2L);
        assertThat(fileParameters1).isNotEqualTo(fileParameters2);
        fileParameters1.setId(null);
        assertThat(fileParameters1).isNotEqualTo(fileParameters2);
    }
}
