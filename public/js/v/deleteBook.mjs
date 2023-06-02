import Book from "../m/Book.mjs";

const bookRecords = await Book.retrieveAll();

const formEl = document.forms["Book"],
  deleteButton = formEl["commit"],
  selectBookEl = formEl["selectBook"];

for (const bookRec of bookRecords) {
  const optionEl = document.createElement("option");
  optionEl.text = bookRec.title;
  optionEl.value = bookRec.isbn;
  selectBookEl.add( optionEl, null);
}

deleteButton.addEventListener("click", async function () {
  const isbn = selectBookEl.value;
  if (!isbn) return;
  if (confirm("Do you really want to delete this book record?")) {
    await Book.destroy( isbn);
    // remove deleted book from select options
    selectBookEl.remove( selectBookEl.selectedIndex);
  }
});