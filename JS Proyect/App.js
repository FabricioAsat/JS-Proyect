import { ajax } from "./ajax.js";
import api from "./api.js";
import { createCard } from "./createCard.js";



export function App(){
    const d = document;
    const $search = d.getElementById("searchInput"); 
    const $text = d.getElementById("searchLabel"); 
    const $buttonSearch = d.querySelector(".buttonImput"); 
    const $tarjetas = document.querySelector(".tarjetas");
    const $body = d.querySelector("body");
    const $divModal = d.createElement("div");


    $divModal.classList.toggle("hideModal");
    

    d.addEventListener("click", e => {
        if(e.target.matches("#nameButton")){
            $tarjetas.innerHTML = ``;
            $text.innerHTML = "Name:";
            $search.removeAttribute("disabled");
            $buttonSearch.removeAttribute("disabled");
            $search.setAttribute("data-typeOfSearch", "name");
            
        }else if(e.target.matches("#typeButton")){
            $tarjetas.innerHTML = ``;
            $text.innerHTML = "Type:";
            $search.removeAttribute("disabled");
            $buttonSearch.removeAttribute("disabled");
            $search.setAttribute("data-typeOfSearch", "type");
            $divModal.classList.toggle("hideModal");
            modal(api.byType);

            localStorage.setItem("modal","type");

            
        }else if(e.target.matches("#genButton")){
           $tarjetas.innerHTML = ``;
            $text.innerHTML = "Generation:";
            $search.removeAttribute("disabled");
            $buttonSearch.removeAttribute("disabled");
            $search.setAttribute("data-typeOfSearch", "gen");
            $divModal.classList.toggle("hideModal");
            modal(api.byGeneration);
            localStorage.setItem("modal","gen");


            
        }else if(e.target.matches(".buttonImput") && !e.target.getAttribute("disabled")){
            searchBy($search.getAttribute("name"));
        }

    });

    async function searchBy(typeOfSearch){
        
        let is = false;

        $tarjetas.innerHTML = ``;

        if(typeOfSearch === "name"){
            await ajax({
                url: api.byName,
                success: (props) => {
                    let {count ,results } = props;
                    for(let i = 0; i < count; i++){
                        if(results[i].name.toUpperCase() === $search.value.toUpperCase()){
                            
                            $tarjetas.appendChild(createCard(`${api.searchPokemon}${$search.value.toLowerCase()}`));
                            is = true;
                            break;
                        }
                    }
                    if(!is) console.log(`El pokémon ${$search.value.charAt(0).toUpperCase() + $search.value.slice(1)} no existe`);
                }
            });
        }
    }

    async function modal(url){
        $divModal.classList.add("modal"); 
        $divModal.innerHTML = ``;
        await ajax({
            url: url,
            success: (props) =>{
                let {count, results} = props;
                const $fragment = d.createDocumentFragment();
                for(let i = 0; i < count; i++){
                    const $button = d.createElement("button");

                    $button.style.width = "auto";
                    $button.style.height = "50px";

                    $button.value = results[i].name;

                    $button.innerHTML = results[i].name.charAt(0).toUpperCase() + results[i].name.slice(1);
                    $fragment.appendChild($button);
                }
                $divModal.appendChild($fragment);
                $body.appendChild($divModal);
            }
        });

    }
    
    
}
