/*
En este archivo crearemos una app de administrador de citas para una veterinaria.

1- creamos el proyect con npx create-react-app citas

2- una vez creado vamos a realizar una limpieza de los archivos que se crean por defecto, primero eliminamos el App.css pues utilizaremos nuesa propia hoja de estilos, sera una hoja de estilos globales que el profe deja. Hay varias formas de vincular css en React, esta es la forma mas sencilla, crear una sola hoja de estilos para todo el proyecto, esa hoja de estilos es el css para el index.js. Aqui tambien eliminamos de src los archivos de test.js y logo.svg y desvinculamos esto de App.js.

3- copiamos el index.css que dejo el profe y lo reemplazamos en el que tenemos, esta sera la nueva hoja de estilos para nuestra app, este index.css es la hoja de estilos para el archivo de index.js, pues este index.js es el que va a renderizar el componente principal App.js, y a lavez App.js es el que tiene todos los componentes que creemos en nuestra app.

4- tambien como vamos a usar el framework skeleton para css y otras hojas de estilo para el index.html que esta en public, el profe deja unos enlaces a cdn que nos vinculan a estas hojas de estilo, los copiamos y en index.html de public reemplazamos el title por este codigo.

5- ahora, en App.js eliminamos todo lo que esta dentro del return y ponemos un h1 y veremos como va quedando la nueva interfaz de react para nuestra app.

------------------------------------------------------------------------------------------

Listo, en este punto ya podemos comenzar a trabajar en App.js y realizar el codigo para los componentes d ela app, en terminos generales se haran dos columnas,una donde este el componente para el formulario y otra donde se mostraran las citas que se creen, aqui se haran otros componentes, recordar que este proyecto usara el local storage para que si recargamos la pagina no se borren los datos,queden alamcenados en el storage del navegador.

1- creamos en App.js un container, como usaremos skeleton que es un framework para css, este tendra una sintaxis diferente de tailwind para el nombre de las clases.

2- creamos dos columnas para dividir la app, una sera  donde estara el formulario y otra sera donde se muestren las citas creadas. Debemos colocar todo en un Fragm,ent para que react pueda retornar solo un elemento, esto en App.js.

3- ya creadas las dos divisiones, crearemos nuestro primer componente para el Formulario.js, esto dentro de una nueva carpeta para los componentes.

4- dentro del archivo del formulario importamos react con imr, y creamos el componente con sfc, dentro del return de este componente podemos ponerle mientras tanto un titulo solo para ir probando si todo funciona, es buena practica ir probando pococ a poco las cosas sea en el lenguaje que sea. Ahora este componente se lo importamos al App.js y lo pasamos en la primera columna para renderizarlo y lo probamos, asi.

                        <div className="one-half column">
						    <Formulario />
					    </div>


--------------------------------------------------------------------------------------

ahora vamos a trabajarle al formulario, vamos a crear los campos.

1- primero que todo ponemos un Fragment para que retorne todo como un solo elemento.

2- colocamos un h2 para un titulo en n uestro formulario

3- creamos un <form> para comenzar a crear los campos de mi formulario, y para cada campo creamos un label, ahora, las etiquetas input no tienen etiqueta de cierre, pero react nos pide colocarle /> para cerrarlas.

4- cada etiqueta input tendra varios atributos, como name,type,etc, entonces por convencion se deben ir escribiendo esos atributos uno debajo del otro para tener un orden, aunque el plugin que instalamos en vsc lo va ordenando todo,creamos los campos necesarios del formulario teniendo en cuenta de cambiar el atributo name para cada uno,pues este atributo identificara el campo.El ultimo campo sera un text area para escribir los sintomas de la mascota. Por ultimo ponemos un boton tipo submit para enviar el formulario.


-------------------------------------------------------------------------------------

Vamos a crear el state para este formulario, para este archivo del componente Formulario.js vamos a crear el state dentro de este componente, en practicas pasadas habiamos creado el state de la app en el componente principal App.js, asi quedaba mas global, pero tambien podemos crear el state de forma mas local para el componente que necesitemos,depende como vayamos a trabajar.

1- importamos el hook useState en Formulario.js en la misma linea donde importamos react.

2- en la zona segura para escribir js, antes del return, creamos nuestro state del formulario, lo llamaremos cita y tendra su correspondiente funcion para actualizarlo, este state sera de tipo objeto porque aqui se ira almacenando los datos del formulario,osea los name de los input del formulario, mascota,propietario,fecha,etc. queda asi:

						//State de citas
							const [cita, actualizarCita] = useState({
								mascota: '',
								propietario: '',
								fecha: '',
								hora: '',
								sintomas: '',
							});

en principio todas las propiedades del objeto estaran vacias porque en el primer momento el formulario no tendra nada escrito.

3- ahora, la funcion que actualiza el state es la que se va a ejecutar cada vez que el usuario este escribiendo en un input, entonces esta funcion la llamamos por medio de un evento onChange,hay varios eventos en js donde podemos hacer esto pero se utiliza este para trabajar los formularios, este evento hace la llamada a una funcion que podemos nombrar como actualizarState, asi que creamos esta funcion y esta funcion a la vez llamara a actualizarCita que es la que en si actualizara nuestro state,es como llamar a la funcion del sate por medio de otra,pues asi lo reconoce el evento. Para cada input quedaria asi el llamado a esta funcion.

									onChange={actualizarState}


4- la funcion del evento onChange se llama actualizarState, la creamos debajo del state como una arrow function como una function expression, y para ir probandola podemos colocarle un console.log, asi cuando escribamos algo en un input debe ejecutarse este console.log:

								
								const actualizarState = () => {
									console.log('escribiendo');
								};

esta funcion se la paso a todos los inputs por medio del evento onChange.

-----------------------------------------------------------------------------------------

ahora lo que necesitamos es ir capturando lo que el usuario va escribiendo en cada input, poder leerlo, para esto debemos usar el objeto del evento e y las propiedades target y la propiedad name y value, con e.target.name puedo saber que input especifico es donde se esta escribiendo y con el objeto del evento e.target.value puedo capturar lo que se escribe, ademas usaremos la funcion del state actualizarCita para que al escribir en un input este state se vaya actualizando con la nueva información que se esta escribiendo.

1- le pasamos a nuestra funcion del evento actualizarState el objeto del evento e.

2- dentro de esta funcion del evento es donde utilizamos la funcion del state actualizarCita,recordar que no se puede actualizar el state directamente,osea hacer cita.name=, porque esto no sigue las reglas de React, se debe actualizar el state por medio de su funcion, y para capturar el input especifico donde se esta escribiendo y capturar a la vez lo que se escribe y asi ir actualizando el objeto del state ponemos el siguiente codigo:

								[e.target.name]: e.target.value,

entonces con este codigo ya capturamos el input donde se esta escribiendo y lo que se esta escribiendo, de esta forma la funcion actualizarCita va actualizando el state cita,recordar que el state cita es un objeto por lo que se utilizan parentesis dentro de la funcion actualizarCita, el codigo queda asi.

									const actualizarState = (e) => {
											actualizarCita({
												[e.target.name]: e.target.value,
											});
										};

para ir viendo si funciona, vamos a react developer tools y en components vamos a formulario,porque este state esta en el componente Formulario y alli vemos el state,al ir escribiendo en el formulario veremos que el state cita debe de ir tomando los cambios.

3- si observamos, al escribir en un input el state va tomando ese cambio, pero si escribimos en otro input, elimina el anterior y nos muestra el actual, por lo que para corregir esto debemos siempre con un spread operator ir pasandole una copia del state y asi no eliminara lo anterior, mantendra los cambios de cada input, asi:

										const actualizarState = (e) => {
											actualizarCita({
												...cita,
												[e.target.name]: e.target.value,
											});
										};

4- listo, ya podemos ver que el state del formulario se actualiza bien, este codigo de la funcion actualizarState junto con el onChange que se le debe de pasar a cada input lo vamos a utilizar siempre en formularios con React, es sencillo y trabaja bien capturando y actualizando el state del componente de formularios.

-------------------------------------------------------------------------------------------

Ahora, podemos extraer los datos del state con destructuring asi:

					const {mascota,propietario,fecha,hora,sintomas}=cita

y le pasamos a cada input el valor que tiene en ese momento colocando la propiedad value en cada input asi:

										value={mascota}


esto lo hacemos para cada input con su correspondiente valor de name, con este codigo es que podremos ir haciendo la validacion del formulario, por eso debemos extraer los elementos del state cita y colocar en cada input su correspondiente value que tiene en ese momento.

1- ahora, vamos a escribir el codigo para cuando el usuario envia el formulario, osea hace submit,para esto se utiliza en la etiqueta form el evento onSubmit el cual llamara a una funcion que realizara el trabajo, por ejemplo llamamos a esa funcion submitCita asi:

								onSubmit={submitCita}


2- ahora, creamos esa funcion, podemos ponerle un alert dentro para probar si al dar click en el boton se ejecuta.

3- debemos usar el objeto del evento e para prevenir la accion por defecto del submit que es la de enviar la consulta por la url por medio de la peticion GET, esto es para evitar que la consulta se vea reeflejada en la url,por lo que usamos e.preventDefault(). Para confirmar esto se debe de recargar la pagina.

4- ahora, ya sabemos que al dar submit se ejecuta la funcion, pero esta funcion debe de realizar cuatro cosas para enviar la cita ya sea a una bd o donde la estemos almacenando:

						1- validar el formulario
						2- asignar un id para esa cita
						3- crear la cita, osea enviarla a la bd.
						4- reiniciar el formulario


5- validar el formulario: aqui lo hacemos con un if, validamos cada campo del formulario, por esto hicimos destructuring de cita para que al escribir la validacion nos quede mas facil. En el if vamos colocando cada campo del formulario con el metodo trim() el cual va viendo si hay espacios vacios en el input, si hay espacios vacios sacamos una alerta y debemos siempre poner un return para que en caso de errores el codigo no se siga ejecutando. Hacemos lo mismo para cada campo utilizando el operador or ||.

6- ahora, en vez de colocar un mensaje de error en consola, porque el usuario no puede estar revisando la consola, creamos un state para el error de la validacion en caso de que lo haya, es recomendable hacer varios states, no hay que tener miedo de hacerlos, asi el codigo es mas mantenible y las funcionalidades se manipulan mejor. Entonces para el error creamos un state que sera un boolean y comenzara en false porque en un primer momento no habra errores, si hay un error el state cambiara a true.

								const [error, actualizarError] = useState(false);


7- ahora, ya creado el state con su funcion que lo actualiza, esta funcion es la que se le pasa al if en la validacion del formulario en la funcion submitCita, aqui en la validacion se llama a esa funcion pero se le pasara como parametro un true, osea si hay error el if lo detecta y llama a esta funcion y le pasa un true, osea cambia el state a true(lo podemos ver en components en herramientas de desarrollador), y como el state cambio podemos entonces usar un operador ternario para mostrar en el form un mensaje de error( recordar que en el Fragment no podemos usar un if, usamos el operador ternario para validar condicionales.), este operador ternario evalua el state error y si es true muestra el mensaje de error, sino simplemente se le pasa un null. Despues del if  debemos volver a colocar la funcion actualizarError(false),  en false, para que se elimine el mensaje de error,o si no sige saliendo asi la validacion este bien. Este codigo es la forma de validar en React, siempre que tengamos un formulario asi es que lo validamos.

---------------------------------------------------------------------------------------

Ahora ya echa la validacion del formulario vamos a crear el id para las citas,un id debe ser unico para cada cita, nosotros podemos generarlo manualmente haciendo este codigo:

										cita.id=20

aqui le agregamos al state de cita un parametro id y le damos un valor, pues recordemos que el state de cita es un objeto, pero si tuvieramos una bd esta lo asignaria dinamicamente, como no la tenemos podemos utilizar una ibreria llamada " uuid", esta la instalamos via npm asi:

										npm i uuid

1- Ya instalada la libreria la agregamos al componente importandola, importamos la version 4 asi:

										import {v4 as uuidv4} from 'uuid';

2- despues en nuestro codigo para los id colocamo  cita.id=uuidv4(); y asi tendremos id dinamicos para cada cita, llamando a este metodo. Podemos confirmarqu se genere este id con un consol.log(cita)

------------------------------------------------------------------------------------------

Ahora, debemos crear un state que sera el state principal pues es el que ira almacenando todas las citas creadas, el state que tenemos hasta ahora es el del componente Formulario y es local, pero este nuevo state sera como el principal y lo crearemos en el componente principal App.js pues aqui se almacenaran las citas creadas y las mostraremos en un nuevo componente que se mostrara en el lado derecho de la aplicacion.

1- importamos el useState en App.js

2- creamos el state para las citas que se van creando, sera un state de tipo array y comienza como un array vacio, lo llamamos citas, el state del formulario se llama cita(en singular), este lo llamamos citas(en plural) pues guardara todas las citas creadas.

3- ahora, citas tiene su funcion para ser actualizada, pero para mas orden primero creamos una funcion que tome las citas actuales y agrege la nueva, la llamaremos crearCita y tomara como parametro una cita.

										const crearCita=(cita)=>{
											console.log(cita)
										}

4- ahora, le pasamos por medio de props esta funcion al componente Formulario, recordar que la forma en que fluyen los datos del padre al hijo es por medio de props, para pasarle esta funcion no es necesario ponerle los parentesis, react ya sabe que es una funcion que se esta pasando:

							<Formulario 
									crearCita={crearCita}

							/>

si vamos a components y vemos Formulario en sus props veremos que esta funcion pasa a ser una props del componente Formulario.

5- ahora, como a este componente Formulario ya le pasamos via props esta funcion, se la ponemos en su zona de parametros dentro de {} y asi ya la podemos usar,despues  la llamamos en la funcion submitCita() despues del codigo donde creamos el id, y se le pasa como parametro el state cita, pues este tiene las citas que se van creando. Como en el App.js crearCita tiene un console.log() asi podemos probar que se este comunicando todo y se este visualizando la cita creada.(ver video 59)

6- ahora, ya confirmado que se visualiza la cita creada, la debemos guardar en el state de citas en App.js, entonces reemplazamos ese console.log de la funcion crearCita por la funcion que actualiza el state de citas llamada guardarCitas, y como el state citas es un array le pasamos [] y siempre debemos pasar una copia del state con el spread operator y por ultimo la cita creada, asi:

							const crearCita=(cita)=>{
								guardarCitas([
									...citas,
									cita
								])
							}

de esta forma si creamos una cita y vamos al componente App.js y vemos su state de citas veremos que es un array y se agrega esta nueva cita. De esta forma es que vamos capturando las citas que hacemos desde el componente Formulario y las almacenamos en un state principal del componente principal App.js para despues poder mostrarlas.

----------------------------------------------------------------------------------------

Por ultimo debemos poder limpiar el formulario despues de haber enviado una cita nueva con el boton de submit.

1- esto es facil, en el componente Formulario, en la funcion submitCita despues de haber llamado a la funcion crearCita, para reiniciar el formulario simplemente utilizamos a la funcion que actualiza el state de cita llamada actualizarCita y le pasamos nuevamente todas las propiedades que tiene el state cita originalmente, osea con valores de string vacios, asi volvera a limpiar el formulario:

							actualizarCita({
								mascota: '',
								propietario: '',
								fecha: '',
								hora: '',
								sintomas: '',
							});


recordar que en cada input del formulario le pasamos la propiedad  value={mascota} y asi para cada input, por lo que esto detecta el valor del input y como estaran vacios pues los limpia. Asi de facil se reinicia en React un formulario.

------------------------------------------------------------------------------------------

ahora vamos a ver como mostrar ese state de citas donde se estan almacenando todas las citas creadas, para esto vamos a App.js y trabajamos sobre el div que creamos para la segunda columna en que dividimos nuestra app.

1- en ese div colocamos un titulo para que se vea al mostrar nuestras citas creadas.

2- ahora, lo que se hace es iterar el state citas que es un array, ya que en este state es donde estan las citas que vamos creando, en ese mismo div iteramos el state citas por medio de un map() el cual se le pasa una funcion, esta funcion necesitara un parametro que sera una cita y dentro de la funcion vamos a iterar un nuevo componente que llamaremos Cita, el codigo queda asi:

							{citas.map((cita) => {
								<Cita />;
							})}

3- creamos este componente Cita donde se mostraran las citas creadas, este componente es sencillo, tendra dentro un div para ir mostrando cada cita.

4- este componente lo importamos a App.js, y dentro de la llamada a este componente le debemos ir pasando la cita como una prop, tambien se le debe de ir pasando su id el cual sera una key,recordar que en React cuando iteramos de esta forma siempre debemos pasarle un key para especificar cada elemento creado,asi:

						{citas.map((cita) => (
							<Cita key={cita.id} cita={cita} />
						))}

asi como esta, si creamos una cita podemos ir a components y veremos que se crea un id para esa cita.

5- ahora, en el componente Cita debemos pasarle esta prop cita en su zona de parametros, recordar que cita es un objeto que tiene todas las propiedades de una cita,nombre,propietario,etc, entonces debemos pasarle esta cita como prop al componente Cita para poder ir extrayendo estas propiedades y pintarlas, el componente Cita va quedando asi:

							
							cconst Cita = ({ cita }) => (
								<div className="cita">
									<p>
										Mascota: <spam>{cita.mascota}</spam>
									</p>
									<p>
										Dueño: <spam>{cita.propietario}</spam>
									</p>
									<p>
										Fecha: <spam>{cita.fecha}</spam>
									</p>
									<p>
										Hora: <spam>{cita.hora}</spam>
									</p>
									<p>
										Síntomas: <spam>{cita.sintomas}</spam>
									</p>
								</div>
							);

							export default Cita;


NOTA: el componente Cita lo creamos con el return implicito, osea sin {}, solo entre (), de esta forma se muestra en App.js.

De esta forma ya podemos mostrar nuestras citas en pantalla con todos los datos, usando este segundo componente Cita.js!!!!

-----------------------------------------------------------------------------------------

vamos a crear el boton para elimina una cita, este boton estara en el componente Cita.js que es donde se van mostrando las citas creadas.

1- creamos un elemento button debajo de los elementos p de la cita creada y le pasamos unas clases css, le ponemos tambien la entidad llamada &times; la cual me saca una x para el boton.

2- ahora, este boton tambien llamara a una funcion que eliminara una cita por su id, pero esta funcion la creamos desde App.js porque hay es donde esta el state de citas donde se guardan todas las citas y nos queda mas facil eliminar una cita desde aqui, o si no nos tocaria pasarle el state de citas al componente Cita.js y asi queda mas complicado.

3- entonces, creamos la funcion eliminarCita en App.js, esta funcion se la pasamos en este mismo archivo como prop al componente Cita asi:

								<Cita 
									eliminarCita={eliminarCita}
								/>

ahora nos vamos al componente Cita.js y le pasamos esta funcion en su zona de parametros y ya la podemos usar, recordar que esta es la forma como fluyen en React los datos desde el padre App.js a sus componentes hijos.

4- ahora, para usarla en el componente Cita.js la pasamos en el boton como una prop por medio del evento onClick, pero debemos pasarle la funcion desde una arrow function, porque si la llamamos directamente pues se ejecuta de una vez, y lo que necesitamos es que quede a la escucha del evento y hay si se ejecute, y se le pasa a esta funcion el id de la cita, el codigo para pasar la funcion sera asi:

						<botton  onClick={()=>eliminarCita(cita.id)}>Eliminar &times; </botton>

NOTA: PUEDO IR PROBANDO ESTA FUNCION PONIENDOLE UN CONSOLE.LOG(id), PARA QUE AL HACER CLICK ME SAQUE EL ID DE LA CITA EN CONSOLA.

5- ahora, para filtrar las citas por el id utilizo el metodo filter(), este metodo me va creando un nuevo array, por lo que creo una variable y doy citas.filter(). El metodo filter lo que hace es buscar el id que le paso y elimina los demas, pero lo que necesito es precisamente que busque el id y lo elimine y deje los otros, por lo que en la condicion del filter le pongo una funcion asi:

								
								const eliminarCita = (id) => {
									const nuevasCitas=citas.filter(cita=>cita.id!== id)
								};


de esta forma va a revisar el id de la cita, y si es diferente al id que se le pasa a esta funcion lo elimina y deja los otros.

6- despues del filter uso la funcion que actualiza el state de citas llamado guardarCitas el cual es un array, como filter me va haciendo un array nuevo pues el array nuevasCitas se lo paso a guardarCitas y asi se ira actualizando el state de citas.(v 62). 

Listo, ahora si tengo varias citas creadas, elimino una y me deja las demas en pantalla.

---------------------------------------------------------------------------------------------

ahora, cuando no hay citas para mostrar se deberia ver un mensaje que indicara algo, y uando ya hay citas creadas pues que nos aparezca el mensaje de Administra tus Citas, para esto usamos el state de citas y la propiedad length asi: citas.length, y por medio de un operador ternario evaluamos si hay citas en el state de citas o no y mostraremos los respectivos mensajes,esto lo hacemos desde App.js pues aqui es donde esta el state de citas. Este codigo lo ponemos dentro de una variable y esta variable se la pasamos al <h2>{titulo}</h2>, de esta forma se reemplazara dinamicamente el titulo segun como este el state de citas.

	const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';

asi, si hay o no hay citas me mostrara el respectivo mensaje.

-----------------------------------------------------------------------------------------

ahora, vamos a usar el localStorage del navegador para que al recargar la pagina no se pierdan los cambios echos, osea no se me pierdan las citas creadas, para esto se utiliza el hook de useEffect.

1- el useEffect en si no tiene nada que ver con el local storage, el useEffect lo que hace es ejecutar una funcion flecha(siempre es una arrow function) cuando el state del componente cambia, o cuando el mismo componente esta listo. Ahora, al use effect aparte de la arrow function se le debe de pasar un array vacio para indicarle que se ejecute una sola vez, porque si por ejemplo se esta consultando una API, useEffect se va a ciclar y se ejecuta varias veces.

2- el useEffect lo usaremos en el App.js, para que vaya viendo si el state de citas va cambiando y entonces se le indica en su funcion flecha que guarde los datos en el localStorage, primero el useEffect se usa asi:

								useEffect(()=>{

								},[])


el array vacio es el que le indica que se ejecute una sola vez, logico primero debemos importarlo igual que el useState.


3- ahora, el array del useEffect se llama dependencia, precisamente aqui en ese array se le pasa el state de citas, ese array es el que va a estar mirando si el state cambia y hace que s eejecute el useEffect.

								useEffect(()=>{

								},[citas])

de esta forma, si elimino una cita, o si creo una nueva,etc, se ejecutara lo que tenga adentro de su funcion el useEffect pues el state esta cambiando. Esto es lo que hace el useEffect, esta pendiente de los cambios del state de un componente y ejecuta lo que se le haya programado en su arrow function

4- ahora, localStorage esta en herramientas d edesarrollador,aplications y hay esta el localStorage, el solo almacena strings. Tambien podemos ver que esta sessionStorage, la diferencia entre los dos es que localStorage aunque cerremos la pagina mantiene los datos,es como una bd del navegador, pero sessionStorage al cerrar la pagina elimina los datos(por eso es de sesion).

5- entonces, primero reviso si el localStorage tiene algo, esto lo hacemos desde App.js colocando dentro de una variable let el siguiente codigo:

 					let citasIniciales=localStorage.getItem("citas")


despues, le decimos con un if si no hay citas en el localStorage pues que empieze como un array vacio asi:

								if(!citasIniciales){
									citasIniciales=[]
								}

como localStorage solo almacena strings debemos envolverlo en JSON.parse() para que se pueda manipular los datos.

						let citasIniciales= JSON.parse(localStorage.getItem("citas"))


6- ahora, esta variable del localStorage de citasIniciales pasara a ser el valor inicial del useStae de citas, mpues sera el array donde se almacenara todo.

7- ahora en el useEffect que es el que va a estar a la escucha del state para ver si cambia, ponemos un condicional if que evalue si el localStorage(osea citasIniciales) tiene algo o no, y dependiendo de eso vaya almacenando lo que hay en el state de citas o si no hay nada que ponga un array vacio.(ver codigo en App.js). El JSON.stringify lo que hace es pasar todo a string porque localStorage solo soporta string.

NOTA: EL LOCALSTORAGE SE DEBE CREAR  DENTRO DE UNA VARIABLE LET PARA PODER USARSE DESDE CUALQUIER LUGAR DEL CODIGO, EN ESTE CASO DESDE LOS HOOKS DE USESTATE Y USEEFFECT Y ADEMAS PORQUE LOS DATOS ALMACENADOS VAN A IR CAMBIANDO A MEDIDA QUE CREEMOS CITAS EN LA APP.

								let citasIniciales

8- para probar este codigo y ver si si almacena datos, vamos al storage y veremos inicialmente que inicia como un array vacio, si creo una cita se debe de almacenar en localStorage. Listo, asi de facil usamos el storage para almacenar los datos si no tenemos bd.

-----------------------------------------------------------------------------------------
Ahora vamos a ver que son los propTypes, estos son una forma de documentar los componentes que tenemos en nuestro codigo, por ejemplo si alguien mas mira el codigo y ve el componente Formulario desde el Fragment en App.js vera que tiene como prop a {crearCita}, pero no sabra bien si crearCita es un string,un array,un objeto,etc, asi que debemos irnos a nuestro Componente Formulario.js y desde alli se documenta, la documentacion se hace desde el propio componente y lo hacemos en todos los componentes que tengamos creados en nuestra app.

PropTypes ya viene por defecto en React asi que estos son los pasos para usarlos:

1- importamos PropTypes desde prop-types en nuestro componente Formulario.js

2- los componentes se documentan al final del codigo  antes del  export default, para documentar por ejemplo al componente Formulario usamos Formulario.propTypes{} y abrimos corchetes pues el propTypes se documenta como un objeto.

3- ahora, si vemos en Formulario tenemos crearCita que es una funcion,entonces dentro del propTypes documentamos que esto es una funcion,osea en si es para que al revisar el codigo podamos saber que tiene cada componente y que maneja, quedaria asi:

								Formulario.propTypes = {
									crearCita: PropTypes.func.isRequired,
								};


func indica que es una funcion y isRequired indica que es obligatorio que el componente Formulario tenga esta funcion, esto se puede ver en consola, si cambiamos por ejemplo func por un object en consola nos sacara un error indicando que el tipo del elemento esta mal.

4- hacemos lo mismo para el resto de componentes que tengamos creados, en este caso para Cita.js, en App.js no se hace porque App.js solo llama a esos componentes, se documenta es en los  componentes hijos  donde fluyen los datos. En Cita.js,si vemos desde App.js, tiene dentro id,cita y eliminarCita, el id no se documenta pero los otros dos si.

-------------------------------------------------------------------------------------

Deployment del proyecto

1- vamos a subir nuestro proyecto a Netlify, antes de cualquier cosa debemos revisar la terminal de VSC y ver si nos da errores.

2- si no hay errores, generamos el build de produccion,osea un archivo que es optimizado para poner el proyecto en produccion, este build siempre es mas ligero que en desarrollo. Lo generamos desde la terminal, debemos primero salirnos del servidor con CTRL+C y despues corremos npm run build.

3- Una vez termine, nos creara una carpeta llamada build, esta es la carpeta que se sube a Netlify.

4- Vamos a nuestra cuenta de Netlify y en la pestaña sites es donde vamos a subir la carpeta build, simplemente la arrastramos hasta el cuadro de lineas punteadas y se subira el proyecto.

5- el solo toma 5 segundos para subirlo, despues nos muestra una url que es la url del proyecto y listo, ya tenemos desplegado en internet nuestro proyecto React. LISTO!!! PROYECTO TERMINADO!!!



*/
