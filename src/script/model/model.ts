const uri = "http://localhost:3000";

export default class Model {
  async getIg() {
    try {
      const res = await fetch(uri, {
        method: "GET",
        headers: { "Content-type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("gagal fetch data");
      }

      return await res.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async postIg({ data }: { data: FormData }) {
    try {
      const res = await fetch(`${uri}/notes`, {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        throw new Error("gagal post note");
      }

      return res.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
