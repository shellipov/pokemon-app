import axios from 'axios';

export interface IPokemonItem {
  id?: string;
  name?: string;
  front?: string;
  back?: string;
  weight?: string;
  height?: string;
  url?: string;
}

export default class Api {
  static async getDetailedList (pokeponList: {name: string}[]): Promise<IPokemonItem[] | undefined> {
    try {
      const promises = [];
      for (let i = 0; i < pokeponList.length; i++) {
        const pokemonName = pokeponList[i].name;
        promises.push(
          axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        );
      }

      return Promise.all(promises).then((results) => {
        return results.map((el): IPokemonItem => ({
          id: el.data.id,
          name: el.data.name,
          front: el.data.sprites.front_default,
          back: el.data.sprites.back_default,
          weight: el.data.weight,
          height: el.data.height,
          url: el.data.forms[0].url
        }));
      });
    } catch (e) {
      console.log(e);
    }
  }

  static async newGetPost () {
    try {
      const getCount = await axios.get('https://pokeapi.co/api/v2/pokemon');
      const allPokemons = await axios.get('https://pokeapi.co/api/v2/pokemon', {
        params: {
          limit: getCount.data.count,
          offset: 0,
        },
      });
      const sortArray = allPokemons.data.results.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      const sortObject = {};
      sortArray.forEach((pokemon: {name: string}) => {
        if (sortObject[pokemon.name.charAt(0)]) {
          sortObject[pokemon.name.charAt(0)].push(pokemon);
        } else {
          sortObject[pokemon.name.charAt(0)] = [pokemon];
        }
      });

      return sortObject;
    } catch (e) {
      console.log(e);
    }
  }

  static async getPokemon (name: string) {
    try {
      const resp = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

      return resp.data;
    } catch (e) {
      console.log(e);
    }
  }
  static async getURL (url: string) {
    try {
      const resp = await axios.get(`${url}`);

      return resp.data;
    } catch (e) {
      console.log(e);
    }
  }
}
