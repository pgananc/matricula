package com.mitocode.service;

import com.mitocode.dto.FiltroDTO;
import com.mitocode.model.Matricula;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface IMatriculaService extends ICRUD<Matricula, String> {

	Flux<Matricula> obtenerMatriculaPorFiltro(FiltroDTO filtro);
	Mono<byte[]> generarReporte(String idFactura);
}
