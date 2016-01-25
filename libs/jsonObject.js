/*
 * ---------------------------------------------------------------------------------------------------
 * Autor Gonzalo Fleitas Pastor
 * Descripcion: Libreria javascript para guardar, editar y eliminar datos en un fichero JSON para poder usarlo como table de base de datos.
 * Version: 1.0
 * ---------------------------------------------------------------------------------------------------
 * */
var fs = require('fs');
var jsonObject = function(file){
	
	this.filename = 'data.json';
	if(file){
		this.filename = file;
	}
	
	this.__json_data = Object();
	this.__json_data.data = [];
	
	this.loadData = function(callbak){
		var obj_aux = this;
		var json_data="";
		fs.readFile(this.filename, 'utf8', function(err, data) {
			if( err ){
				//console.log(err)
			}else{
				obj_aux.__json_data = JSON.parse(data);
			}
			if(callbak){
				callbak();
			}
		});
	}
	
	this.loadDataExample = function(){
		var json_str = '{"data":[{"nombre":"Gonzalo","apellido":"Fleitas","email":"gonzalo@gmail.com"},{"nombre":"Anita","apellido":"Perez","email":"anita@gmail.com"},{"nombre":"Carlitos","apellido":"Martinez","email":"carlitos@gmail.com"}]}';
		this.__json_data = JSON.parse(json_str);
	}
	
	this.add = function(obj){
		this.__json_data.data.push(obj);
	};
	
	this.edit = function(index, data){
		this.__json_data.data[index] = data;
	};
	
	this.del = function(index){
		this.__json_data.data.splice(index, 1);
	};
	
	this.save = function(){
		var json_str = JSON.stringify(this.__json_data);
		fs.writeFile(this.filename, json_str, function(err) {
			if( err ){
				console.log(err);
			}else{
				console.log('Se guardaron los datos.');
			}
		});
	};
	
	this.getDataAll = function(){
		return this.__json_data.data;
	}
	
	this.getLastDataInsert = function(){
		var last_index = this.__json_data.data.length-1;
		return this.__json_data.data[last_index];
	}
	
	this.getData = function(index){
		return this.__json_data.data[index];
	}
}

module.exports = jsonObject;
