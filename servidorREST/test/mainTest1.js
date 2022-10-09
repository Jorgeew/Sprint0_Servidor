// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------


// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
const request = require('request')
const assert = require('assert')

const IP_PUERTO = "http://localhost:8080"

// --------------------------------------------------------------------------------
// main ()
// --------------------------------------------------------------------------------
describe("Test 1: prueba funcionamiento (recuerda arrancar el servidor)", function () {


	// ........................................................................... 
	// .1 
	// ........................................................................... 
	
	
	it("probar POST /insertarMedicion", function (hecho) {

		// esta función prueba está en logica/funciones/prueba
		var datos = {
			id: null, valor: 1, fecha: "prueba", nombreSensor: "Test", longitud: 1, latitud: 2
		}

		request.post(
			{
				url: IP_PUERTO + "/insertarMedicion",
				headers: { 'User-Agent': 'Jorge', 'Content-Type': 'application/json' },
				body: JSON.stringify(datos)
			},
			function (err, respuesta, carga) {
				assert.equal(err, null, "¿ha habido un error?")
				assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
				hecho()
			} // callback
		) // .post
	}) // it

	// ........................................................................... 
	// .2
	// ........................................................................... 
	

	it("probar GET /todasMediciones", function (hecho) {
		request.get(
			{
				url: IP_PUERTO + "/todasMediciones",
				headers: { 'User-Agent': 'Jorge' }
			},
			function (err, respuesta, carga) {
				var solucion = JSON.parse(carga)
				//console.log(solucion[0]);
				assert.equal(err, null, "¿ha habido un error?")
				assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
				assert.equal(solucion[0].id, 8, "¿no esta bien el nombre?")
				assert.equal(solucion[0].valor, 55, "¿no esta bien el nombre?")
				hecho()
			} // callback
		) // .get
	}) // it


	// ........................................................................... 
	// .3
	// ........................................................................... 
	
	it("probar * DELETE /borrarConID/:id", function (hecho) {

		request.delete(
			{
				url: IP_PUERTO + "/borrarConID/19" ,
				headers: { 'User-Agent': 'Jorge'},
			},
			function (err, respuesta, carga) {
				assert.equal(err, null, "¿ha habido un error?")
				assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
				hecho()
			} // callback
		) // .post
	}) // it
	

}) // describe

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

