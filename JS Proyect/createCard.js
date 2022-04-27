
export function createCard(url){
    
    const $card = document.createElement("div");

    fetch(url)
    .then(res => res.ok ? res.json() : Promise.reject())
    .then( (json) => {
        let {name, sprites, types} = json;
        let type = types[0].type.name.charAt(0).toUpperCase() + types[0].type.name.slice(1);
        if(types.length === 2){
            type += " - " + types[1].type.name.charAt(0).toUpperCase() + types[1].type.name.slice(1);
        }
        name = name.charAt(0).toUpperCase() + name.slice(1);
        $card.classList.add("card");
        $card.value = name;
    
        $card.innerHTML = 
            `
                <img src="${sprites.front_default}">
                <h3>${name}</h3>
                <p>${type}</p>
            `
    })
    .catch(err => {

        

        let message = "Ha ocurrido un error al acceder a la api";
        console.log(err + message);
        $card.classList.add("card");
        $card.value = "error404";
        $card.style.display = "none";
        $card.innerHTML = `<img src="/unknwon.png" style="width:100%">`;
        
    });

    return $card;

}