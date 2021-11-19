//Referencio a los elementos del DOM que voy a necesitar
const btnLogin = document.getElementById("btnLogin");
// const email = document.querySelector('#email'); //Otra forma de referenciar los Elementos del html
const lblUsuario = document.getElementById("lblUsuario");

alert ("¡¡ Bienvenido a 'Kiwi Tiendas' !! \n Usted podrá: \n1- Iniciar sesión.\n2- Registrarse. \n3- Comprar (Sección 'Productos' - requerie inicio de sesiòn). \n4- Agregar productos nuevos a la tienda (desde 'Sección Productos'). \n5- La tienda conservará el carrito con su posible compra para cada usuario mientras no cierren el navegador, pudiendo navegar por el sitio e incluso cambiar de usuario sin perder el mismo. \n** Este aviso esta puesto para que pueda ser evaluada toda la funcionalidad");

//recupero el token: Si esta logueado el usuario --> va a estar guardado en el localStorage
lsToken = localStorage.getItem('token');  // ahora es string token1
// alert ("Hay token " + lsToken)

//Si tengo Token (es que esta logueado el usuario)
if ((lsToken) && !(lsToken == 'undefined')) {
     // alert ("Paso por el Tiene Usuario Logueado: " + lsToken)
    
     // --> Pongo el mail del usuario y el boton de 'Logout'
    lsEmail = localStorage.getItem('emailUsuario');
    lblUsuario.innerHTML = "(" + lsEmail  + ")"
    btnLogin.innerHTML = "Logout";

} else {
    //Sino está logueado saco el usuario y pongo botón 'Login'
    lblUsuario.innerHTML = "";
    btnLogin.innerHTML = "Login";
}

//Evento Click en 'Logout'
const onClickLoginLogout = () => {
    //   alert("Entro al onClickLogin/Logout");
    //   alert ("el inner del btnlogin es " + btnLogin.innerHTML );
    //Si el estado del boton es 'Login'
    if (btnLogin.innerHTML === "Login") {
        //   alert ("Entro al Login ehhhh");
        window.location.replace("../pages/Login/login.html")
    } else {
        //Esta del botón --> 'Logout'
        //   alert ("Entro al logout");
        //Deslogueo al usuario 
        localStorage.setItem('token', undefined);
        localStorage.setItem('emailUsuario', "");
        lblUsuario.innerHTML = ""
        btnLogin.innerHTML = "Login";
    }
}

//Evento Click en el 'lblUsuario'
const onClickLblUsuario = () => {
    //  alert ("entro en el onClick del Lbl de Usuario.");
    window.location.replace("../pages/User/User.html");

}


btnLogin.addEventListener('click', onClickLoginLogout );
lblUsuario.addEventListener('click', onClickLblUsuario);

// alert('paso por INDEX.js');

