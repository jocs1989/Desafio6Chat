//cliente

const socket = io();

function agregarProductos() {
  const form = document.getElementById("formularios");

  form.addEventListener("submit", function (e) {
    socket.emit("agregar", {
      title: document.getElementById("title").value,
      price: document.getElementById("price").value,
      thumbnail: document.getElementById("thumbnail").value,
    });
  });
}

socket.on("resultado", (data) => {
  const div = document.getElementById("cuerpo_tabla");
  const html = data
    .map(
      (dato) => `

    <tr id="producto_id_${dato.id}">      
        <td > <img src="${dato.thumbnail}" alt="Imagen de ${dato.title}" width="50px"></td>
        <td>${dato.title} </td>
        <td>${dato.price}</td>
      </tr>`
    )
    .join("");
  console.log(html);

  div.innerHTML = html;
});

function enviarMensaje() {
  

  let fecha = new Date().toLocaleString();
  let year = new Date().getFullYear();
  socket.emit("msg", {
    mail: document.getElementById("chatname").value,
    fecha: fecha,
    msg: document.getElementById("textoChat").value,
    year: year,
  });
}

socket.on("mensageresultado", (data) => {
  const div = document.getElementById("chat-content");

  const html = data
    .map(
      (dato) => `
      <div class="media media-chat media-chat-reverse">
      <img class="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="...">
      <span class="colormail">${dato.mail}</span> [<span class="colortime">${dato.fecha}</span>]
      <div class="media-body">        
        <p><br> ${dato.msg}</p>
        <p class="meta"><time datetime="${dato.year}">[dato.fecha]</time></p>
      </div>
    </div>`
    )
    .join("");
  console.log(html);

  div.innerHTML = html;
});
