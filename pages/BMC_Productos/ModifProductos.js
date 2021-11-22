// alert ("Entrando al js de ModifProductos.js");

//Definicioes y vinculos a elementos del DOM
const inpId = document.getElementById('id');
const inpNomProd = document.getElementById('nomProd');
const inpPrice = document.getElementById('price');
const inpPhoto = document.getElementById('photo');
const inpDesc = document.getElementById('desc');
const btnModificar = document.getElementById('btnModificar');
const btnCancelar = document.getElementById('btnCancelar');
const btnPrimero = document.getElementById('btnPrimero');
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');
const btnUltimo = document.getElementById('btnUltimo');


const baseURL = 'https://back-sandbox.herokuapp.com/api';

const token = localStorage.getItem("token");    //recupero el token: Si esta logueado el usuario --> va a estar guardado en el localStorage

    // alert (token);

let arrayProductos = [];   //arreglo de los productos que viene del Backend de Juli, lo defino acá para tenerlos
let liPosActualProd = 1;  //indica la posición actual del producto



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
    inpId.value = "";
    inpNomProd.value = "";
    inpPrice.value = "";
    inpPhoto.value = "";
    inpDesc.value = "";
    inpNomProd.focus();
}

const renderProductoPosActual = (arrayProductos) => {
    if (arrayProductos) {
        inpId.value = arrayProductos[liPosActualProd].id;
        inpNomProd.value = arrayProductos[liPosActualProd].name;
        inpPrice.value = arrayProductos[liPosActualProd].price;
        //foto
        // inpPhoto.value = arrayProductos[liPosActualProd].photo.files[0];
        inpDesc.value = arrayProductos[liPosActualProd].description;
    } else {
        
    }
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
        const response = await fetch(`${baseURL}/products?limit=9&offset=5`, {   //traigo los 5 primeros productos
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const json = await response.json();  //recupero lo que devuelve el Get del Fetch
        console.log (json)
        arrayProductos = json.data.data
        console.log (arrayProductos)

        //    alert("Termino el fetch");
        //    alert("Ya tengo los productos en el arreglo");

        //Va a Rendierizar los productos en el DOM
        renderProductoPosActual(arrayProductos);

        }
    } catch( error ) {
        alert(error);
    }
}


// renderProductoPosActual(liPosActualProd)

const onClickSiguiente = (event) => {
    event.preventDefault();    // para que no recarguela pagina   es para los botones submit   e????   es el evento   event      
    console.log ('paso por el onclickSiguiente');
    // alert ('paso por el onclickSiguiente');
    liPosActualProd ++
    if (liPosActualProd < arrayProductos.length) {
        renderProductoPosActual(arrayProductos)
    } else {
        liPosActualProd--
        alert ('¡¡Llego al último registro!!')
    }
}

const onClickAnterior = (e) => {
    e.preventDefault()    // para que no recarguela pagina   es para los botones submit   e????   es el evento   event      
    //      alert ('paso por el onClickAnterior');
    liPosActualProd --
    if (liPosActualProd < arrayProductos.length && liPosActualProd >= 0) {
        renderProductoPosActual(arrayProductos)
    } else {
        liPosActualProd++
        alert ('¡¡Llego al primer registro!!')
    }
}

const onClickPrimero = (e) => {
    e.preventDefault()    // para que no recarguela pagina   es para los botones submit   e????   es el evento   event      
    //   alert ('paso por el onClicPrimero');
    liPosActualProd = 0;
    if (liPosActualProd < arrayProductos.length) {
        renderProductoPosActual(arrayProductos)
    } else {
        alert ('¡¡No hay registros!!');
    }
}

const onClickUltimo = (e) => {
    e.preventDefault()    // para que no recarguela pagina   es para los botones submit   e????   es el evento   event      
    //   alert ('paso por el onClickUltimo');
    liPosActualProd = arrayProductos.length - 1;
    if (liPosActualProd < arrayProductos.length) {
        renderProductoPosActual(arrayProductos)
    } else {
        alert ('¡¡No hay registros!!');
    }
}

const GuardoProducto = async (e) => {
    try {
        //    alert("Entro al getProducts");
        //Sino tiene token
        if (!token || token === "undefined") {
            //voy a la ventana de Loguin
            alert ("¡¡No hay usuario Logueado!! \n\n Para utilizar esta Sección deberá Iniciar Seción.")
            //Vuelvo al Login para que se loguee
            window.location.replace("../../pages/Login/login.html"); // subo 2 niveles y estoy en el raiz
        } else {
            if (pasaValidacionesAlta()) {
                //  alert("Entro al insert del backend de juli");
                const payload =  {
                    name: inpNomProd.value,                 
                    price: inpPrice.value,
                    // photo: "acá iria la foto en base 64.",
                    // photo: await toBase64(),
                    description: inpDesc.value,
                    //la photo:  //aca tenemos la foto con todo el contenido, hay q trasformalo a base 64
                }
                console.log("payload: ", payload);
                //  alert (payload);

                //Voy a Dar de Alta al BackEnd 1 Usuario nuevo
                const response = await fetch(baseURL + '/products/' + inpId.value , {
                    method:'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                });
                const json = await response.json();
                console.log(json);
                const {message} = json
                
                //  alert ("Message retornado del BackEnd despues del alta: " + message + ".");
    
                if (message === "Successfully updated") {
                    alert ("¡¡ Modificación del Producto '" + inpNomProd.value + "' realizado con ÉXITO !!" );
                    // LimpiaForm();
                } else {
                    alert ("¡¡ Modificación del Producto NO REALIZADA para el Producto '" + inpNomProd.value + "' !!  \n\n Motivo: \n\n" + message);
                    inpNomProd.focus()
                    e.preventDefault()
                    return
                }
                //deberia preguntar si fue ok y mostrar mensaje 
    
            }}
        } catch( error ) {
            alert(error);
        }

}

const onClickModificar = (e) => {
    e.preventDefault()    // para que no recarguela pagina   es para los botones submit   e????   es el evento   event      
    if (btnModificar.innerHTML = "Modificar" ) { 
        //   alert ('Entro al Modificar ');
        inpNomProd.focus();
        btnModificar.innerHTML = "Guardar";
        // inpNomProd.readonly = false;
    } else {
        if (inpId.value) {
            //Boton Guarar
            GuardoProducto()
        }
        
    }   
}

const onClickCancelar = (e) => {
    e.preventDefault()    // para que no recarguela pagina   es para los botones submit   e????   es el evento   event      
    //   alert ('paso por el onClickUltimo');
    // inpNomProd.readonly = ""
}


btnSiguiente.addEventListener('click', onClickSiguiente );
btnAnterior.addEventListener('click', onClickAnterior);
btnPrimero.addEventListener('click', onClickPrimero);
btnUltimo.addEventListener('click', onClickUltimo);

btnModificar.addEventListener('click', onClickModificar);
btnCancelar.addEventListener('click', onClickCancelar);



//Empieza a Ejecutar ------------------------------------------------------------
//Obtengo todos los productos de Backend de Juli
getProductos();
console.log (arrayProductos);