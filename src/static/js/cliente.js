//cliente


const socket = io();




function agregarProductos(){

  const form = document.getElementById('formularios');

  form.addEventListener('submit', function(e) {
      
      
      socket.emit('agregar', {
        title:document.getElementById('title').value,
        price:document.getElementById('price').value,
        thumbnail:document.getElementById('thumbnail').value
  })
    
  }) 

}

socket.on('resultado', data => {



  const div = document.getElementById("cuerpo_tabla");
    const html  =data.map(dato=>`

    <tr id="producto_id_${dato.id}">      
        <td > <img src="${dato.thumbnail}" alt="Imagen de ${dato.title}" width="50px"></td>
        <td>${dato.title} </td>
        <td>${dato.price}</td>
      </tr>`).join('')
      console.log(html);
  
    div.innerHTML=html;
    
   
})
//const div = document.querySelector(".curepo_tabla");
    //console.log(productohtml(data))
    //div.insertAdjacentHTML("beforeend", productohtml(data));
  
