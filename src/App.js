import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario.js';
import Cita from './components/Cita.js';

function App() {
	//revisamos si hay citas del state citas en el localStorage para despues comenzar a almacenarlas alli
	let citasIniciales = JSON.parse(localStorage.getItem('citas'));

	if (!citasIniciales) {
		citasIniciales = [];
	}

	//state para almacenar las citas creadas.
	const [citas, guardarCitas] = useState(citasIniciales);

	//uso de useEffect para realizar operaciones cuando el state cambia
	useEffect(() => {
		let citasIniciales = JSON.parse(localStorage.getItem('citas'));

		if (citasIniciales) {
			localStorage.setItem('citas', JSON.stringify(citas));
		} else {
			localStorage.setItem('citas', JSON.stringify([]));
		}
	}, [citas]);

	//funcion que toma las citas actuales y agrega una nueva
	const crearCita = (cita) => {
		guardarCitas([...citas, cita]);
	};

	//funcion que elimina una cita por su id
	const eliminarCita = (id) => {
		const nuevasCitas = citas.filter((cita) => cita.id !== id);
		//aqui actualizo el state de citas por medio de su funcion guardarCitas
		guardarCitas(nuevasCitas);
	};

	//ternario para evaluar si el state de citas tiene algo y asi mismo muestre los mensajes
	const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';

	return (
		<Fragment>
			<h1>Administrador de Pacientes</h1>;
			<div className="container">
				<div className="row">
					<div className="one-half column">
						<Formulario crearCita={crearCita} />
					</div>
					<div className="one-half column">
						<h2>{titulo}</h2>
						{citas.map((cita) => (
							<Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />
						))}
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default App;
