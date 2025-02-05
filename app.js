let amigos = [];
let notificationContainer = document.getElementById('notification');
let notificationMessage = document.getElementById('notification__message');
let inputAdd = document.getElementById('amigo');
let buttonSortear = document.getElementById('sortear-amigo');
let listaAmigos = document.getElementById('listaAmigos');

inputAdd.addEventListener('keypress', function(e){
  if (e.key === 'Enter') {
    agregarAmigo();
  }
})

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

  let errorMessage = '';

  if (nombre.trim() === '') {
    errorMessage = 'El campo no puede estar vacío';

    hideNotification()
  } else if (!regex.test(nombre)) {
    errorMessage = 'El nombre no puede contener números o varios espacios';

    hideNotification()
  } else if (amigos.some((amigo) => nombre.toLowerCase() === amigo.toLowerCase())) {
    errorMessage = 'El nombre ya está en la lista de amigos.';

    hideNotification()
  } else if (nombre.length < 3) {
    errorMessage = 'El nombre debe tener más de 3 caracteres';

    hideNotification()
  } else {
    amigos.push(nombre);
    actualizarBoton();
    return;
  }

  notificationMessage.textContent = errorMessage;
  notificationMessage.style.display = 'block';
  hideNotification();
  messageIfListIsEmpty();

}

function hideNotification(){
  return setTimeout(() => {notificationMessage.style.display = 'none';}, 3000);
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

  let li = Array.from(listaAmigos.getElementsByTagName('li')).find((item) => item.textContent === nombre);

  if (li) {
    li.remove();
  }
}

function sortearAmigo() {

  if (amigos.length !== 0) {

    let amigoAleatorio = Math.floor(Math.random() * amigos.length);

    let amigo = amigos[amigoAleatorio];

    let li = document.createElement('li');

    li.textContent = `Tu amigo secreto es ${amigo}`;

    document.getElementById('resultado').append(li);

    eliminarAmigoDeListaYArray(amigo);

    setTimeout(() => {
      li.remove();
    }, 5000);
    actualizarBoton();
  } else {
    actualizarBoton();
    return;
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
