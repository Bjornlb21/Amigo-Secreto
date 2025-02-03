// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

let amigos = [];
let notificationContainer = document.getElementById('notification');
let notificationMessage = document.getElementById('notification__message');
let buttonSortear = document.getElementById('sortear-amigo');
let listaAmigos = document.getElementById('listaAmigos');

function agregarAmigo() {
  validarEntradaUsuario();
  limpiarInput();
  recorrerListaAmigos();
}

function limpiarInput() {
  document.getElementById('amigo').value = '';
}

function limpiarListaAmigos() {
  while (listaAmigos.firstChild) {
    listaAmigos.removeChild(listaAmigos.firstChild);
  }
}

function limpiarListaSorteado() {
  let listaSorteado = document.getElementById('resultado');

  while (listaSorteado.firstChild) {
    listaSorteado.removeChild(listaSorteado.firstChild);
  }
}

function resetearListas() {
  amigos = [];

  limpiarListaAmigos();
  limpiarListaSorteado();
  messageIfListIsEmpty();
  actualizarBoton();
}

function validarEntradaUsuario() {
  
  let nombre = document.getElementById('amigo').value;

  let regex = /^[A-Za-záéíóúÁÉÍÓÚñÑ]+(\s[A-Za-záéíóúÁÉÍÓÚñÑ]+)*$/;

  if (nombre.trim() === '') {
    notificationMessage.textContent = 'El campo no puede estar vacío';
    notificationMessage.style.display = 'block';

    setTimeout(() => {
      notificationMessage.style.display = 'none';
    }, 3000);
  } else if (!regex.test(nombre)) {
    notificationMessage.textContent = 'El nombre no puede contener números o varios espacios';
    notificationMessage.style.display = 'block';

    setTimeout(() => {
      notificationMessage.style.display = 'none';
    }, 3000);
  } else if (amigos.some((amigo) => nombre.toLowerCase() === amigo.toLowerCase())) {
    notificationMessage.textContent = 'El nombre ya está en la lista de amigos.';
    notificationMessage.style.display = 'block';

    setTimeout(() => {
      notificationMessage.style.display = 'none';
    }, 3000);
  } else if (nombre.length < 3) {
    notificationMessage.textContent = 'El nombre debe tener más de 3 caracteres';
    notificationMessage.style.display = 'block';

    setTimeout(() => {
      notificationMessage.style.display = 'none';
    }, 3000);
  } else {
    amigos.push(nombre);
    actualizarBoton();
    console.log(amigos);
  }
}

function messageIfListIsEmpty() {
  
  listaAmigos.innerHTML = '';
  let li = document.createElement('li');

  if (amigos.length === 0) {
    li.textContent = 'La lista de amigos está vacía actualmente, agregue más amigos.';
    li.classList.add('empty-list');
    listaAmigos.append(li);
  } else {
    li.remove();
  }
}

function recorrerListaAmigos() {

  listaAmigos.innerHTML = '';

  amigos.forEach(amigo => {
    let li = document.createElement('li');

    li.textContent = amigo;

    li.classList.add('amigo-item');

    listaAmigos.append(li);
  });
}

function eliminarAmigoDeListaYArray(nombre) {
  let index = amigos.indexOf(nombre);

  if (index !== -1) {
    amigos.splice(index, 1);
  }

  let li = Array.from(listaAmigos.getElementsByTagName('li')).find(item => item.textContent === nombre);

  if (li) {
    li.remove();
  }
  console.log('Amigo eliminado de la lista ' + nombre);
}

function sortearAmigo() {

  // if (amigos.length < 3) {
  //   notificationMessage.textContent = 'No puede haber menos de tres amigos antes de Sortear';
  //   notificationMessage.style.display = 'block';

  //   setTimeout(() => {
  //     notificationMessage.style.display = 'none';
  //   }, 3000);
  // }

  // Si la lista de amigos no está vacía hacemos:
  if (amigos.length !== 0) {
    // Obtenemos el índice del amigo aleatorio según la longitud del array de amigos.
    let amigoAleatorio = Math.floor(Math.random() * amigos.length);

    // Según el índice aleatorio que obtengamos, lo buscamos dentro del array y lo asignamos a una variable.
    let amigo = amigos[amigoAleatorio];

    // Creamos un elemento <li>
    let li = document.createElement('li');

    // Dentro del <li> asignamos un mensaje junto con quién es el amigo secreto.
    li.textContent = `Tu amigo secreto es ${amigo}`;

    // Dentro de la lista de sorteo <ul> metemos el <li> con el mensaje de quién es el amigo sorteado.
    document.getElementById('resultado').append(li);

    // Una vez mostrado el amigo sorteado, llamamos a una función que elimina el nombre tanto del Array de amigos como de la Lista de Amigos <a>
    eliminarAmigoDeListaYArray(amigo);

    // Con el método setTimeout() eliminamos la etiqueta <li> que creamos para mostrar el mensaje del amigo sorteado, con una duración de 2 segundos.
    setTimeout(() => {
      li.remove();
    }, 5000);
    actualizarBoton();
  } else {
    actualizarBoton();
  }
}

function actualizarBoton() {
  if (amigos.length < 3) {
    buttonSortear.disabled = true;
    buttonSortear.classList.remove('button-draw');
    buttonSortear.classList.add('button-draw-disabled');
    notificationMessage.textContent = 'No puede haber menos de tres amigos antes de Sortear';
    notificationMessage.style.display = 'block';
      
  } else {
    buttonSortear.disabled = false;
    buttonSortear.classList.remove('button-draw-disabled');
    buttonSortear.classList.add('button-draw');
    notificationMessage.style.display = 'none';
  }
}

actualizarBoton();
messageIfListIsEmpty();
