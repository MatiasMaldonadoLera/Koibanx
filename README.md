#Challengue 

1. [Requerimientos](#requerimiento)
2. [Consideraciones](#consideraciones)
3. [Forma de Entrega](#for_entrega)
4. [Nota](#nota)

## Requerimientos <a name="requerimiento"></a>

a. Un endpoint que devuelva la lista paginada y decorada de Comercios. La URL es /api/stores. Tiene que validar que quien ingresa sea un usuario de la aplicación.
b. Un endpoint que permita la creación de nuevos Comercios. Tiene que validar que quien ingresa sea un usuario de la aplicación y que el body que se carga sea válido (estén todos los campos y tengan el formato correcto).

## Consideraciones <a name="consideraciones"></a>
a. El ejercicio debe ser resuelto en Node.js y Express.
b. Se utiliza Mongo / Mongoose para el manejo de datos.
c. La conexión con la base de datos ya está provista y está escrito el modelo de Store.
d. Los endpoints tienen que estar autenticados. El método a usar es basicAuth
(usuario: test@koibanx.com, contraseña: test123).
e. El usuario ya viene creado, la password está hasheada mediante bcrypt.
f. La estructura de las rutas está dada, la implementación es libre.
g. Utilizar decorators para formatear los datos del GET.
h. Se deben crear tests unitarios para todas las funcionalidades.
i. Es un plus crear una función seeder que genere datos de prueba.
j. Es un plus el manejo de errores tanto de autenticación como de dominio.
k. Es un plus la creación de tests de integración.

## Forma de Entrega <a name="for_entrega"></a>
a. Descargar el zip: Koibanx Backend Challenge
b. Se deberá correr con npm i y luego npm start (añadir las instrucciones y
consideraciones necesarias en el README.md)
c. Si requiere algún proceso adicional para instalarlo, deberá explicarlo en el readme.
d. Si se tomó alguna consideración o hipótesis para la confección deberá aclararlo en
el readme.
e. Crear un repositorio con el código y los commits hechos.
f. Enviar un email a tech@koibanx.com con asunto ‘Challenge backend’ y con el link
del repositorio.

## Nota <a name="nota"></a>
No llegue a terminar el challengue, no me di cuenta que tenia un repositorio en el zip, lo hice sin fijarme, espero que puedan verlo igual.Agregue motores de plantilla para la visualizacion. El proyecto funciona con npm i  y npm start
