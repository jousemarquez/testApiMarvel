appDiv = document.querySelector("#appDiv")
let ts = Date.now();
let pubkey = "ffa8a471c4a80f3a72f6c4bf1b6bbc3f";
let pvtkey = "f416a13904e82f50f1c6247334ff33577fc4a995";
let hash = CryptoJS.MD5(ts+pvtkey+pubkey).toString();
let url  = `http://gateway.marvel.com/v1/public/characters?nameStartsWith=Thor&ts=${ts}&apikey=${pubkey}&hash=${hash}`;
console.log(url);
fetch(url)
.then(response => response.json())
.then(json => {
    json.data.results.map(item => {
        let url = item.thumbnail.path+"."+item.thumbnail.extension
        appDiv.innerHTML += `<div class="item">
        <img src=${url.replace('http', 'https')}/>
        <span>${item.name}</span>
        </div>`
    }
    )}
);