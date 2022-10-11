// .....................................................................
// Logica.js
// .....................................................................
const sqlite3 = require("sqlite3")
// .....................................................................
// .....................................................................
module.exports = class Logica {
	// .................................................................
	// nombreBD: Texto
	// -->
	// constructor () -->
	// .................................................................
	constructor(nombreBD, cb) {
		this.laConexion = new sqlite3.Database(
			nombreBD,
			(err) => {
				if (!err) {
					this.laConexion.run("PRAGMA foreign_keys = ON")
				}
				cb(err)
			})
	} // ()

	
	// .................................................................
	// nombreTabla:Texto, id: R
	// -->
	// borrarFilasConID() -->
	// .................................................................
	borrarFilasConID(tabla, id) {
		return new Promise((resolver, rechazar) => {
			this.laConexion.run(
				"delete from " + tabla + " where id = " + id + ";",
				(err) => (err ? rechazar(err) : resolver())
			)
		})
	} // ()

	/*
	// .................................................................
	// borrarFilasDeTodasLasTablas() -->
	// .................................................................
	async borrarFilasDeTodasLasTablas() {
		await this.borrarFilasDe("medicion")
	} // ()
	*/

	// .................................................................
	// datos:{id: null, valor: R, fehca: Texto, nombreSensor: Texto, longitud: R, latitud: R}
	// -->
	// insertarMedicion() -->
	// .................................................................
	
	insertarMedicion(datos) {
		var textoSQL =
			"insert into medicion values($id, $valor, $fecha, $nombreSensor, $longitud, $latitud);"
		var valoresParaSQL = {
			$id: datos.id,
			$valor: datos.valor,
			$fecha: datos.fecha,
			$nombreSensor: datos.nombreSensor,
			$longitud: datos.longitud,
			$latitud: datos.latitud
		}
		console.log(datos.valor);
		console.log(datos.fecha);
		console.log(datos.nombreSensor);
		console.log(datos.longitud);
		console.log(datos.latitud);
		console.log("");
		
		// <//> <//> <//> <>/
		return new Promise((resolver, rechazar) => {
			this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
				(err ? rechazar(err) : resolver())
			})
		})
	} // ()

	// .................................................................
	// id: R
	// -->
	// buscarMedicionConID() <--
	// <--
	// {id: R, valor: R, fehca: Texto, nombreSensor: Texto, longitud: R, latitud: R}
	// .................................................................
	
	buscarMedicionConID(id) {
		var textoSQL = "select * from medicion where id=$id";  //$id es un parámetro 
		var valoresParaSQL = { $id: id } // objeto 
		return new Promise((resolver, rechazar) => {
			this.laConexion.all(textoSQL, valoresParaSQL,
				(err, res) => {
					(err ? rechazar(err) : resolver(res))
				})
		})
	}
	// ()

	// .................................................................
	// mostrarTodasMediciones() <--
	// <--
	// {id: R, valor: R, fehca: Texto, nombreSensor: Texto, longitud: R, latitud: R}
	// .................................................................
	mostrarTodasMediciones() {
		var textoSQL = "SELECT * FROM medicion";  //$id es un parámetro 
		var valoresParaSQL = { } // objeto 
		return new Promise((resolver, rechazar) => {
			this.laConexion.all(textoSQL, valoresParaSQL,
				(err, res) => {
					(err ? rechazar(err) : resolver(res))
					//console.log(res);
				})
		})
	}

	// .................................................................
	// cerrar() -->
	// .................................................................

	cerrar() {
		return new Promise((resolver, rechazar) => {
			this.laConexion.close((err) => {
				(err ? rechazar(err) : resolver())
			})
		})
	} // ()
	
}
// class
// .....................................................................
// .....................................................................
