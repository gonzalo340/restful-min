# restful-min
RestFul en NodeJS y express de prueba, que almacena y recupera datos en un fichero json usandolo como base de datos.

## Instalación
Clonar el repo con el siguiente comando:
git clone https://github.com/gonzalo340/restful-min

## Instalar las dependencias del proyecto
cd restful-min && npm install

## Crear el directorio data en la raiz del proyecto
mkdir data

## arrancar el servidor con el siguiente comando:
node app.js

## Por último
Ingresar a la siguiente url desde el navegador para poder ver el ejemplo.
http://localhost:8080/articulos

#### Por cualquier consulta, escribirme a gonzalo340@gmail.com

### BUGS encontrados
Cada vez que se quiera guardar, modificar o eliminar un registro en el fichero JSON, se eliminan todos los que ya estan ingresados. Para solucionar ese problema, se debe cargar todos los datos en la misma función que se usa para guardar, modificar o eliminar un registro.
