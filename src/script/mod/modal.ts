const openBtn = document.getElementById("dialogOpen");
const closeBtnModal = document.getElementById("closeDialog");
const dialog = document.getElementById(
  "dialogForm"
) as HTMLDialogElement | null;

openBtn.addEventListener("click", () => {
  dialog.showModal();
});

closeBtnModal.addEventListener("click", () => {
  dialog.close();
});
