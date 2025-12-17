import Model from "./model/model";
import "./mod/modal";
import "./mod/form";
const uri = import.meta.env.VITE_API_URL;

const model = new Model();
const listIg = document.getElementById("listIg") as HTMLUListElement;

export async function getModel() {
  const result = await model.getIg();

  listIg.innerHTML = ""; // reset list

  result.data.forEach((element: any) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <h4>${element.title}</h4>
      <p>${element.content}</p>
      ${element.image ? `<img src="${element.image.url}" width="120">` : ""}
    `;

    listIg.appendChild(li);
  });
}

getModel();
