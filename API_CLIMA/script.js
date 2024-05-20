//obtener las referencias de los elementos DOM/HTML
const ciudadinput = document.getElementById('ciudad');
//obtenemos el botón 
const obtenerPronosticoBtn = document.getElementById('obtenerPronostico');
//Obtenemos el div vacio donde mostrar los resultados
const pronosticoDiv = document.getElementById('pronostico');
//obtener el evento click del botón
obtenerPronosticoBtn.addEventListener('click',obtenerPronostico)

function obtenerPronostico(){
   const ciudad = ciudadinput.value.trim();
   //verificar 
   if(ciudad===""){
    mostrarError('Por favor ingresa una ciudad >:v')
    return;
   }
   //copia y pega tu API key ahí
   const apiKey = "21107db366fef68b5c0f0468b2987090";
   const url =`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;
   //Realizar una solicitud HTTP utilizando fetch con la URL
   fetch(url)
    //La respuesta se convierte a formato JSON
     .then(Response => Response.json())
     .then (data =>{
        mostrarPronostico(data);
     })
     .catch(error=>{
      mostrarError('Error al obtener el pronostico')
     });
};
//Mostrar el pronostico en el DOM
function mostrarPronostico(data){

  const{name,main,weather} = data;
  const temmperatura = main.temp;
  const sensacion = main.feels_like;
  const humedad = main.humidity;

  //imprimir el objeto Json
  console.log(data);
   
  cons = pronosticoHTML= `
  <div class ="card">
   <div class="card-body>
    <h2 class= "card-title"> ${name}</h2>
    <p class="card-text">Temperatura: ${temmperatura}</p>
    <p class="card-text">Sensacion: ${sensacion}</p>
    <p class="card-text">Humedad: ${humedad}</p>
   </div>
  </div>`;
 //Se inserta el HTML generado en el elemento pronosticoDiv
  pronosticoDiv.innerHTML = pronosticoHTML;




}
function mostrarError(mensaje){
    //Crear una cadena HTML para mostrar el error
    const errorHTML = `
    <div class="alert alert-danger" role="alert">
    ${mensaje}
    </div>
    `;
    //Insertar el hmtml en el elemento pronosticoDiv
    pronosticoDiv.innerHTML = errorHTML;


}