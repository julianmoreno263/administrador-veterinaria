import React, { Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({ crearCita }) => {
	//State de citas
	const [cita, actualizarCita] = useState({
		mascota: '',
		propietario: '',
		fecha: '',
		hora: '',
		sintomas: '',
	});

	// state para el manejo del error en el formulario
	const [error, actualizarError] = useState(false);

	//funcion que actualiza el state por medio del evento onChange cada vez que se escribe en un input

	const actualizarState = (e) => {
		actualizarCita({
			...cita,
			[e.target.name]: e.target.value,
		});
	};

	//extraemos los valores del state cita con destructuring
	const { mascota, propietario, fecha, hora, sintomas } = cita;

	//funcion para hacer submit del formulario
	const submitCita = (e) => {
		e.preventDefault();

		//validar el formulario
		if (
			mascota.trim() === '' ||
			propietario.trim() === '' ||
			fecha.trim() === '' ||
			hora.trim() === '' ||
			sintomas.trim() === ''
		) {
			actualizarError(true);
			return;
		}

		actualizarError(false);

		//crear un id

		cita.id = uuidv4();

		//enviar la cita a la bd, crear la cita

		crearCita(cita);

		//reiniciar el formualrio
		actualizarCita({
			mascota: '',
			propietario: '',
			fecha: '',
			hora: '',
			sintomas: '',
		});
	};

	return (
		<Fragment>
			<h2>Crear Cita</h2>

			{error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}

			<form onSubmit={submitCita}>
				<label>Nombre Mascota</label>
				<input
					type="text"
					name="mascota"
					className="u-full-width"
					placeholder="Nombre Mascota"
					onChange={actualizarState}
					value={mascota}
				/>

				<label>Nombre Dueño</label>
				<input
					type="text"
					name="propietario"
					className="u-full-width"
					placeholder="Nombre del dueño de la mascota"
					onChange={actualizarState}
					value={propietario}
				/>

				<label>Fecha</label>
				<input type="date" name="fecha" className="u-full-width" onChange={actualizarState} value={fecha} />

				<label>Hora</label>
				<input type="time" name="hora" className="u-full-width" onChange={actualizarState} value={hora} />

				<label>Síntomas</label>
				<textarea className="u-full-width" name="sintomas"></textarea>

				<button type="submit" className="u-full-width button-primary">
					Agregar Cita
				</button>
			</form>
		</Fragment>
	);
};

//aqui documentamos los componentes por medio de propTypes
Formulario.propTypes = {
	crearCita: PropTypes.func.isRequired,
};

export default Formulario;
