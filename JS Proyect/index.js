import { App } from "./App.js";
import createCards from "./createCards.js";


document.addEventListener("DOMContentLoaded",App);

document.addEventListener("click",e =>{
    if(e.target.matches(".modal button")){
        document.querySelector(".modal").classList.add("hideModal");

        localStorage.setItem("type",e.target.getAttribute("value"));
        
        document.querySelector("#searchLabel").innerHTML = localStorage.getItem("type").charAt(0).toUpperCase() +  localStorage.getItem("type").slice(1);


        createCards(localStorage.getItem("modal"));
    }
});

document.addEventListener("keyup",e =>{
    
    const $input = document.getElementById("searchInput");
    const $tarjetas = document.querySelectorAll(".card");

    let value = $input.value;
    let validacion = new RegExp(`${value}`,"gi")

    for (let element of $tarjetas) {
        let name = element.value;
        
       if(name === "error404") {
           element.style.display = "none";
           continue;
       }

        if(!name.match(validacion)){
            element.classList.add("hideTarjeta");
        }else{
            element.classList.remove("hideTarjeta");
        }
        
    }
    
});