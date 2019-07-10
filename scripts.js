

// localStorage.lastname = "Smith";
// // // Retrieve
// document.getElementById("result").innerHTML = localStorage.lastname;

var myDB = openDatabase('nigma', '1.0', 'base de datos Nigma', 2 * 1024 * 1024);

var app = new Vue({
	el: '#app',
	data: {
		message: 'Hello Vue!',
		usuarios: [],
		nombre: null,
		email: null
	},
	methods: {

		guardarRegistro: function(){

			var unique = (new Date().getTime()).toString(36);

			var nombre = this.nombre;
			var email = this.email;
			myDB.transaction(function (tran) {
				tran.executeSql('insert into Usuarios (id, nombre, email) values (?,?,?)', [unique, nombre, email]);

				// Consulta a usuarios
				tran.executeSql('SELECT * FROM Usuarios', [], function (tran, data) {


					for (var i = 0; i < data.rows.length; i++) {
						// console.log(data.rows[i]);

						app.usuarios = data.rows;
					}


	            });
			});

			this.nombre = null;
			this.email = null;
		}
	}

})


$(function(){

	console.log((new Date().getTime()).toString(36));

	// Validar la conexión
	if(myDB){

		myDB.transaction(function (tran) {

			// Crear tabla si no existe
			tran.executeSql('CREATE TABLE IF NOT EXISTS Usuarios (id unique, nombre, email)');

			// Insertar registros
			tran.executeSql('insert into Usuarios (id, nombre, email) values (1, "Jeison Sanchez", "jeison@nigma.co")');
			tran.executeSql('insert into Usuarios (id, nombre, email) values (2, "Randy Garcia", "randypruebas@gmail.com")');
			tran.executeSql('insert into Usuarios (id, nombre, email) values (3, "Liliana Anaya", "lilimar@nigma.co")');




		});


		myDB.transaction(function (tran) {

			// Consulta a usuarios
			tran.executeSql('SELECT * FROM Usuarios', [], function (tran, data) {


				for (var i = 0; i < data.rows.length; i++) {
					// console.log(data.rows[i]);

					app.usuarios = data.rows;
				}

            });

		});

	}


});
