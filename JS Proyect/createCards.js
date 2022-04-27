import { ajax } from "./ajax.js";
import api from "./api.js";
import {createCard} from "./createCard.js";

export default async function createCards(option){

    const $fragment = document.createDocumentFragment();
    const $tarjetas = document.querySelector(".tarjetas");
    
    if(option === "type"){
        
        await ajax({
            url: `${api.byType}${localStorage.getItem("type")}`,
            success: (props)=>{
                let {pokemon} = props;

                for(let i = 0; i < pokemon.length; i++){
                    
                    const $card = createCard(pokemon[i].pokemon.url);
                    $fragment.appendChild($card);
                }
                
                $tarjetas.appendChild($fragment);
            },
        });

    }else if(option === "gen"){

        await ajax({
            url: `${api.byGeneration}${localStorage.getItem("type")}`,
            success: (props)=>{
                let {pokemon_species} = props;

                for(let i = 0; i < pokemon_species.length; i++){
                    
                    const $card = createCard(`${api.searchPokemon}${pokemon_species[i].name}`);

                    $fragment.appendChild($card);
                }
                
                $tarjetas.appendChild($fragment);
            },
        });
        
    }
}