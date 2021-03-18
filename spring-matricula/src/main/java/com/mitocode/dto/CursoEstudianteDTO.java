package com.mitocode.dto;

import com.mitocode.model.Estudiante;
import com.mitocode.model.Curso;

public class CursoEstudianteDTO {

	private Estudiante cliente;
	private Curso curso;	
	
	public CursoEstudianteDTO(Estudiante cliente, Curso curso) {		
		this.cliente = cliente;
		this.curso = curso;
	}
	public Estudiante getCliente() {
		return cliente;
	}
	public void setCliente(Estudiante cliente) {
		this.cliente = cliente;
	}
	public Curso getPlato() {
		return curso;
	}
	public void setPlato(Curso curso) {
		this.curso = curso;
	}
	
	
}
