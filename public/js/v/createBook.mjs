import Book from "../m/Book.mjs";

const formEl = document.forms["Book"],
  createButton = formEl["commit"];

createButton.addEventListener("click", async function () {
  const slots = {
    isbn: formEl["isbn"].value,
    title: formEl["title"].value,
    year: formEl["year"].value
  };
  await Book.add( slots);
  formEl.reset();
});
