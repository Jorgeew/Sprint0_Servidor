
// ........................................................
// mainTest1.js
// ........................................................
const Logica = require("../Logica.js")
var assert = require("assert")
// ........................................................
// main ()
// ........................................................

// es donde empieza la prueba del test 

describe("Test 1: Funcionamiento de la logica", function () {
	// ....................................................
	// ....................................................
	var laLogica = null
	// ....................................................
	// ....................................................
	it("conectar a la base de datos", function (hecho) {  // la prueba concreta, el cual tiene su tittulo y un callback con una funcion con cualquier nombre. 
		laLogica = new Logica(  // crear un objeto --> 
			"../bd/dbmedicion",
			function (err) {
				if (err) {
					throw new Error("No he podido conectar con datos.db")
				}
				hecho()
			})
	}) 
    
    // it
	// ....................................................
	// ....................................................
	//it("borrar todas las filas", async function () {
	//	await laLogica.borrarFilasDeTodasLasTablas()
	//})

	// it
	// ....................................................
	// ....................................................

	it("puedo insertar una medicion", async function () {
		try {
			await laLogica.insertarMedicion(
				{
					id: null,
					valor: 2,
					fecha: "30/09/2022",
					nombreSensor: "test.js",
					longitud: 39,
					latitud: 0,
				}
            )
			var res = await laLogica.buscarMedicionConID("22")
			//assert.equal(res.length, 1, "¿no hay un resulado?")  // -->  (a, b, c) -> if (a!=b) --> return c 
			assert.equal(res[0].valor, 2, "¿no es 32?")
			

		} catch (error) {
			error = err;
		}
	})

	  // it
	// ....................................................
	// ....................................................

	it("puedo mostrar todas las medicion", async function () {
		try {
			var res = await laLogica.mostrarTodasMediciones()
			assert.equal(res[0].id, 8, "¿no es 1?")
			assert.equal(res[0].valor, 55, "¿no es 12?")  // el assert es un if 
           
		} catch (error) {
			error = err;
		}
	})

	// it
	// ....................................................
	// ....................................................

	it("puedo borrar el daton que he añadido", async function () {
		try {
			await laLogica.borrarFilasConID("medicion","22")
		} catch (error) {
			error = err;
		}
	})

    // it
	// ....................................................
	// ....................................................
	it("cerrar conexión a la base de datos",
		async function () {
			try {
				await laLogica.cerrar()
			} catch (err) {
				// assert.equal( 0, 1, "cerrar conexión a BD fallada: " + err)
				throw new Error("cerrar conexión a BD fallada: " + err)
			}
		}
	) // it

})

