// alert ("Entrando al js de ModifProductos.js");

//Definicioes y vinculos a elementos del DOM
const inpId = document.getElementById('id');
const inpNomProd = document.getElementById('nomProd');
var inpPrice = document.getElementById('price');
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
let liPosActualProd = 0;  //indica la posición actual del producto


//hasta aca ya tenemos agarrados los input

//Arranco poniendo el foco en email
inpNomProd.focus()

// convertir una img en base64 ( string larguisimo), para enviarlo al back, y eso que se guarde en la db
// Y asi, cuando nosotros pidamos la info de nuestro usuario, nos envie el base64 de la img y podamos
// ponerlo en un <img src= para mostrarlo.
// FALTA VER PERO ACÁ SOLO SE USARIA SI ACTUALIZA LA FOTO Y CARGA UNA NUEVA
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
        //aca va la foto que viene en base 64 del backend
        // inpPhoto.value = arrayProductos[liPosActualProd].photo.files[0];  //NO VA ASI XQUE NO ES UN ARCHIVO
        inpPhoto.setAttribute("src", arrayProductos[liPosActualProd].photo); 
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

const GuardoProducto = async (e) => {
    try {
           //      alert("Entro al GuardoProducto");
        //Sino tiene token
        if (!token || token === "undefined") {
            //voy a la ventana de Loguin
            alert ("¡¡No hay usuario Logueado!! \n\n Para utilizar esta Sección deberá Iniciar Seción.")
            //Vuelvo al Login para que se loguee
            window.location.replace("../../pages/Login/login.html"); // subo 2 niveles y estoy en el raiz
        } else {
            //Si tiene token --> Guardo
            if (pasaValidacionesAlta()) {
                 //      alert("Entro al update del backend de juli");
                const payload =  {
                    name: inpNomProd.value,                 
                    price: inpPrice.value,
                    // photo: "acá iria la foto que ya está en base 64.",
                    photo: inpPhoto.value,
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
                //      alert ("recupero el json --> abajo");
                console.log(json);
                const {message} = json
                //      alert ("Va a mostrar mesaje devolvio back",  message);
                //      alert ("Message retornado del BackEnd despues del alta: " + message + ".");
    
                if (message === "Successfully updated") {
                    alert ("¡¡ Modificación del Producto '" + inpNomProd.value + "' realizado con ÉXITO !!" );
                    // Actulizo el Arreglo con el registro reción modificado;
                    arrayProductos[liPosActualProd].name = inpNomProd.value;
                    arrayProductos[liPosActualProd].price = inpPrice.value;
                    arrayProductos[liPosActualPord].phot = inpPhoto.value;
                    arrayProductos[liPosActualProd].description = inpDesc.value;
                     //Si guardo bien el update --> cambio el botón a Modificar y lockeo el registro
                    btnModificar.innerHTML = "Modificar";
                    btnModificar.value = "Modificar"
                     // inpDesc.price. ("readonly","false");
                    inpNomProd.disabled = true;   inpPrice.disabled = true;   inpPhoto.disabled = true
                    inpPhoto.disabled = true;     inpDesc.disabled = true;
                    // otra forma sería a probar
                    //document.getElementById('nomProd').readOnly = true;o false 
                    //document.getElementById('nomProd').readOnly = false; pisas el atributo del html y se reemplaza por el del js
                    //la otra que es mejor creo, es llamar al input como lo hiciste, y poner en el js 
                    //nomProd.removeAttribute("readonly");
                    //inpNomProd.attributes() //hay que probar si esto lo agregan
                    
                    
                    return true
                } else {
                    alert ("¡¡ Modificación del Producto NO REALIZADA para el Producto '" + inpNomProd.value + "' !!  \n\n Motivo: \n\n" + message);
                    inpNomProd.focus()
                    e.preventDefault()
                    
                    return false
                }
            }}
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

const onClickModificar = (e) => {
    e.preventDefault()    // para que no recarguela pagina   es para los botones submit   e????   es el evento   event      
    //      alert("entro al onClickModificar");
    // Si el Boton esta para Modificar
    if (btnModificar.value === "Modificar" ) { 
        //      alert ('Entro a ponerle al boton Guardar y dejar editar los campos');
        //voy por acá me gustariapoder bloquear y desbloquear los inputs con el javascript
        // inpDesc.price. ("readonly","false");
        inpNomProd.disabled = false;   inpPrice.disabled = false;   inpPhoto.disabled = false
        inpPhoto.disabled = false;     inpDesc.disabled = false;

    
        inpNomProd.focus();
        btnModificar.innerHTML = "Guardar";
        btnModificar.value = "Guardar"
        // inpNomProd.readonly = false;
    } else {
        // Si el Boton esta para Guardar
        //      alert ("salio del else: si tiene id va a ir a guardar");
        if (inpId.value) {
            //Voy a Guardar el registro al backend
            //      alert ("va a ir al guardar");
            if (GuardoProducto()) {
                //Si guardo bien el update --> cambio el botón a Modificar y lockeo el registro
                // lo hago mensaje y actualice estado en el GuardarProducto
            } else {
                //no hago nada
            };
        }
    }   
}

const onClickCancelar = (e) => {
    e.preventDefault()    // para que no recarguela pagina   es para los botones submit   e????   es el evento   event      
    //   alert ('paso por el onClickUltimo');
    // inpNomProd.readonly = ""
    //      alert ("value del boton cancelar: " + btnModificar.value );
    if (btnModificar.value === "Modificar") {
        // salgo y vuelvo al formulario anterior
        window.location.replace("../Productos/Productos.html");  // subo 2 niveles y estoy en el raiz
    } else {
        // el boton esta en (btnModificar.value = "Guardar")
        //Cancelo la edición sin guardar, deberia desacer el cambio
        alert ("Se ha cancela la edición de Producto, vuelve al valor anterior");
        renderProductoPosActual(arrayProductos);
        btnModificar.innerHTML = "Modificar";
        btnModificar.value = "Modificar";
    }
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