//Recupero los Datos del Productos (Le paso el token del usuario logueado)
//   El BackEnd, con el token, va y busca el bloque de productos que le paso por parametros
//   En el Postman de BackEnd de Juli:   
//     Link Postman web (obtenido a través del boton de share): 
//     https://go.postman.co/workspace/ApiTest~bd1d14dc-98c0-41ae-9a57-711d9ddcf18b/collection/17226216-3f17d7f1-e1bb-4b97-acea-0c1905c737e2
//     Link pasado por Juli:  https://www.getpostman.com/collections/77d0c1a7abe6a8e0f71e
//          La base Url deberia ser: https://back-sandbox.herokuapp.com/api
//------------------------------------------------------------------------------------------------------------------------------------------
// alert ("Entro al Productos.js"); //para validar que entre ejecutar el Productos.js

//Definicios previas
const baseURL = "https://back-sandbox.herokuapp.com/api";
//Referencia al DOM
const productsContainer = document.getElementById('products-container');
const totalAmount = document.getElementById('totalAmount');
const cartList = document.getElementById('cart-list');
const btnFinalizarCompra = document.getElementById('btnFinalizarCompra');
const cantUnidadesCarrito = document.getElementById('cantUnidadesCarrito');

const token = localStorage.getItem("token");    //recupero el token: Si esta logueado el usuario --> va a estar guardado en el localStorage
const lsEmailUsLogueado = localStorage.getItem("emailUsuario");
// const email = document.querySelector('#email'); //Otra forma de referenciar los Elementos del html
const lblUsuario = document.getElementById("lblUsuario");



//    alert ("token: " + token);

//Creo el Arreglo para guardar los productos que va mandando al carrito
let myCart = [];


// hago un Get de Productos del BackEnd
const getProductos = async () => {
try {
    //Sino tiene token
    if (!token || token === "undefined") {
        //voy a la ventana de Loguin
        alert ("¡¡No hay usuario Logueado!! \n\n Para utilizar esta Sección deberá Iniciar Seción.")
        //Vuelvo al Login para que se loguee
        window.location.replace("../../pages/Login/login.html"); // subo 2 niveles y estoy en el raiz
    } else {
        //si tiene token: 
        // completo el Email del Usuario en en NavBAR

        lblUsuario.innerHTML = "("  + lsEmailUsLogueado + ")"

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
        const arrayProductos = json.data.data
        console.log (arrayProductos)

        //  alert("Termino el fetch");

        //Va a Rendierizar los productos en el DOM
        renderProductos(arrayProductos);
        }
    } catch( error ) {
        alert(error);
    }
}


// Renderizo los productos (arrayProductos) que traigo del BackEnd en el DOM ------------------------------------
// tengo que poder pintar esto en el DOM
{/* 
1 <li>
2    <div>
3        <img src="./assets/img/squirtle.png" alt="Squirtle">
    </div>
4   <span> Nombre del Producto </span>
5    <span> Descripcion del prducto </span>
6    <span>758$</span>
7    <button>Comprar</button>
1 </li> 
*/}

const renderProductos = (arrProductos) => {

    //   alert("Entro a Renderizar los Productos en el DOM")

    arrProductos.forEach(prod => {

        console.log("Datos de Prodcuto --> id: " + prod.id + ", nombre Prodcuto" + prod.name + ". Precio: $ " + prod.price + ". Descripción: " + prod.description  );
        
        const li = document.createElement('li');     //creo el elemento 1er, el <li>
        const div = document.createElement('div');  //creo el elemento 2do, el <div>

        // const arr = product.url.split('/');
        // console.log(arr);
        // const id = arr[arr.length-2];
        const id = prod.id;
        const img = document.createElement('img');  // creo el elemento 3ro que es el  <img>
            // img.src = `${imgURL}${id}.png`;
                    // <img width="200px" height="200px" src={p.photo} />
            // img.width = "100px";
            img.src = prod.photo;
            img.alt = prod.name;
            img.width = "100";

        div.appendChild(img);   // anido el 3ro <img> adentro del 2 <div>

        const spanTitle = document.createElement('span');  //creo el elemento 4to <span>  que es el nombre del producto
        spanTitle.innerText = prod.name;
        
        //agrego la descripción si la tiene
        const spanDesc = document.createElement('span');  //creo el elemento 5to <span>  descripición del producto
        if (!prod.description) {
            spanDesc.innerText =  "-";
        } else {
            spanDesc.innerText =  prod.description;   //lo meto en el innertext
        };
        
        const spanPrice = document.createElement('span');   // creo el elemento 6to  <span>  que es el precio
        // const price = Math.floor(Math.random() * 1500) + 450 //esto cuando lo armaba random
        const price = prod.price  //lo tomo del arreglo del BackEnd
        spanPrice.innerText = `$ ${price}`

        const button = document.createElement('button');  // creo el elemento 7mo
        button.innerText = 'Comprar';

        //Agrego todos los elementos al LI
        li.appendChild(div);
        li.appendChild(spanTitle);
        li.appendChild(spanDesc);
        li.appendChild(spanPrice);
        li.appendChild(button);
        button.addEventListener('click', () => {
            //   alert("entro al click");
            //Busco en el Carrito si ya está el Producto que estoy comprando con el 'Click'
            const product = myCart.find(product => product.id === id); //y recupero el objeto del carrito de ese producto
            //si ese producto.id ya esta en el carrito?
            if(product) {
                const index = myCart.indexOf(product);  //obtento el indice 
                product.quantity++;  //le sumo 1 a la cantidad del objeto Producto del carrito que acabo de buscar
                myCart[index] = product;  //le meto el elemento en nuevamente en ese indice con la cantidad nueva
            } else {
                const productToCart = {
                    img: img.src,
                    name: prod.name,
                    price,
                    id,
                    quantity: 1
                };
                // agrego el producto nuevo en el carrito
                myCart.push(productToCart);
            }

            renderCartProducts();
            showTotalAmount();

            console.log (myCart);

            // //Guardo el estado del Carrito (myCart) en el localStorage
            // window.localStorage.setItem('myCart', JSON.stringify(myCart));
            //Guardo el estado del Carrito de usuario logueado (myCart) en el localStorage
            window.localStorage.setItem('myCart' + lsEmailUsLogueado, JSON.stringify(myCart));
            //     // ** para recuperarlo despues
            //     // var data = JSON.parse(localStorage.getItem("myCart"));

        });

        // finalmente agrego al  <ul id='products-container'> del Html --> todolo generado que cuelg del <li> generado
        productsContainer.appendChild(li);

    });

}


const showTotalAmount = () => {
    //      alert ("paso por el showTotalAmount")
    let cantTotArticulos = 0;
    let total = 0;
    myCart.forEach(cart => {
        console.log(cart);
        total += (cart.price * cart.quantity);
        cantTotArticulos +=  cart.quantity;
    });

    totalAmount.innerText = `$ ${total}`;
    cantUnidadesCarrito.innerText = "(" + cantTotArticulos + " u -   $" + total +")";
    cantUnidadesCarrito.style.fontWeight= "bold";
    // cantUnidadesCarrito.innerText = "(1)";
}


// Renderizo el Carrito de Productos que va comprando -------------------------------
//El Cart-item deberia quedar asi ---------------------------------------------------
/*
1-  <div class="cart-item">
2-      <div class="cart-item-content">
3-          <div class="item-img">
4-              <img src="./assets/img/squirtle.png" alt="Squirtle">
            </div>
5-          <span>- Coso de vamo a calmarno</span>
        </div>
6-    <span>$758</span>
    </div>
*/
const renderCartProducts = () => {
    cartList.innerHTML = null; // blanqueo el carrito
    myCart.forEach(product => {

        //Estoy creando el 1-div donde va a ir todo el contenido de cada producto
        const container = document.createElement('div');
        container.className = 'cart-item';

        //Estoy creando el 2-div donde va la img y el nombre
        const cartItemContent = document.createElement('div');
        cartItemContent.className = 'cart-item-content';

        //Estoy creando el 3-div que contiene la img
        const itemImg = document.createElement('div');
        itemImg.className = 'item-img';
        itemImg.style.marginRight = '30px';

        //Estoy creando el 4-img que tiene el src del objeto que tiene myCart que estamos iterando ahora
        const img = document.createElement('img');
        img.src = product.img;
        img.alt = product.name;
        // img.style.width = '75px';  //ya no haria falta lo meto en la class de abajo y lo meto @media  ( MEDIA QUERIES)
        img.className = 'Img-Prod-Carri';

        //Estoy metiendo el 4 en el 3
        itemImg.appendChild(img);

        //Estoy metiendo el 3 en el 2
        cartItemContent.appendChild(itemImg);

        //Estoy creando el 5 que lleva el nombre del producto
        const itemName = document.createElement('span');
        itemName.innerText = `- ${product.name}  - ($ ${product.price})`;

        //Creo la cantidad
        const itemQuantity = document.createElement('b');
        itemQuantity.innerText = `X ${product.quantity}`;
        // itemQuantity.style.marginLeft = '60px';

        //Meto el name y el quantity en otro div para que queden con el mismo espacio
        const nameAndQuantity = document.createElement('div');
        nameAndQuantity.appendChild(itemQuantity);
        nameAndQuantity.appendChild(itemName);
        
        cartItemContent.appendChild(nameAndQuantity);
        //Estoy creando el 6 donde lleva el precio del producto
        const itemPrice = document.createElement('span');
        itemPrice.innerText = `$ ${product.price * product.quantity}`;

        //Estoy metiendo el 2 en el 1 (es el contenedor que tiene el contenedor de la img y el nombre)
        container.appendChild(cartItemContent);

        //Estoy metiendo el 6 en el 1
        container.appendChild(itemPrice);
        
        //Estoy metiendo el 1 en el cart
        cartList.appendChild(container);
    });
};

//Función que finliza la compra
btnFinalizarCompra.addEventListener('click', () => {

    cartList.innerHTML = null;
    myCart = [];
    showTotalAmount();
    alert("¡¡ Gracias '" + lsEmailUsLogueado + "' por comprar en KIWI !!");
     //blanqueo el localStorage del carrito
    //  localStorage.setItem("myCart" + lsEmailUsLogueado, myCart);
     localStorage.removeItem("myCart" + lsEmailUsLogueado, myCart);
});



// ARRANCA LA EJECUCIÓN ------------------------------------------------------
// 1 Llamo al GetProductos
getProductos();


// 2 Evaluo si tengo carrito para el usuario activo ----------------------- 
// alert ("longitu de myCart: " + myCart.length); 
//Recupero el Carrito del usuario por si hubiese tenido alguno
myCart1 = JSON.parse(localStorage.getItem("myCart" + lsEmailUsLogueado));
//Si hay un carrito con cosas pre-existente para el usuario
console.log ("myCart1 ------------------------> abajo");
console.log (myCart1);
if (myCart1 != null) {
    //se lo asigno al carrito actua (myCart)
    myCart = myCart1;
    console.log ("myCart ------------------------> abajo");
    console.log(myCart);
}

//Si estoy arrancando con un carrito Pre-existente
if (myCart) {
    //  alert ("va a ir a renderizar el carrito con " + myCart.lenght);
    renderCartProducts();
    showTotalAmount();

} else {
    // alert ("el carrito arranca vacio ");
};

//Fin de todo lo que se ejecuta -------------------------------------------------------------------------



//A borrar un ejemplo de como pinte el dom con React + Redux + Router 
// return (
//     <div>
//         <button onClick={onLogout}>Logout</button>
//         <h1>Somos Products!!!!</h1>
//         {products.map( p => {
//             return <h6>{p.name}</h6>
//         })}
//     </div>
// )