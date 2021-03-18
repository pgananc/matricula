package com.mitocode.controller;

import static org.springframework.hateoas.server.reactive.WebFluxLinkBuilder.linkTo;
import static org.springframework.hateoas.server.reactive.WebFluxLinkBuilder.methodOn;
import static reactor.function.TupleUtils.function;

import java.net.URI;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mitocode.model.Curso;
import com.mitocode.pagination.PageSupport;
import com.mitocode.service.ICursoService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/cursos")
public class CursoController {

	private static final Logger log = LoggerFactory.getLogger(CursoController.class);

	@Autowired
	private ICursoService service;

	@GetMapping
	public Mono<ResponseEntity<Flux<Curso>>> listar() {
		Flux<Curso> fxPlatos = service.listar();

		service.listar().subscribe(i -> log.info(i.toString()));
		return Mono.just(ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(fxPlatos));
	}

	@GetMapping("/{id}")
	public Mono<ResponseEntity<Curso>> listarPorId(@PathVariable("id") String id) {
		return service.listarPorId(id).map(p -> ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(p))
				.defaultIfEmpty(ResponseEntity.notFound().build());
	}

	@PostMapping
	public Mono<ResponseEntity<Curso>> registrar(@Valid @RequestBody Curso curso, final ServerHttpRequest req) {
		return service.registrar(curso)
				.map(p -> ResponseEntity.created(URI.create(req.getURI().toString().concat("/").concat(p.getId())))
						.contentType(MediaType.APPLICATION_JSON).body(p));
	}

	@PutMapping("/{id}")
	public Mono<ResponseEntity<Curso>> modificar(@Valid @RequestBody Curso curso, @PathVariable("id") String id) {

		Mono<Curso> monoPlato = Mono.just(curso);
		Mono<Curso> monoBD = service.listarPorId(id);

		return monoBD.zipWith(monoPlato, (bd, p) -> {
			bd.setId(id);
			bd.setNombre(p.getNombre());
			bd.setSiglas(p.getSiglas());
			bd.setEstado(p.getEstado());
			return bd;
		}).flatMap(service::modificar) // platoNuevo -> service.modificar(platoNuevo)
				.map(p -> ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(p))
				.defaultIfEmpty(new ResponseEntity<Curso>(HttpStatus.NOT_FOUND));
	}

	@DeleteMapping("/{id}")
	public Mono<ResponseEntity<Void>> eliminar(@PathVariable("id") String id) {
		return service.listarPorId(id).flatMap(p -> {
			return service.eliminar(p.getId()).then(Mono.just(new ResponseEntity<Void>(HttpStatus.NO_CONTENT)));
		}).defaultIfEmpty(new ResponseEntity<Void>(HttpStatus.NOT_FOUND));
	}

	@GetMapping("/hateoas/{id}")
	public Mono<EntityModel<Curso>> listarHateoasPorId(@PathVariable("id") String id) {
		Mono<Link> link1 = linkTo(methodOn(CursoController.class).listarPorId(id)).withSelfRel().toMono();
		Mono<Link> link2 = linkTo(methodOn(CursoController.class).listarPorId(id)).withSelfRel().toMono();

		return link1.zipWith(link2).map(function((left, right) -> Links.of(left, right)))
				.zipWith(service.listarPorId(id), (lk, p) -> EntityModel.of(p, lk));
	}

	@GetMapping("/pageable")
	public Mono<ResponseEntity<PageSupport<Curso>>> listarPagebale(
			@RequestParam(name = "page", defaultValue = "0") int page,
			@RequestParam(name = "size", defaultValue = "10") int size) {

		Pageable pageRequest = PageRequest.of(page, size);

		return service.listarPage(pageRequest)
				.map(p -> ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(p))
				.defaultIfEmpty(ResponseEntity.noContent().build());
	}

}
