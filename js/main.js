// main.js

// Obtener referencias a los elementos del DOM
const menuPrincipal = document.getElementById('menu-principal');
const reglas = document.getElementById('reglas');
const elegirAvatar = document.getElementById('elegir-avatar');
const ajustes = document.getElementById('ajustes');
const juego = document.getElementById('juego');

// Botones del menú principal
const btnReglas = document.getElementById('btn-reglas');
const btnAvatar = document.getElementById('btn-avatar');
const btnAjustes = document.getElementById('btn-ajustes');
const btnIniciar = document.getElementById('btn-iniciar');

// Botones para volver al menú
const btnVolverDesdeReglas = document.getElementById('btn-volver-menu-desde-reglas');
const btnVolverDesdeAvatar = document.getElementById('btn-volver-menu-desde-avatar');
const btnVolverDesdeAjustes = document.getElementById('btn-volver-menu-desde-ajustes');

// Función para mostrar una sección y ocultar las demás
function mostrarSeccion(seccion) {
  const secciones = [menuPrincipal, reglas, elegirAvatar, ajustes, juego];
  secciones.forEach(sec => {
    sec.classList.add('section-hidden');
    sec.classList.remove('section-visible');
  });
  seccion.classList.add('section-visible');
  seccion.classList.remove('section-hidden');
}

// Event Listeners para los botones
btnReglas.addEventListener('click', () => mostrarSeccion(reglas));
btnAvatar.addEventListener('click', () => mostrarSeccion(elegirAvatar));
btnAjustes.addEventListener('click', () => mostrarSeccion(ajustes));
btnIniciar.addEventListener('click', () => mostrarSeccion(juego));

btnVolverDesdeReglas.addEventListener('click', () => mostrarSeccion(menuPrincipal));
btnVolverDesdeAvatar.addEventListener('click', () => mostrarSeccion(menuPrincipal));
btnVolverDesdeAjustes.addEventListener('click', () => mostrarSeccion(menuPrincipal));

// Seleccionar elementos del DOM
const avatarContainer = document.getElementById('avatar-container');
const selectedAvatarContainer = document.getElementById('selected-avatar');


// Variable para almacenar el avatar seleccionado
let avatarSeleccionado = null;

// Agregar evento de clic a las imágenes de avatares
avatarContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('avatar')) {
    // Obtener el avatar seleccionado
    avatarSeleccionado = event.target.getAttribute('src');

    // Resaltar el avatar seleccionado
    document.querySelectorAll('.avatar').forEach(avatar => {
      avatar.style.border = '2px solid transparent';
    });
    event.target.style.border = '2px solid #007BFF';

    // Mostrar el avatar seleccionado en el juego
    selectedAvatarContainer.innerHTML = `<p>Has seleccionado el siguiente avatar:</p>
      <img src="${avatarSeleccionado}"
       alt="Avatar Seleccionado">
`;
  }
});

// Generar el tablero de 10x10
const tablero = document.getElementById('tablero');
const totalCeldas = 100;

// Crear celdas del tablero
for (let i = 1; i <= totalCeldas; i++) {
  const celda = document.createElement('div');
  celda.classList.add('celda');
  if (i === 1) celda.classList.add('salida'); // Salida
  if (i === totalCeldas) celda.classList.add('meta'); // Meta
  celda.textContent = i;
  tablero.appendChild(celda);
}

// Variables del juego
const jugadores = [];
let turnoActual = 0;
const cantidadJugadores = parseInt(document.getElementById('select-jugadores').value) || 3;




// Crear jugadores
for (let i = 0; i < cantidadJugadores; i++) {
  jugadores.push({ id: i + 1, posicion: 1 });
}

// Mostrar turno actual
const infoTurno = document.getElementById('info-turno');
const btnLanzarDados = document.getElementById('btn-lanzar-dados');
const resultadoDados = document.getElementById('resultado-dados');

// Lógica de lanzar dados
btnLanzarDados.addEventListener('click', () => {
  resultadoDados.innerHTML = ''; // Limpiar dados anteriores
  let avanceTotal = 0;

  for (let i = 0; i < 5; i++) {
    const dado = Math.floor(Math.random() * 6) + 1;
    avanceTotal += dado;

    const dadoElem = document.createElement('div');
    dadoElem.classList.add('dado');
    dadoElem.textContent = dado;
    resultadoDados.appendChild(dadoElem);
  }

  // Avanzar jugador actual
  const jugadorActual = jugadores[turnoActual];
  jugadorActual.posicion += avanceTotal;

  // Asegurar que no exceda el tablero
  if (jugadorActual.posicion > totalCeldas) {
    jugadorActual.posicion = totalCeldas;
  }

  // Actualizar posición en el tablero
  function actualizarTablero() {
    document.querySelectorAll('.celda').forEach(celda => celda.innerHTML = '');
    // Posicionar jugadores con su avatar
    jugadores.forEach(jugador => {
      const celda = tablero.children[jugador.posicion - 1];
      celda.textContent += `J${jugador.id} `;
    // Crear la imagen del avatar
    const imgAvatar = document.createElement('img');
    imgAvatar.src = jugador.avatar;
    imgAvatar.alt = `avatar${jugador.id}`;
    imgAvatar.classList.add('avatar-en-tablero');

    // Añadir el avatar a la celda
    celda.appendChild(imgAvatar);
    });
  }
// Mostrar tarjeta de evento para el jugador actual
mostrarTarjetaEvento();
  
  actualizarTablero();

  // Función para mostrar la tarjeta de evento
function mostrarTarjetaEvento() {
  const modal = document.getElementById('modal-evento');
  const mensajeEvento = document.getElementById('mensaje-evento');
  const cerrarModal = document.getElementById('cerrar-modal');

  // Seleccionar un evento aleatorio
  const eventoAleatorio = tarjetasEventos[Math.floor(Math.random() * tarjetasEventos.length)];
  mensajeEvento.textContent = eventoAleatorio;

  // Mostrar el modal
  modal.style.display = "block";

  // Cerrar el modal al hacer clic en la 'X'
  cerrarModal.addEventListener('click', () => {
    modal.style.display = "none";
  });
}

  // Verificar si llegó a la meta
  if (jugadorActual.posicion === totalCeldas) {
    alert(`¡El jugador ${jugadorActual.id} ha ganado!`);
    return;
  }

  // Pasar al siguiente turno
  turnoActual = (turnoActual + 1) % cantidadJugadores;
  infoTurno.textContent = `Turno del jugador ${jugadores[turnoActual].id}`;
});

// Tarjetas de eventos (ejemplos)
const tarjetasEventos = [
  "¡Avanza 3 casillas más!",
  "¡Pierdes un turno!",
  "¡Retrocede 2 casillas!",
  "¡Ganas 10 puntos extra en el siguiente lanzamiento!",
  "¡Intercambia posición con el jugador más cercano!"
];


// Función para mostrar la tarjeta de evento
function mostrarTarjetaEvento() {
  const modal = document.getElementById('modal-evento');
  const mensajeEvento = document.getElementById('mensaje-evento');
  const cerrarModal = document.getElementById('cerrar-modal');

  // Seleccionar un evento aleatorio
  const eventoAleatorio = tarjetasEventos[Math.floor(Math.random() * tarjetasEventos.length)];
  mensajeEvento.textContent = eventoAleatorio;

  // Mostrar el modal
  modal.style.display = "block";

  // Cerrar el modal al hacer clic en la 'X'
  cerrarModal.addEventListener('click', () => {
    modal.style.display = "none";
  });
}





// Inicializar el tablero con jugadores en la salida
actualizarTablero();


// Mostrar tarjeta de evento para el jugador actual
mostrarTarjetaEvento();
