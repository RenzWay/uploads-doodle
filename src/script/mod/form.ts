import Model from "../model/model";
import { getModel } from "../main";
let model = new Model();
const form = document.getElementById("formIg") as HTMLFormElement;
const fileInput = form.elements.namedItem("image") as HTMLInputElement;
const previewImage = document.getElementById(
  "previewImage"
) as HTMLImageElement;

fileInput.addEventListener("change", () => {
  const file = fileInput.files?.[0];

  if (!file) {
    previewImage.style.display = "none";
    previewImage.src = "";
    return;
  }

  if (!file.type.startsWith("image/")) {
    alert("File harus gambar");
    fileInput.value = "";
    return;
  }

  previewImage.src = URL.createObjectURL(file);
  previewImage.style.display = "block";
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nameInput = form.elements.namedItem("name") as HTMLInputElement;
  const titleInput = form.elements.namedItem("title") as HTMLInputElement;
  const contentInput = form.elements.namedItem("content") as HTMLInputElement;

  const formData = new FormData();
  formData.append("name", nameInput.value);
  formData.append("title", titleInput.value);
  formData.append("content", contentInput.value);

  if (fileInput.files?.[0]) {
    formData.append("image", fileInput.files[0]);
  }

  form.reset();

  previewImage.src = "";
  previewImage.style.display = "none";

  await model.postIg({ data: formData });
  await getModel();
});
