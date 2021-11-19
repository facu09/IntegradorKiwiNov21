//Definicioes y vinculos a elementos del DOM
const inpEmail = document.getElementById('email');
const inpName = document.getElementById('name');
const inpLastName = document.getElementById('lastName');
const inpAge = document.getElementById('age');
// const photoInput = document.getElementById('photo');
const inpPassword1 = document.getElementById('password1');
const inpPassword2 = document.getElementById('password2');
const btnAlta = document.getElementById('btnAlta');

const baseURL = 'https://back-sandbox.herokuapp.com/api';

//hasta aca ya tenemos agarrados los input

//Arranco poniendo el foco en email
inpEmail.focus()

// convertir una img en base64 ( string larguisimo), para enviarlo al back, y eso que se guarde en la db
// Y asi, cuando nosotros pidamos la info de nuestro usuario, nos envie el base64 de la img y podamos
// ponerlo en un <img src= para mostrarlo.
const toBase64 = () => {
    return new Promise((resolve, reject) => {
        const file = photoInput.files[0];
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
    if (!inpEmail.value) {
        alert ("¡Debe ingresar una cuenta de email válido! ");
        inpEmail.focus()
        return false
    } 
    if (!inpName.value) {
        alert ("¡Debe ingresar el Nombre del Usuario! ");
        inpName.focus()
        return false
    } 
    if (!inpLastName.value) {
        alert ("¡Debe ingresar el Apellido del Usuario! ");
        inpLastName.focus()
        return false
    } 
    if (!inpAge.value) {
        alert ("¡Debe ingresar la Edad del Usuario! ");
        inpAge.focus()
        return false
    } 
    if (!inpPassword1.value) {
        alert ("¡Debe ingresar ambas Contraseñas! ");
        inpPassword1.focus();
        return false
    } 
    if (!inpPassword2.value) {
        alert ("¡Debe ingresar ambas Contraseñas! ");
        inpPassword2.focus();
        return false
    } 
    if (inpPassword1.value !== inpPassword2.value) {
        alert ("¡Las contraseñas no son iguales! \n Ambas Contraseñas deben ser iguales.")
        inpPassword1.focus()
        return false
    }

    //Si llego acá es que paso validaciones OK.
    return true
}

const registerUser = async (e) => {
    e.preventDefault()
    
    if (pasaValidacionesAlta()) {
        //  alert("Entro al insert del backend de juli");
        const payload =  {
            email: inpEmail.value,                 
            password: inpPassword1.value,
            name: inpName.value,
            lastName: inpLastName.value,
            age: inpAge.value,
            // photo: photoInput.value    //aca tenemos la foto con todo el contenido, hay q trasformalo a base 64
            }
        console.log("payload: ", payload);
        //  alert (payload);
        try {
            //Voy a Dar de Alta al BackEnd 1 Usuario nuevo
            const response = await fetch(baseURL + '/auth/register', {
                method:'POST',
                headers: {'Content-Type': 'application/json',
            },
                body: JSON.stringify(payload)
            });
            const json = await response.json();
            console.log(json);
            const {message} = json
           
            //  alert ("Message retornado del BackEnd despues del alta: " + message + ".");

            if (message === "Created") {
                alert ("¡¡ Alta del usuario '" + inpEmail.value + "' creado con ÉXITO !!  \n\n Proceda a loguearse para inciar sesión." );
                window.location.replace("../Login/login.html");  // subo 2 niveles y estoy en el raiz
            } else {
                alert ("¡¡ Alta del usuario NO REALIZADA para el email '" + inpEmail.value + "' !!  \n\n Motivo: \n\n" + message);
                inpEmail.focus()
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
btnAlta.addEventListener('click', registerUser);


//usuarios creados para probar
// Usuario 1
// "email": "fj@gmail.com",
// "password": "pass12345",
// "name": "fj",
// "lastName": "Fj",
// "age": 32,
// "photo": ""

// Usuario 2
// "email": "facu@gmail.com",
// "password": "pass12345",
// "name": "Facu",
// "lastName": "Cigliu",
// "age": 28,
// "photo": ""

// Usuario 3
// "email": "facu1@gmail.com",
// "password": "pass12345",
// "name": "Facu",
// "lastName": "Cigliu",
// "age": 28,
// "photo": ""

// Usuario 3
// "email": "facu2@gmail.com",
// "password": "pass12345",
// "name": "Facu",
// "lastName": "Cigliu",
// "age": 28,
// "photo": ""