package com.mitocode.service.impl;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import com.mitocode.dto.FiltroDTO;
import com.mitocode.model.Curso;
import com.mitocode.model.Matricula;
import com.mitocode.repo.ICursoRepo;
import com.mitocode.repo.IEstudianteRepo;
import com.mitocode.repo.IGenericRepo;
import com.mitocode.repo.IMatriculaRepo;
import com.mitocode.service.IMatriculaService;

import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class MatriculaServiceImpl extends CRUDImpl<Matricula, String> implements IMatriculaService {

	@Autowired
	private IMatriculaRepo repo;

	@Autowired
	private IEstudianteRepo estudianteRepo;

	@Autowired
	private ICursoRepo cursoRepo;

	@Override
	protected IGenericRepo<Matricula, String> getRepo() {
		return repo;
	}

	@Override
	public Flux<Matricula> obtenerMatriculaPorFiltro(FiltroDTO filtro) {
		String criterio = filtro.getIdEstudiante() != null ? "C" : "O";

		if (criterio.equalsIgnoreCase("C")) {
			return repo.obtenerMatriculaPorEstudiante(filtro.getIdEstudiante());
		} else {
			return repo.obtenerMatriculaPorFecha(filtro.getFechaInicio(), filtro.getFechaFin());
		}
	}

	@Override
	public Mono<byte[]> generarReporte(String idEstudiante) {

		return repo.findById(idEstudiante)
				// Obteniendo Estudiante
				.flatMap(f -> {
					return Mono.just(f).zipWith(estudianteRepo.findById(f.getEstudiante().getId()), (fa, cl) -> {
						fa.setEstudiante(cl);
						return fa;
					});
				})
				// Obteniendo cada Curso
				.flatMap(f -> {
					return Flux.fromIterable(f.getCursos()).flatMap(it -> {
						return cursoRepo.findById(it.getId()).map(p -> {
//									it.setCurso(p.get);									
							return new Curso(p.getId(), p.getNombre(), p.getSiglas(), p.getEstado());
						});
					}).collectList().flatMap(list -> {
						// Seteando la nueva lista a matricula
						f.setCursos(list);
						return Mono.just(f); // devolviendo factura para el siguiente operador (doOnNext)
					});
				})
				// Obteniendo bytes[]
				// .publishOn(Schedulers.boundedElastic())
				.map(f -> {
					File file;
					try {
						Map<String, Object> parametros = new HashMap<String, Object>();
						parametros.put("txt_estudiante",
								f.getEstudiante().getNombres() + " " + f.getEstudiante().getApellidos());

						file = new ClassPathResource("/reports/matriculas.jrxml").getFile();
						JasperCompileManager.compileReportToFile(file.getPath());
						File jasper = new ClassPathResource("/reports/matriculas.jasper").getFile();
						JasperPrint print = JasperFillManager.fillReport(jasper.getPath(), parametros,
								new JRBeanCollectionDataSource(f.getCursos()));
						return JasperExportManager.exportReportToPdf(print);
					} catch (Exception e) {
						e.printStackTrace();
					}
					return new byte[0];
				});
	}

}
