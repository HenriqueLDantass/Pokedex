const NomePokemon = document.querySelector(".pokemon__name");
const NumeroPokemon = document.querySelector(".pokemon__number");
const PokemonImage = document.querySelector(".pokemon__imagem");

const form = document.querySelector(".form");
const input = document.querySelector(".inpu--serach");

const BtnPrev = document.querySelector(".btn-prev");
const BtnNext = document.querySelector(".btn-next");

let SearchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIresponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  if (APIresponse.status == 200) {
    const data = await APIresponse.json();
    return data;
  }
};
//renderizar pokemon
const renderPokemon = async (pokemon) => {
  NomePokemon.innerHTML = "Buscando...";
  NumeroPokemon.innerHTML = "";
  const data = await fetchPokemon(pokemon);

  if (data) {
    PokemonImage.style.display = "Block";
    NomePokemon.innerHTML = data.name;
    NumeroPokemon.innerHTML = data.id;
    PokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    input.value = "";
    SearchPokemon = data.id;
  } else {
    PokemonImage.style.display = "none";
    NomePokemon.innerHTML = "Not found";
    NumeroPokemon.innerHTML = "XXX";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

BtnPrev.addEventListener("click", () => {
  if (SearchPokemon > 1) {
    SearchPokemon -= 1;
    renderPokemon(SearchPokemon);
  }
});

BtnNext.addEventListener("click", () => {
  SearchPokemon += 1;
  renderPokemon(SearchPokemon);
});

renderPokemon(SearchPokemon);

/*await = falando que ira esperar o fetch concluir , so pode usar em funcoes assincrona
async = transformando em assincrona
200 = status Ok
temos que puxar com o json 
renderPokemon(input.value.toLowerCase()); pegando o valor e transformando em minusculo*/
