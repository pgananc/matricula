package com.mitocode.repo;

import com.mitocode.model.Estudiante;

import reactor.core.publisher.Flux;

public interface IEstudianteRepo extends IGenericRepo<Estudiante, String>{

	Flux<Estudiante> findAllByOrderByEdadDesc();
	
}
