//Definicioes y vinculos a elementos del DOM
const inpNomProd = document.getElementById('nomProd');
const inpPrice = document.getElementById('price');
const inpPhoto = document.getElementById('photo');   //esto es un arreglo  .files[0] para indicar el primero
const inpDesc = document.getElementById('desc');
const btnAlta = document.getElementById('btnAlta');
const btnCancelar = document.getElementById('btnCancelar');

const baseURL = 'https://back-sandbox.herokuapp.com/api';

const token = localStorage.getItem("token");    //recupero el token: Si esta logueado el usuario --> va a estar guardado en el localStorage

//hasta aca ya tenemos agarrados los input

//Arranco poniendo el foco en email
inpNomProd.focus()

// convertir una img en base64 ( string larguisimo), para enviarlo al back, y eso que se guarde en la db
// Y asi, cuando nosotros pidamos la info de nuestro usuario, nos envie el base64 de la img y podamos
// ponerlo en un <img src= para mostrarlo.
//FALTA recibir el file como parametro el inpPhoto
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
    if (!inpPhoto.value) {
        alert ("¡Debe ingresar la Foto del Producto! ");
        inpPhoto.focus()
        return false
    } 
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


const createProduct = async (e) => {
    e.preventDefault()
    
    if (pasaValidacionesAlta()) {
        //  alert("Entro al insert del backend de juli");
        const payload =  {
            name: inpNomProd.value,                 
            price: inpPrice.value,
            // photo: "acá hay que poner la foto ya en base 64.",
            photo: await toBase64(),   //FALTA PASARLE COMO PARAMETRO el inpPhoto al toBase64
            description: inpDesc.value,
            //la photo:  //aca tenemos la foto con todo el contenido, hay q trasformalo a base 64
            }
        console.log("payload: ", payload);
        //  alert (payload);
        try {
            //Voy a Dar de Alta al BackEnd 1 Usuario nuevo
            const response = await fetch(baseURL + '/products', {
                method:'POST',
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

            if (message === "Successfully created") {
                alert ("¡¡ Alta del Producto '" + inpNomProd.value + "' creado con ÉXITO !!  \n\n Proceda a cargar otro producto si lo requiere." );
                LimpiaForm();
            } else {
                alert ("¡¡ Alta del Producto NO REALIZADA para el Producto '" + inpNomProd.value + "' !!  \n\n Motivo: \n\n" + message);
                inpNomProd.focus()
                e.preventDefault()
                return
            }
            //deberia preguntar si fue ok y mostrar mensaje 

        } catch (error) {
            alert('Catch Error: ', error);
        }
    } else {
        // alert ("No paso validación");
    }
};

//vamos a escuchar el click del boton
btnAlta.addEventListener('click', createProduct);

//Productos creados para probar
// Prod: 99
