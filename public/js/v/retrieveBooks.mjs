import Book from "../m/Book.mjs";

const bookRecords = await Book.retrieveAll();

const tableBodyEl = document.querySelector("table#books>tbody");

// for each book, create a table row with a cell for each attribute
for (const bookRec of bookRecords) {
  const row = tableBodyEl.insertRow();
  row.insertCell().textContent = bookRec.isbn;
  row.insertCell().textContent = bookRec.title;
  row.insertCell().textContent = bookRec.year;
}
