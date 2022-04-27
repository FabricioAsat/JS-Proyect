export async function ajax(props){
    let {url, success} = props;

    await   fetch(url)
    .then(res => res.ok ? res.json() : Promise.reject())
    .then( json => success(json))
    .catch(err => {
        let message = `Error al acceder a la api`;
        console.log(err + message);
        
    })

}