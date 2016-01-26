/*
 * Clase en JavaScript para armar formularios.
 * Autor Gonzalo Fleitas Pastor
 * Version 1.0
 * */
paramsString = function(arr){
	var str = '';
	for (var key in arr) {
		if(key != 'type'){
			str += key + '="' + arr[key] + '" ';
		}
	}
	return str;
}

var Form = function(fields){
	this.__fields = fields;
	this.method = 'GET';
	this.url = '';
	
	this.fetch = function(){
		var content = '<form class="form" action="'+this.url+'" method="'+this.method+'">';
		
		if(this.title){
			content += '<h2>' + this.title + '</h2>';
		}
		
		for (var key in this.__fields) {
			
			content += '<p>';
			
			if(!this.__fields[key].match(/type="hidden"/)){
				content += '<label>'+key+': </label>';
			}

			var field_str = this.__fields[key].replace(/\[field_id\]/, key + '_ID');
			field_str = field_str.replace(/\[field_name\]/, key);
			content += field_str;
			content += '</p>';
		}
		content += '<p>';
		var btnText = (this.buttonTitle)?this.buttonTitle:'Save';
		content += '<input type="submit" value="'+btnText+'" />';
		content += '</p>';
		content += '</form>';
		return content;
	};
}

Form.FormField = function(params){
	this.__params = params;
	this.fetch = function(){
		switch(this.__params['type']){
			case 'hidden':
				var params_str = paramsString(this.__params);
				return '<input type="hidden" id="[field_id]" name="[field_name]" ' + params_str + '/>';
				break;
			case 'text':
				var params_str = paramsString(this.__params);
				return '<input type="text" id="[field_id]" name="[field_name]" ' + params_str + '/>';
				break;
			case 'combobox':
				console.log("No implementado.");
				break;
		}
	};
}

module.exports = Form;
