package com.tcs.fraud_detection.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A RiskContributors.
 */
@Entity
@Table(name = "risk_contributors")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class RiskContributors implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "client_id")
    private Long clientId;

    @Column(name = "risk_contributors")
    private String riskContributors;

    @Column(name = "description")
    private String description;

    @Column(name = "weightage")
    private Double weightage;

    @Column(name = "delete_flag")
    private String deleteFlag;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getClientId() {
        return clientId;
    }

    public RiskContributors clientId(Long clientId) {
        this.clientId = clientId;
        return this;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public String getRiskContributors() {
        return riskContributors;
    }

    public RiskContributors riskContributors(String riskContributors) {
        this.riskContributors = riskContributors;
        return this;
    }

    public void setRiskContributors(String riskContributors) {
        this.riskContributors = riskContributors;
    }

    public String getDescription() {
        return description;
    }

    public RiskContributors description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getWeightage() {
        return weightage;
    }

    public RiskContributors weightage(Double weightage) {
        this.weightage = weightage;
        return this;
    }

    public void setWeightage(Double weightage) {
        this.weightage = weightage;
    }

    public String getDeleteFlag() {
        return deleteFlag;
    }

    public RiskContributors deleteFlag(String deleteFlag) {
        this.deleteFlag = deleteFlag;
        return this;
    }

    public void setDeleteFlag(String deleteFlag) {
        this.deleteFlag = deleteFlag;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        RiskContributors riskContributors = (RiskContributors) o;
        if (riskContributors.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), riskContributors.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RiskContributors{" +
            "id=" + getId() +
            ", clientId=" + getClientId() +
            ", riskContributors='" + getRiskContributors() + "'" +
            ", description='" + getDescription() + "'" +
            ", weightage=" + getWeightage() +
            ", deleteFlag='" + getDeleteFlag() + "'" +
            "}";
    }
}
