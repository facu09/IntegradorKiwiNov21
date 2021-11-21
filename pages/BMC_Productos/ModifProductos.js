// alert ("Entrando al js de ModifProductos.js");

//Definicioes y vinculos a elementos del DOM
const inpNomProd = document.getElementById('nomProd');
const inpPrice = document.getElementById('price');
const inpPhoto = document.getElementById('photo');
const inpDesc = document.getElementById('desc');
const btnAlta = document.getElementById('btnAlta');
const btnCancelar = document.getElementById('btnCancelar');

const baseURL = 'https://back-sandbox.herokuapp.com/api';

const token = localStorage.getItem("token");    //recupero el token: Si esta logueado el usuario --> va a estar guardado en el localStorage

//     alert (token);

let arrayProductos = [];   //arreglo de los productos que viene del Backend de Juli, lo defino acá para tenerlos
const liPosActualProd = 0;  //indica la posición actual del producto

//hasta aca ya tenemos agarrados los input

//Arranco poniendo el foco en email
inpNomProd.focus()

// convertir una img en base64 ( string larguisimo), para enviarlo al back, y eso que se guarde en la db
// Y asi, cuando nosotros pidamos la info de nuestro usuario, nos envie el base64 de la img y podamos
// ponerlo en un <img src= para mostrarlo.
const toBase64 = () => {
    return new Promise((resolve, reject) => {
        const file =  inpPhoto.files[0];
        const reader = new FileReader();
      
        reader.addEventListener("load", function () {
          // convert image file to base64 string
          resolve(reader.result);
        }, false);
      
        if (file) {
          reader.readAsDataURL(file);
        } else {
            resolve('');
        }
    })
}

//Función para Validar el Alta de un Nuevo Usuario
const pasaValidacionesAlta = () => {
    //  alert("Email: " + inpEmail.value + ", name: " + inpName.value + ", lastName: " +  inpLastName.value + ", pass1: " + inpPassword1.value + ", pass2: " + inpPassword2.value + ", age " + inpAge.value ); 
    if (!inpNomProd.value) {
        alert ("¡Debe ingresar una Nombre de Producto válido! ");
        inpNomProd.focus()
        return false
    } 
    if (!inpPrice.value) {
        alert ("¡Debe ingresar el Precio del Producto! ");
        inpPrice.focus()
        return false
    } 
    // if (!inpPhoto.value) {
    //     alert ("¡Debe ingresar el Apellido del Usuario! ");
    //     inpPhoto.focus()
    //     return false
    // } 
    if (!inpDesc.value) {
        alert ("¡Debe ingresar la Edad del Usuario! ");
        inpDesc.focus()
        return false
    } 
    //Si llego acá es que paso validaciones OK.
    return true
}

LimpiaForm = () => {
    inpNomProd.value = "";
    inpPrice.value = "";
    inpPhoto.value = "";
    inpDesc.value = "";
    inpNomProd.focus();
}

// hago un Get de Productos del BackEnd
const getProductos = async () => {
try {
    //    alert("Entro al getProducts");
    //Sino tiene token
    if (!token || token === "undefined") {
        //voy a la ventana de Loguin
        alert ("¡¡No hay usuario Logueado!! \n\n Para utilizar esta Sección deberá Iniciar Seción.")
        //Vuelvo al Login para que se loguee
        window.location.replace("../../pages/Login/login.html"); // subo 2 niveles y estoy en el raiz
    } else {
        //si tiene token: 

        //   alert("Ahora si va a buscar los productos con el GET");
        // Recupero del BackEnd de 
        //'/products?limit=5&offset=0', {
        // const response = await fetch(`${baseURL}/products?limit=15&offset=6`, { // traigo los 15 primeros productos salteando los 6 primeros
        const response = await fetch(`${baseURL}/products?limit=9&offset=0`, {   //traigo los 5 primeros productos
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const json = await response.json();  //recupero lo que devuelve el Get del Fetch
        console.log (json)
        arrayProductos = json.data.data
        console.log (arrayProductos)

        //  alert("Termino el fetch");

        //Va a Rendierizar los productos en el DOM
        // renderProductos(arrayProductos);
        alert("Ya tengo los productos en el arreglo");

        }
    } catch( error ) {
        alert(error);
    }
}



//Obtengo todos los productos de Backend de Juli
getProductos();
console.log (arrayProductos);

renderUnProduct(liPosActualProd)

//Productos creados para probar
// Prod: 99
