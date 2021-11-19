//Referencio a los elementos del DOM que voy a necesitar
const email = document.getElementById("email");
// const email = document.querySelector('#email'); //Otra forma de referenciar los Elementos del html
const password = document.getElementById("password");
const submitLogin = document.getElementById("submitLogin");
const btnOlvidePass = document.getElementById('btnOlvidePass');

//Pongo foco el eamil
email.focus()

const onClickSubmitLogin = async (e) => {
    try{
        e.preventDefault()    // para que no recarguela pagina   es para los botones submit   e????   es el evento   event  

        const body = {
            email: email.value,
            password: password.value
        };

        // Prueba para ver que funcione el evento que cree, y que puedo recuperar los valores de email y passwor 
        // console.log('Pasó por el onSubmitLogin, el mail es: ' + email.value + ' y el Password es: ' + password.value);
        // alert('Pasó por onSubmitLogin: Tenemos Email: -> ' +  email.value + ", la Password es: " + password.value);
        
        // Ejecuto el Login con el Fetch mando el email y el passwor y si logea bien recupera el token, 
        const response = await fetch('https://back-sandbox.herokuapp.com/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        
        //Recupero el token
        //      const token = await response.json();  //el token es un objeto
        // REPASO COMO ACCEDER A LAS PROPIEDADES DE UN OBJETO  // objetoPiola["propiedad"])
        //devuelve --> el token es ===  {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ…I0M30.DplCA07ikkI8STZQMe6hekDpte681VV_gSt-n83cPfk'}
        //Ejemplos para mostrarlos
        // console.log ("el token es === ", token);
        // console.log(token["token"]);
        // alert ("El token es " +  token["token"]);  //-->  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ…I0M30. DplCA07ikkI8STZQMe6hekDpte681VV_gSt-n83cPfk'
        // localStorage.setItem('token', token["token"]);
        

        //Recupero el token como un string desestructurado
       
        const { token } = await response.json();
        // console.log ("el token es === ", token);

       
        localStorage.setItem('token', token);
    
        //ESTO LO PUEDO BORRAR: lo use para probar recuperar del localStorage
        // //Guardo datos del usuario:
        // // console.log ("Voy a guardar el email en el storage: " + email.value);
        // localStorage.setItem('emailUsuario', email.value);
        // // console.log("El emailUsuario recuperado el Storage es --> " + localStorage.getItem('emailUsuario'));
        // lsToken1 = localStorage.getItem('token');  // ahora es string token1
        // // console.log ("El token1 recuperado es: ==> " + lsToken1);

        //Si se logueo bien!!
        if (token) {
            //Guardo datos del usuario:
            localStorage.setItem('emailUsuario', email.value)
            window.location.replace("../../index.html");  // subo 2 niveles y estoy en el raiz
        }else {
            alert ("\n ¡El Email o la Contraseña son Incorrectos! \n \n Vuelva a Intentarlo.");
            //Blanqueo el email y la contraseña para que las cargue de nuevo
            email.value = "";
            password.value = "";
            email.focus();
        }
    
    } catch (error) {
        console.log ('Error en la función onSubmitLogin: ' + error)
        alert(error);
    }
};


const onClickBtnOlvidePass = () => {
    //Sino ingreso email
    if(!email.value){
        alert ("Debe ingresar un email válido al cual pueda ser enviado la contraseña!");
        email.focus();
    } else {
        //si tiene email
        alert("Revise su correo, la CONTRASEÑA fue enviada a la cuenta de correo '" + email.value + "'");
    }
}

submitLogin.addEventListener('click', onClickSubmitLogin);

btnOlvidePass.addEventListener('click', onClickBtnOlvidePass)