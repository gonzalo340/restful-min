var express = require('express');
var router = express.Router();
var jsonObject = require('../libs/jsonObject');
var json = new jsonObject('data/example.json');

var index = 1; // Variable que se incrementa cada vez que se agrega un registro

/* Agrega un dato nuevo, incrementando un valor */
router.post('/add', function(req, res, next) {
	json.add({
		"nombre"	: "Nom " + index,
		"apellido"	: "Ape " + index,
		"email"		: "Ema " + index
	});
	index++;
	json.save();
	res.send('ok');
});

/* Edita los datos de un registro segun el indice del array */
router.get('/edit/:index/:nombre/:apellido/:email', function(req, res, next) {
	var i = req.params.index;
	var nombre = req.params.nombre;
	var apellido = req.params.apellido;
	var email = req.params.email;
	
	json.edit(i,{
		"nombre"	: nombre,
		"apellido"	: apellido,
		"email"		: email
	});
	json.save();
	res.send('ok');
});

/* Muestra una tabla HTML con los datos */
router.get('/', function(req, res, next) {
	json.loadData(function(){
		var data = json.getDataAll();
		
		var html = '<table border="1" width="50%">';
		html += '<tr>';
		html += '<th>NOMBRE</th>';
		html += '<th>APELLIDO</th>';
		html += '<th>EMAIL</th>';
		html += '</tr>';
		
		for(var i=0; i<data.length; i++){
			html += '<tr>';
			html += '<td>'+data[i].nombre+'</td>';
			html += '<td>'+data[i].apellido+'</td>';
			html += '<td>'+data[i].email+'</td>';
			html += '</tr>';
		}
		html += '</table>';

		res.send(html);
	});
});

/* Muestra los datos pero en formato json */
router.get('/json', function(req, res, next) {
	json.loadData(function(){
		var data = json.getDataAll();
		res.send(data);
	});
});

module.exports = router;
