package com.mitocode.controller;

import static org.springframework.hateoas.server.reactive.WebFluxLinkBuilder.linkTo;
import static org.springframework.hateoas.server.reactive.WebFluxLinkBuilder.methodOn;
import static reactor.function.TupleUtils.function;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.Links;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mitocode.model.Estudiante;
import com.mitocode.service.IEstudianteService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/estudiantes")
public class EstudianteController {

	@Autowired
	private IEstudianteService service;

	@GetMapping
	public Mono<ResponseEntity<Flux<Estudiante>>> listar() {
		Flux<Estudiante> fxClientes = service.listar();

		return Mono.just(ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(fxClientes));
	}

	@GetMapping("/{id}")
	public Mono<ResponseEntity<Estudiante>> listarPorId(@PathVariable("id") String id) {
		return service.listarPorId(id).map(p -> ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(p))
				.defaultIfEmpty(ResponseEntity.notFound().build());
	}

	@PostMapping
	public Mono<ResponseEntity<Estudiante>> registrar(@Valid @RequestBody Estudiante Cliente,
			final ServerHttpRequest req) {
		return service.registrar(Cliente)
				.map(p -> ResponseEntity.created(URI.create(req.getURI().toString().concat("/").concat(p.getId())))
						.contentType(MediaType.APPLICATION_JSON).body(p));
	}

	@PutMapping("/{id}")
	public Mono<ResponseEntity<Estudiante>> modificar(@Valid @RequestBody Estudiante Cliente,
			@PathVariable("id") String id) {

		Mono<Estudiante> monoCliente = Mono.just(Cliente);
		Mono<Estudiante> monoBD = service.listarPorId(id);

		return monoBD.zipWith(monoCliente, (bd, p) -> {
			bd.setId(id);
			bd.setNombres(p.getNombres());
			bd.setApellidos(p.getApellidos());
			bd.setDni(p.getDni());
			bd.setEdad(p.getEdad());
			return bd;
		}).flatMap(service::modificar) // ClienteNuevo -> service.modificar(ClienteNuevo)
				.map(p -> ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(p))
				.defaultIfEmpty(new ResponseEntity<Estudiante>(HttpStatus.NOT_FOUND));
	}

	@DeleteMapping("/{id}")
	public Mono<ResponseEntity<Void>> eliminar(@PathVariable("id") String id) {
		return service.listarPorId(id).flatMap(p -> {
			return service.eliminar(p.getId()).then(Mono.just(new ResponseEntity<Void>(HttpStatus.NO_CONTENT)));
		}).defaultIfEmpty(new ResponseEntity<Void>(HttpStatus.NOT_FOUND));
	}

	@GetMapping("/hateoas/{id}")
	public Mono<EntityModel<Estudiante>> listarHateoasPorId(@PathVariable("id") String id) {
		Mono<Link> link1 = linkTo(methodOn(EstudianteController.class).listarPorId(id)).withSelfRel().toMono();
		Mono<Link> link2 = linkTo(methodOn(EstudianteController.class).listarPorId(id)).withSelfRel().toMono();

		return link1.zipWith(link2).map(function((left, right) -> Links.of(left, right)))
				.zipWith(service.listarPorId(id), (lk, p) -> EntityModel.of(p, lk));
	}

	@GetMapping("/listarEdadDesc")
	public Mono<ResponseEntity<Flux<Estudiante>>> listarPorEdadDescendente() {
		Flux<Estudiante> fxClientes = service.findAllByOrderByEdadDesc();

		return Mono.just(ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(fxClientes));
	}
}
