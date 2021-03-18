package com.mitocode.repo;

import java.time.LocalDate;

import org.springframework.data.mongodb.repository.Query;

import com.mitocode.model.Matricula;

import reactor.core.publisher.Flux;

public interface IMatriculaRepo extends IGenericRepo<Matricula, String>{

	@Query("{'estudiante' : { _id : ?0 }}")
	Flux<Matricula> obtenerMatriculaPorEstudiante(String estudiante);
	
	@Query("{'fechaMatricula' : { $gte: ?0, $lt: ?1} }") //Between 02-11-20 >= 04-11-20
	Flux<Matricula> obtenerMatriculaPorFecha(LocalDate fechaInicio, LocalDate fechaFin);
}
