package com.tcs.fraud_detection.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A FilePath.
 */
@Entity
@Table(name = "file_path")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FilePath implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "client_id")
    private Long clientId;

    @Column(name = "file_param")
    private String fileParam;

    @Column(name = "file_name")
    private String fileName;

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

    public FilePath clientId(Long clientId) {
        this.clientId = clientId;
        return this;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public String getFileParam() {
        return fileParam;
    }

    public FilePath fileParam(String fileParam) {
        this.fileParam = fileParam;
        return this;
    }

    public void setFileParam(String fileParam) {
        this.fileParam = fileParam;
    }

    public String getFileName() {
        return fileName;
    }

    public FilePath fileName(String fileName) {
        this.fileName = fileName;
        return this;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getDeleteFlag() {
        return deleteFlag;
    }

    public FilePath deleteFlag(String deleteFlag) {
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
        FilePath filePath = (FilePath) o;
        if (filePath.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), filePath.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FilePath{" +
            "id=" + getId() +
            ", clientId=" + getClientId() +
            ", fileParam='" + getFileParam() + "'" +
            ", fileName='" + getFileName() + "'" +
            ", deleteFlag='" + getDeleteFlag() + "'" +
            "}";
    }
}
