package com.mitocode.model;

import java.time.LocalDateTime;
import java.util.List;

import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Document(collection = "matriculas")
public class Matricula {

	@Id
	private String id;

	@DateTimeFormat(pattern = "dd/MM/yyyy HH:mm:ss")
	private LocalDateTime fechaMatricula = LocalDateTime.now();

	// @DBRef
	@NotNull
	@Field(name = "estudiante")
	private Estudiante estudiante;

	private List<Curso> cursos;

	@NotNull
	@Field(name = "estado")
	private Boolean estado;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}


	public Estudiante getEstudiante() {
		return estudiante;
	}

	public void setEstudiante(Estudiante cliente) {
		this.estudiante = cliente;
	}

	public List<Curso> getCursos() {
		return cursos;
	}

	public void setCursos(List<Curso> cursos) {
		this.cursos = cursos;
	}

	public LocalDateTime getFechaMatricula() {
		return fechaMatricula;
	}

	public void setFechaMatricula(LocalDateTime creadoEn) {
		this.fechaMatricula = creadoEn;
	}

	public Boolean getEstado() {
		return estado;
	}

	public void setEstado(Boolean estado) {
		this.estado = estado;
	}
}
