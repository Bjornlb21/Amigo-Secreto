// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

let amigos = [];

function agregarAmigo() {
  validarEntradaUsuario();
  limpiarInput();
  recorrerListaAmigos();
}

function limpiarInput() {
  document.getElementById('amigo').value = '';
}

function limpiarListaAmigos() {
  let listaAmigos = document.getElementById('listaAmigos');

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
}

function validarEntradaUsuario() {
  let nombre = document.getElementById('amigo').value;

  if (nombre.trim() === '') {
    alert('El campo no puede estar vacío, ingrese un nombre válido.');
  } else {
    amigos.push(nombre);
    console.log(amigos);
  }
}

function recorrerListaAmigos() {
  let ul = document.getElementById('listaAmigos');

  ul.innerHTML = '';

  amigos.forEach(amigo => {
    let li = document.createElement('li');
    
    li.textContent = amigo;
    
    li.classList.add('amigo-item');

    ul.append(li);

  });
}

function sortearAmigo() {
  if (amigos.length === 0) {
    alert('La lista de amigos está vacía');
  } else {
    let amigoAleatorio = Math.floor(Math.random() * amigos.length);

    let amigo = amigos[amigoAleatorio];

    let li = document.createElement('li');

    li.textContent = `Tu amigo secreto es ${amigo}`;

    document.getElementById('resultado').append(li);
  }
}
