var newImage = '';
var app = {
    // Application Constructor
    initialize: function() {
        app.bindEvents();
		Parse.initialize("Ns2WMLtUdFZ4sFdTllyn0Aw3zAeSVQLlDPnY2VBi", "npwgUmKNMZJJT0KjeQbgxk4rO8GF98O4L5h6J8QM");
		app.cargarFiguras();
    },
    // Bind Event Listeners
    bindEvents: function() {
        document.addEventListener('deviceready', app.onDeviceReady, false);
    },
    // deviceready Event Handler
    onDeviceReady: function() {
		app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

	var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);
    },
	cargarFiguras: function(){
		var Figura = Parse.Object.extend("Figura");
		var query = new Parse.Query(Figura);
		var html = '';
		query.find({
			success: function(results) {
				//alert("Successfully retrieved " + results.length + " scores.");
				for (var i = 0; i < results.length; i++) { 
					var object = results[i];
					html += '<h2>'+ object.get('nombre')+ '<h2>';
					html += '<h5> Serie: ' + object.get('serie')+ '</h5>';
					html += '<img src= "' + object.get('foto').url() + '" width=100>';
					html += '<h4> Bio: ' + object.get('biografia')+ '</h4>';
				document.getElementById('figuresList').innerHTML = html;
				}
				//$('#figuresList').append(html);
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});
	},
	buscarImagen: function(){
		navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
		destinationType: Camera.DestinationType.DATA_URL ,
		sourceType: Camera.PictureSourceType.PHOTOLIBRARY});

		function onSuccess(imageData) {
			var image = document.getElementById('myImage');
			image.src = "data:image/jpeg;base64," + imageData;
			newImage=imageData;
		}

		function onFail(message) {
			alert('Failed because: ' + message);
		}
	},
	guardarMinifigure: function(){
		//alert("estoy guardando la minifigure");
		var Figura = Parse.Object.extend("Figura");
		var nuevaFigura = new Figura();
		var nombre = document.getElementById('nombre');
		nuevaFigura.set("nombre",nombre.value);
		//alert(nombre.value);
		
		var serie = document.getElementById('serie');
		nuevaFigura.set("serie",serie.value);
		//alert(serie.value);
		
		var biografia = document.getElementById('biografia');
		nuevaFigura.set("biografia",biografia.value);
		//alert(biografia.value);
		
		//var image = document.getElementById('myImage');	//el img 
		if (newImage!=''){
			var parseFile =  new Parse.File("mypic.jpg", {base64:newImage});
			nuevaFigura.set("foto",parseFile);
			nuevaFigura.save(null, {
				success: function(nuevaFigura) {
					// Execute any logic that should take place after the object is saved.
					alert('New object created with objectId: ' + nuevaFigura.id);
					app.cargarFiguras();
					//limpiar el form
					nombre.value="";
					serie.value="";
					biografia.value="";
					document.getElementById('displayImage').innerHTML = '<img id="myImage" width=100>';
					self.location="#inicio";
					
				},
				error: function(nuevaFigura, error) {
					// Execute any logic that should take place if the save fails.
					// error is a Parse.Error with an error code and description.
					alert('Failed to create new object, with error code: ' + error.description);
				}
			});
		}else{
			alert('Falta la imagen!');
		}
		
		//nuevaFigura.set("foto",parseFile);
		
	}
};