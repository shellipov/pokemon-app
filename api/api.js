import axios from "axios";

export default class Api {
  static async getPost(limit = 25, offset = 0) {
    try {
      const resp = await axios.get(`https://pokeapi.co/api/v2/pokemon`, {
        params: {
          limit: limit,
          offset: offset,
        },
      });
      return resp.data;
    } catch (e) {}
  }
  static async getPokemon(name) {
    try {
      const resp = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      return resp.data;
    } catch (e) {}
  }
  static async getURL(url) {
    try {
      const resp = await axios.get(`${url}`);
      return resp.data;
    } catch (e) {}
  }
}
