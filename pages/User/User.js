//Recupero los Datos del usuario que esta logueado (Le paso el token actual)
//   El BackEnd, con el token, va y busca el usuario que se logueo con ese token y devuelve sus datos personales
//   En el Postman de BackEnd de Juli:   
//     Link Postman web (obtenido a través del boton de share): 
//     https://go.postman.co/workspace/ApiTest~bd1d14dc-98c0-41ae-9a57-711d9ddcf18b/collection/17226216-3f17d7f1-e1bb-4b97-acea-0c1905c737e2
//     Link pasado por Juli:  https://www.getpostman.com/collections/77d0c1a7abe6a8e0f71e
//          La base Url deberia ser: https://back-sandbox.herokuapp.com/api

//  alert ("Entro al User.js.");

//Definiciones y vinculaciones a campos y elementos del HTML User.html
const txtName = document.getElementById("name");
const txtLastName = document.getElementById("lastName");
const txtEmail = document.querySelector('#email');
const txtEdad = document.getElementById('edad');
const txtIdUsuario = document.getElementById('idUsuario');

console.log(txtName.value);

const lsToke = localStorage.getItem("token");

const getUserInfo = async () => {

    try{
        const response = await fetch('https://back-sandbox.herokuapp.com/api/user', {
            method: 'GET',
            headers: {
                // Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDE0YTc2ZDk5YmM3MDM5NDU1OGU1OCIsImlhdCI6MTYzMDU1MDI4OH0.APYZUEhrg1OQeXcsOzWdEeqMpwkvIJ5yBqPe0IzI378"
                Authorization: "Bearer " + lsToke
            }
        });

        const json = await response.json();
        console.log(json);
        console.log("Edad: " + json.data.age + ", Email: " + json.data.email + ", Apellido: " + json.data.lastName + ", Name: " + json.data.name + ".");

        txtName.value = json.data.name;
        txtLastName.value = json.data.lastName;
        txtEmail.value = json.data.email;
        txtEdad.value = json.data.age;
        txtIdUsuario.value = json.data.id;

    } catch( error ) {
        alert('error')
    }
}

getUserInfo();

