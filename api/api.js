import axios from "axios";

export default class Api {
  static async getPost() {
    try {
      const resp = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return resp.data;
    } catch (e) {
    }
  }
}

