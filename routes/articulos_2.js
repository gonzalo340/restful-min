var express = require('express');
var router = express.Router();
var jsonObject = require('../libs/jsonObject');
var Form = require('../libs/form');
var FormField = Form.FormField;
var articulo = new jsonObject('data/articulos.json');

var auto_id = 1; // Campo id autoincremental

/* Formulario de ejemplo que llama al POST para guardar los datos */
router.get('/new', function(req, res, next) {
	var frm = new Form({
					"nombre"	: new FormField({"type": "text"}).fetch(),
					"moneda"	: new FormField({"type": "text", "value": "$"}).fetch(),
					"precio"	: new FormField({"type": "text", "value": "0"}).fetch()
				});

	frm.title="Ingresar art&iacute;culo";
	frm.buttonTitle="Guardar";
	frm.method="POST";
	frm.url="/articulos/add";
	res.send(frm.fetch());
});

/* Agrega un articulo */
router.post('/add', function(req, res, next) {

	/* Antes de guardar un articulo se debe cargar nuevamente todos los articulos (Esto es debido a un BUG de la clase jsonObject que aún no se pudo resolver, lo mismo pasa con la modificación y la eliminación de registros) */
	articulo.loadData(function(){

		var message = ''; // Si se detecta algun error, lo guardo en esta variable.
		var data_insert = []; // Esta variable se usa para guardar el ultimo dato almacenado.
		
		/* Agrego un articulo */
		if(req.body.nombre && req.body.moneda && req.body.precio){
			
			if(req.body.precio > 0){
				
				/* Obtengo el id autoincremental y le sumo 1 */
				if(articulo.getDataAll().length){
					auto_id = articulo.getDataAll().length+1;
				}
				
				articulo.add({
					"id"		: auto_id,
					"nombre"	: req.body.nombre,
					"moneda"	: req.body.moneda,
					"precio"	: req.body.precio*1
				});
				auto_id++; // Incremento id
				articulo.save(); // Guardo los datos
				message= "Los datos fueron guardados correctamente.";
				data_insert = articulo.getLastDataInsert();
			}else{
				message= "El precio debe ser mayor a cero.";
			}
		}else{
			message= "Faltan campos.";
		}
		
		/* Muestro mensaje en formato JSON al usuario */
		res.send({
			'message':message,
			'data': data_insert
		});
		
	});
	
});

/* Modifica un articulo */
router.post('/update', function(req, res, next) {
		
	var message = ''; // Si se detecta algun error, lo guardo en esta variable.
	var data_insert = []; // Esta variable se usa para guardar el ultimo dato almacenado.
	
	/* Modifico un articulo */
	if(req.body.index && req.body.nombre && req.body.moneda && req.body.precio){
		
		if(req.body.precio > 0){
			
			/* Obtengo el id autoincremental */
			req.body.index = req.body.index*1;
			auto_id = req.body.index+1;
			
			articulo.edit(req.body.index,
			{
				"id"		: auto_id,
				"nombre"	: req.body.nombre,
				"moneda"	: req.body.moneda,
				"precio"	: req.body.precio*1
			});
			articulo.save(); // Guardo los datos
			message= "Los datos fueron guardados correctamente.";
			data_insert = articulo.getData(req.body.index);
		}else{
			message= "El precio debe ser mayor a cero.";
		}
	}else{
		message= "Faltan campos.";
	}
	
	/* Muestro mensaje en formato JSON al usuario */
	res.send({
		'message':message,
		'data': data_insert
	});
	
});

router.get('/remove/:index', function(req, res, next) {
	if(req.params.index){
		data_articulo = articulo.getData(req.params.index);				
		articulo.del(req.params.index);
		articulo.save();
		
		res.send({
			'message':'Se elimino el articulo exitosamente.',
			'data': data_articulo
		});
		
	}
});

/* Muestra una tabla HTML con los datos */
router.get('/', function(req, res, next) {
	articulo.loadData(function(){
		var rows = articulo.getDataAll();
		
		var html = '<table border="1" width="50%">';
		html += '<tr>';
		html += '<th>ID</th>';
		html += '<th>NOMBRE</th>';
		html += '<th>PRECIO</th>';
		html += '</tr>';
		
		for(var i=0; i<rows.length; i++){
			html += '<tr>';
			html += '<td>'+rows[i].id+'</td>';
			html += '<td>'+rows[i].nombre+'</td>';
			html += '<td>'+rows[i].moneda+' '+rows[i].precio+'</td>';
			html += '</tr>';
		}
		html += '</table>';

		res.send(html);
	});
});

/* Muestra los datos pero en formato json */
router.get('/json', function(req, res, next) {
	articulo.loadData(function(){
		var data = articulo.getDataAll();
		res.send(data);
	});
});

module.exports = router;
