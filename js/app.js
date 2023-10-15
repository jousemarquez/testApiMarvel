//require('dotenv').config();

const appDiv = document.querySelector("#appDiv");
const ts = Date.now();
/* const pubkey = process.env.MARVEL_PUBLIC_KEY;
const pvtkey = process.env.MARVEL_PRIVATE_KEY; */
const pubkey = "ffa8a471c4a80f3a72f6c4bf1b6bbc3f";
const pvtkey = "f416a13904e82f50f1c6247334ff33577fc4a995";

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const buttonsDiv = document.querySelector("#buttons");

// Fetch data

function fetchDataWithLetter(letter) {
  const hash = CryptoJS.MD5(ts + pvtkey + pubkey).toString();
  const url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${letter}&ts=${ts}&apikey=${pubkey}&hash=${hash}`;

  fetch(url)
    .then(response => response.json())
    .then(json => {
      appDiv.innerHTML = `<h2>Heroes name starts with ${letter}</h2><br>`;
      json.data.results.forEach(item => {
        const imageUrl = `${item.thumbnail.path}.${item.thumbnail.extension}`;
        appDiv.innerHTML += `
          <div class="item">
            <img src="${imageUrl}" alt="${item.name}" />
            <span>${item.name}</span>
          </div>
        `;
      });
    })
    .catch(error => {
      console.error(`Error fetching data for letter '${letter}':`, error);
    });
}

// Alphabet Buttons

alphabet.split('').forEach(letter => {
  const button = document.createElement('button');
  button.textContent = letter;
  button.addEventListener('click', () => fetchDataWithLetter(letter));
  buttonsDiv.appendChild(button);
});