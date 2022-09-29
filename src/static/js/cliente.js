//cliente

const producto = {};
const socket = io();




    

socket.on('resultado', data => {

 
  datas={
    "title": "Escuadra",
    "price": "12.3",
    "thumbnail": "www",
   
  }
  const div = document.querySelector(".curepo_tabla");
    console.log(productohtml(data))
    div.insertAdjacentHTML("beforeend", productohtml(datas));
    
  
})
//const div = document.querySelector(".curepo_tabla");
    //console.log(productohtml(data))
    //div.insertAdjacentHTML("beforeend", productohtml(data));
  
function productohtml(data){
  const html = `

  <tr id="producto_id_0">      
      <td > <img src="${data.thumbnail}" alt="" width="50px"></td>
      <td>${data.title} </td>
      <td>${data.price}</td>
    </tr>`
    return html
}