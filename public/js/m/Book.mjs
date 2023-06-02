import { db } from "../initFirebase.mjs";
import { collection as fsColl, deleteDoc, doc as fsDoc, getDoc, getDocs, setDoc, updateDoc }
  from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore-lite.js";

class Book {
  // record parameter with the ES6 syntax for function parameter destructuring
  constructor({ isbn, title, year }) {
    this.isbn = isbn;
    this.title = title;
    this.year = year;
  }

  static async add(slots) {
    const booksCollRef = fsColl(db, "books"),
      bookDocRef = fsDoc(booksCollRef, slots.isbn);
    slots.year = parseInt(slots.year);  // convert from string to integer
    try {
      await setDoc(bookDocRef, slots);
      console.log(`Book record ${slots.isbn} created.`);
    } catch (e) {
      console.error(`Error when adding book record: ${e}`);
    }
  }

  static async retrieve(isbn) {
    let bookDocSn = null;
    try {
      const bookDocRef = fsDoc(db, "books", isbn);
      bookDocSn = await getDoc(bookDocRef);
    } catch (e) {
      console.error(`Error when retrieving book record: ${e}`);
      return null;
    }
    const bookRec = bookDocSn.data();
    return bookRec;
  }

  static async retrieveAll() {
    let booksQrySn = null;
    try {
      const booksCollRef = fsColl(db, "books");
      booksQrySn = await getDocs(booksCollRef);
    } catch (e) {
      console.error(`Error when retrieving book records: ${e}`);
      return null;
    }
    const bookDocs = booksQrySn.docs,
      bookRecs = bookDocs.map(d => d.data());
    console.log(`${bookRecs.length} book records retrieved.`);
    return bookRecs;
  }

  static async update(slots) {
    const updSlots = {};
    // retrieve up-to-date book record
    const bookRec = await Book.retrieve(slots.isbn);
    // convert from string to integer
    if (slots.year) slots.year = parseInt(slots.year);
    // update only those slots that have changed
    if (bookRec.title !== slots.title) updSlots.title = slots.title;
    if (bookRec.year !== slots.year) updSlots.year = slots.year;
    if (Object.keys(updSlots).length > 0) {
      try {
        const bookDocRef = fsDoc(db, "books", slots.isbn);
        await updateDoc(bookDocRef, updSlots);
        console.log(`Book record ${slots.isbn} modified.`);
      } catch (e) {
        console.error(`Error when updating book record: ${e}`);
      }
    }
  }

  static async destroy(isbn) {
    try {
      await deleteDoc(fsDoc(db, "books", isbn));
      console.log(`Book record ${isbn} deleted.`);
    } catch (e) {
      console.error(`Error when deleting book record: ${e}`);
    }
  }

  static async generateTestData() {
    let bookRecs = [
      { isbn: "006251587X", title: "Weaving the Web", year: 2000 },
      { isbn: "0465026567", title: "Gödel, Escher, Bach", year: 1999 },
      { isbn: "0465030793", title: "I Am A Strange Loop", year: 2008 }
    ];
    // save all book record/documents
    await Promise.all(bookRecs.map(d => Book.add(d)));
    console.log(`${Object.keys(bookRecs).length} book records saved.`);
  }

  static async clearData() {
    if (confirm("Do you really want to delete all book records?")) {
      // retrieve all book documents from Firestore
      const bookRecs = await Book.retrieveAll();
      // delete all documents
      await Promise.all(bookRecs.map(d => Book.destroy(d.isbn)));
      // ... and then report that they have been deleted
      console.log(`${Object.values(bookRecs).length} book records deleted.`);
    }
  }
}
export default Book;
