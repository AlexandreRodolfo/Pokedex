




var total = document.getElementById('quantidade');
total.addEventListener('keyup', () => {
    catchQuantidade(total.value);
    document.addEventListener("DOMContentLoaded", function (event) {
        showCatchQuantidade();
    });
})

function showCatchQuantidade() {
    document.getElementById("loadingBall").style(display, "none");
}

function catchQuantidade(quantidade) {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=' + quantidade)
        .then(response => response.json())
        .then(allPokemon => {

            var pokemons = [];

            //results é uma informacao da pokeAPI
            allPokemon.results.map((val) => {

                //precisamos fazer outro fetch para a url para pegarmos as informacoes
                //que contem a imagem do pokemon

                fetch(val.url).then(response => response.json())
                    .then(pokeSingle => {
                        pokemons.push({ nome: val.name, imagem: pokeSingle.sprites.front_default, id: pokeSingle.id });
                        console.log(pokemons)
                        if (pokemons.length == quantidade) {
                            //concluido as requisicoes
                            var pokeBoxes = document.querySelector('.pokemon-boxes');

                            pokeBoxes.innerHTML = "";

                            pokemons.map((val) => {
                                pokeBoxes.innerHTML += `
                            <div class="poke-box">
                                <img src="`+ val.imagem + `">
                                <p>`+ "#" + val.id + " " + val.nome + `</p>
                            </div>
                            `;
                            })

                        }

                    })
            })





        });
}