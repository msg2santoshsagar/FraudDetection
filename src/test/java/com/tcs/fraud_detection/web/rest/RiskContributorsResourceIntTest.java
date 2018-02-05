package com.tcs.fraud_detection.web.rest;

import com.tcs.fraud_detection.FraudDetectionApp;

import com.tcs.fraud_detection.domain.RiskContributors;
import com.tcs.fraud_detection.repository.RiskContributorsRepository;
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
 * Test class for the RiskContributorsResource REST controller.
 *
 * @see RiskContributorsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FraudDetectionApp.class)
public class RiskContributorsResourceIntTest {

    private static final Long DEFAULT_CLIENT_ID = 1L;
    private static final Long UPDATED_CLIENT_ID = 2L;

    private static final String DEFAULT_RISK_CONTRIBUTORS = "AAAAAAAAAA";
    private static final String UPDATED_RISK_CONTRIBUTORS = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Double DEFAULT_WEIGHTAGE = 1D;
    private static final Double UPDATED_WEIGHTAGE = 2D;

    private static final String DEFAULT_DELETE_FLAG = "AAAAAAAAAA";
    private static final String UPDATED_DELETE_FLAG = "BBBBBBBBBB";

    @Autowired
    private RiskContributorsRepository riskContributorsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRiskContributorsMockMvc;

    private RiskContributors riskContributors;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RiskContributorsResource riskContributorsResource = new RiskContributorsResource(riskContributorsRepository);
        this.restRiskContributorsMockMvc = MockMvcBuilders.standaloneSetup(riskContributorsResource)
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
    public static RiskContributors createEntity(EntityManager em) {
        RiskContributors riskContributors = new RiskContributors()
            .clientId(DEFAULT_CLIENT_ID)
            .riskContributors(DEFAULT_RISK_CONTRIBUTORS)
            .description(DEFAULT_DESCRIPTION)
            .weightage(DEFAULT_WEIGHTAGE)
            .deleteFlag(DEFAULT_DELETE_FLAG);
        return riskContributors;
    }

    @Before
    public void initTest() {
        riskContributors = createEntity(em);
    }

    @Test
    @Transactional
    public void createRiskContributors() throws Exception {
        int databaseSizeBeforeCreate = riskContributorsRepository.findAll().size();

        // Create the RiskContributors
        restRiskContributorsMockMvc.perform(post("/api/risk-contributors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(riskContributors)))
            .andExpect(status().isCreated());

        // Validate the RiskContributors in the database
        List<RiskContributors> riskContributorsList = riskContributorsRepository.findAll();
        assertThat(riskContributorsList).hasSize(databaseSizeBeforeCreate + 1);
        RiskContributors testRiskContributors = riskContributorsList.get(riskContributorsList.size() - 1);
        assertThat(testRiskContributors.getClientId()).isEqualTo(DEFAULT_CLIENT_ID);
        assertThat(testRiskContributors.getRiskContributors()).isEqualTo(DEFAULT_RISK_CONTRIBUTORS);
        assertThat(testRiskContributors.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testRiskContributors.getWeightage()).isEqualTo(DEFAULT_WEIGHTAGE);
        assertThat(testRiskContributors.getDeleteFlag()).isEqualTo(DEFAULT_DELETE_FLAG);
    }

    @Test
    @Transactional
    public void createRiskContributorsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = riskContributorsRepository.findAll().size();

        // Create the RiskContributors with an existing ID
        riskContributors.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRiskContributorsMockMvc.perform(post("/api/risk-contributors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(riskContributors)))
            .andExpect(status().isBadRequest());

        // Validate the RiskContributors in the database
        List<RiskContributors> riskContributorsList = riskContributorsRepository.findAll();
        assertThat(riskContributorsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRiskContributors() throws Exception {
        // Initialize the database
        riskContributorsRepository.saveAndFlush(riskContributors);

        // Get all the riskContributorsList
        restRiskContributorsMockMvc.perform(get("/api/risk-contributors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(riskContributors.getId().intValue())))
            .andExpect(jsonPath("$.[*].clientId").value(hasItem(DEFAULT_CLIENT_ID.intValue())))
            .andExpect(jsonPath("$.[*].riskContributors").value(hasItem(DEFAULT_RISK_CONTRIBUTORS.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].weightage").value(hasItem(DEFAULT_WEIGHTAGE.doubleValue())))
            .andExpect(jsonPath("$.[*].deleteFlag").value(hasItem(DEFAULT_DELETE_FLAG.toString())));
    }

    @Test
    @Transactional
    public void getRiskContributors() throws Exception {
        // Initialize the database
        riskContributorsRepository.saveAndFlush(riskContributors);

        // Get the riskContributors
        restRiskContributorsMockMvc.perform(get("/api/risk-contributors/{id}", riskContributors.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(riskContributors.getId().intValue()))
            .andExpect(jsonPath("$.clientId").value(DEFAULT_CLIENT_ID.intValue()))
            .andExpect(jsonPath("$.riskContributors").value(DEFAULT_RISK_CONTRIBUTORS.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.weightage").value(DEFAULT_WEIGHTAGE.doubleValue()))
            .andExpect(jsonPath("$.deleteFlag").value(DEFAULT_DELETE_FLAG.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRiskContributors() throws Exception {
        // Get the riskContributors
        restRiskContributorsMockMvc.perform(get("/api/risk-contributors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRiskContributors() throws Exception {
        // Initialize the database
        riskContributorsRepository.saveAndFlush(riskContributors);
        int databaseSizeBeforeUpdate = riskContributorsRepository.findAll().size();

        // Update the riskContributors
        RiskContributors updatedRiskContributors = riskContributorsRepository.findOne(riskContributors.getId());
        // Disconnect from session so that the updates on updatedRiskContributors are not directly saved in db
        em.detach(updatedRiskContributors);
        updatedRiskContributors
            .clientId(UPDATED_CLIENT_ID)
            .riskContributors(UPDATED_RISK_CONTRIBUTORS)
            .description(UPDATED_DESCRIPTION)
            .weightage(UPDATED_WEIGHTAGE)
            .deleteFlag(UPDATED_DELETE_FLAG);

        restRiskContributorsMockMvc.perform(put("/api/risk-contributors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRiskContributors)))
            .andExpect(status().isOk());

        // Validate the RiskContributors in the database
        List<RiskContributors> riskContributorsList = riskContributorsRepository.findAll();
        assertThat(riskContributorsList).hasSize(databaseSizeBeforeUpdate);
        RiskContributors testRiskContributors = riskContributorsList.get(riskContributorsList.size() - 1);
        assertThat(testRiskContributors.getClientId()).isEqualTo(UPDATED_CLIENT_ID);
        assertThat(testRiskContributors.getRiskContributors()).isEqualTo(UPDATED_RISK_CONTRIBUTORS);
        assertThat(testRiskContributors.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testRiskContributors.getWeightage()).isEqualTo(UPDATED_WEIGHTAGE);
        assertThat(testRiskContributors.getDeleteFlag()).isEqualTo(UPDATED_DELETE_FLAG);
    }

    @Test
    @Transactional
    public void updateNonExistingRiskContributors() throws Exception {
        int databaseSizeBeforeUpdate = riskContributorsRepository.findAll().size();

        // Create the RiskContributors

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRiskContributorsMockMvc.perform(put("/api/risk-contributors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(riskContributors)))
            .andExpect(status().isCreated());

        // Validate the RiskContributors in the database
        List<RiskContributors> riskContributorsList = riskContributorsRepository.findAll();
        assertThat(riskContributorsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRiskContributors() throws Exception {
        // Initialize the database
        riskContributorsRepository.saveAndFlush(riskContributors);
        int databaseSizeBeforeDelete = riskContributorsRepository.findAll().size();

        // Get the riskContributors
        restRiskContributorsMockMvc.perform(delete("/api/risk-contributors/{id}", riskContributors.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RiskContributors> riskContributorsList = riskContributorsRepository.findAll();
        assertThat(riskContributorsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RiskContributors.class);
        RiskContributors riskContributors1 = new RiskContributors();
        riskContributors1.setId(1L);
        RiskContributors riskContributors2 = new RiskContributors();
        riskContributors2.setId(riskContributors1.getId());
        assertThat(riskContributors1).isEqualTo(riskContributors2);
        riskContributors2.setId(2L);
        assertThat(riskContributors1).isNotEqualTo(riskContributors2);
        riskContributors1.setId(null);
        assertThat(riskContributors1).isNotEqualTo(riskContributors2);
    }
}
