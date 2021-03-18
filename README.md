# Matriculación
--------------
Requisitos
jdk 11
MongoDB 4.x+


--------------
Se pide crear los servicios REST para 

CRUD Estudiantes
--------------
Id: string

Nombres: string

Apellidos: string

DNI: string

Edad: int


CRUD Cursos
--------------

Id: string

Nombre: string

Siglas: string

Estado: boolean

Registrar Matricula
--------------
  Comprende un documento dentro de una colección NOSQL que brinde la siguiente información. 
      Fecha Mátricula: | LocalDateTime 
      
      Estudiante | Class 
      
      Cursos: [ ref:1, ref2. etc… ] | Array DbRef (Si es Boot <2.2, sino no usar DbRef)
      
      Estado: boolean
      
Lista estudiantes ordenados de forma descendente por edad.
--------------
Consideraciones técnicas:
--------------

Enfoque de Anotaciones y Funcional Endpoints para la creación de TODOS los servicios.

Valida inputs a su criterio (@Valid y RequestValidator Funcional).

Control de excepciones globales.

Todos los endpoints protegidos con Spring Security + JWT.

Solo con tokens vigentes se podrá consumir servicios.


URL:
--------------
http://localhost:8080/estudiantes

http://localhost:8080/cursos

http://localhost:8080/matriculas

