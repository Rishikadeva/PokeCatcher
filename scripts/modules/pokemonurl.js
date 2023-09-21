export function getPokeUrl(pokename){
    let pokeUrl;
    switch(pokename){
        case 'pikachu':
            pokeUrl = "./images/pokemons/pikachu.svg";
            break;
        case 'rattata':
            pokeUrl = "./images/pokemons/rattata.svg";
            break;
        case 'snorlax':
                pokeUrl = "./images/pokemons/snorlax.svg";
                break;
        case 'bullbasaur':
            pokeUrl = "./images/pokemons/bullbasaur.svg"
            break;
        case 'charmander':
            pokeUrl = "./images/pokemons/charmander.svg"
            break;
        case 'meowth':
            pokeUrl = "./images/pokemons/meowth.svg"
            break;
        case 'squirtle':
            pokeUrl = "./images/pokemons/squirtle.svg"
            break;
        case 'jigglypuff':
            pokeUrl = "./images/pokemons/jigglypuff.svg"
            break;
        case 'caterpie':
            pokeUrl = "./images/pokemons/caterpie.svg"
            break;
        case 'eevee':
            pokeUrl = "./images/pokemons/eevee.svg"
            break;
        case 'final':
            pokeUrl="./images/pokemons/result.svg"
            break;


        default:
            pokeUrl = "./images/pokemons/egg.svg";
            
    }
    return pokeUrl;
}