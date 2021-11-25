// alert ("Entrando al js de ModifProductos.js");

//Definicioes y vinculos a elementos del DOM
const inpId = document.getElementById('id');
const inpNomProd = document.getElementById('nomProd');
const inpPrice = document.getElementById('price');
const imgPhoto = document.getElementById('photoImg');
const inpPhoto = document.getElementById('photo');
const inpDesc = document.getElementById('desc');
const btnModificar = document.getElementById('btnModificar');
const btnCancelar = document.getElementById('btnCancelar');
const btnPrimero = document.getElementById('btnPrimero');
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');
const btnUltimo = document.getElementById('btnUltimo');

//Defino una constante que tiene adentro una image de "No imagen availabe"
const imgBase64NoImg = "data:image/png;base64,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"

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
const toBase64 = (inpFF) => {
    return new Promise((resolve, reject) => {
            // alert ("voy a mostrar el file");
            // alert (inpPhoto.files[0]);
            // console.log (inpPhoto.files[0]);
                    //  ahora lo recibo por parametro al input                
                    //  const file =  inpPhoto.files[0];
        // alert (inpFF.files[0])
        console.log (inpFF)
        const file = inpFF.files[0]
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
    imgPhoto.setAttribute("src", "");
    inpPhoto.value = "";  //el archivo
    inpDesc.value = "";
    inpNomProd.focus();
}

const renderProductoPosActual = (arrayProductos) => {
    if (arrayProductos) {
        inpId.value = arrayProductos[liPosActualProd].id;
        inpNomProd.value = arrayProductos[liPosActualProd].name;
        inpPrice.value = arrayProductos[liPosActualProd].price;
        //aca va la foto que viene en base 64 del backend
            // imgPhoto.value = arrayProductos[liPosActualProd].photo.files[0];  //NO VA ASI XQUE NO ES UN ARCHIVO
            // en el arreglo ya lo tengo = que del backend en base 64
        //Evaluo si tiene cargada una imagen valida (deberia venir en base 64 ya)
        //Sino tiene cargada una imagen 64 valida
            //|| !arrayProductos[liPosActualProd].photo.includes('data:image')
        if (  arrayProductos[liPosActualProd].photo === undefined ||
              !arrayProductos[liPosActualProd].photo.includes('data:image') ) {    
            //guardo una imagen de "No imagen availabel" que tengo hardcodeada
                //  alert("No tiene imagen previa y tampoco cargo un archivo, entro al if NoIncluye 'data:image' undefined");
            imgPhoto.setAttribute("src", imgBase64NoImg); 
        } else {
            //Si tiene una imagen base 64 valida --> la muestro en la <img src="">
            imgPhoto.setAttribute("src", arrayProductos[liPosActualProd].photo); 
        }
        inpDesc.value = arrayProductos[liPosActualProd].description;
        
        //    Aprendo a recuperar el base 64 de la etiqueta <img src="">
        //    alert ("imgPhoto con getAttribute: " + imgPhoto.getAttribute("src"));
        //    console.log (imgPhoto.getAttribute("src"));

    } else {
        //sino hay arreglo --> no hago nada
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
    let fotoBase64 = "" ;  //defino la foto base 64
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
                
                //Si cambio el archivo, xque quiere cambiar la imagen 
                if (inpPhoto.value) {
                    //convierto el file a base 64
                        //      alert ("Entro al if de si tiene archivo de foto");
                        //      fotoBase64 = await toBase64();
                        //      ahora la uso mandandole parametro
                    fotoBase64 = await toBase64(inpPhoto);
                        //      alert (fotoBase64)
                } else {
                    // Sino tiene archivo voy a guardar el que ya tiene de antes, es decir no hago modificaciones
                         alert("Entro al else de que no tiene archivo, " + arrayProductos[liPosActualProd].photo);
                    // sigo guardando el que ya esta en el arreglo que es base 64
                    //Si no contiene una imagen base 64 la imagen del backend
                    if (  !arrayProductos[liPosActualProd].photo.includes('data:image') ) {    
                        //guardo una imagen de "No imagen"
                            //  alert("No tiene imagen previa y tampoco cargo un archivo, entro al if NoIncluye 'data:image' undefined");
                        fotoBase64 =  imgBase64NoImg  // guardo la imagen ya en base 64 de No Imagen que tengo como constante
                        
                    } else { 
                        //Si ya tenía imagen la conservo
                        //      alert ("entro al else del undefined: idPos: " + liPosActualProd + " " + arrayProductos[liPosActualProd].name + ",  " + arrayProductos[liPosActualProd].photo )
                        console.log (arrayProductos[liPosActualProd].photo);
                        fotoBase64 =  arrayProductos[liPosActualProd].photo ;
                    }
                }
                
                //Genero el UPDATE del Proudcto
                //Armo el payload a guardar
                 const payload =  {
                    name: inpNomProd.value,                 
                    price: inpPrice.value,
                    photo: fotoBase64,
                    description: inpDesc.value,
                }
                console.log("payload: ", payload);
                //  alert (payload);

                //Voy a hacer el UPDATE al BackEnd 1 Producto 
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
                    alert ("¡¡ Modificación del Producto '" + inpNomProd.value + "' realizado con ÉXITO !!");
                    // Actulizo el Arreglo con el registro reción modificado para que cuando navega muestre el registro bien, ya modificado
                    arrayProductos[liPosActualProd].name = inpNomProd.value;
                    arrayProductos[liPosActualProd].price = inpPrice.value;
                    arrayProductos[liPosActualProd].photo = fotoBase64;  //va la foto en base 64
                    arrayProductos[liPosActualProd].description = inpDesc.value;
                    
                    //por las dudas blanqueo el file para que no quede cagado ahi
                    inpPhoto.value = "";

                    //Vuelvo a renderizar el producto por si cambio la imagen
                    renderProductoPosActual(arrayProductos);
                    
                    //Actualizo los botones de abajo -------------------------
                    //Si guardo bien el update --> cambio el botón a Modificar y lockeo el registro
                    btnModificar.innerHTML = "Modificar";
                    btnModificar.value = "Modificar"
                    //Vuelvo a poner los inputs en disabled para protejer escritura
                    // inpDesc.price. ("readonly","false");
                    inpNomProd.disabled = true;   inpPrice.disabled = true;   inpPhoto.disabled = true
                    inpPhoto.disabled = true;     inpDesc.disabled = true;
                    //FALTA PROBAR  otra forma sería a probar
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
            alert("Error de la funcion 'GuardarProducto' " + error);
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
        inpNomProd.disabled = true;   inpPrice.disabled = true;   inpPhoto.disabled = true
        inpPhoto.disabled = true;     inpDesc.disabled = true;
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