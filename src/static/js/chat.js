//cliente


const socket = io();




function enviarMensaje(){
  console.log(Enrtre)
    
  let fecha=new Date().toLocaleString()
  let  year=new Date().getFullYear()      
  socket.emit('msg', {
        'mail':document.getElementById('chatname').value,
        'fecha':fecha,
        'msg':document.getElementById('textoChat').value,
        'year':year
  }
  
  
  )
    
 

}



socket.on('mensageresultado', data => {



    const div = document.getElementById("chat-content");

    const html  =data.map(dato=>`
      <div class="media media-chat">
      <img class="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="...">
      ${dato.mail}
      <div class="media-body">        
        <p><br> ${dato.msg}</p>
        <p class="meta"><time datetime="${dato.year}">[${dato.fecha}]</time></p>
      </div>
    </div>`).join('');
        console.log(html);
    
      div.innerHTML=html;
      
     
  })