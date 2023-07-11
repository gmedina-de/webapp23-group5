 import Person, { GenderEL } from "../m/Person.mjs";
 const PersonRecords = await Person.retrieveAll();
 const tableBodyEl = document.querySelector("table#Persons>tbody");
 for (const PersonRec of PersonRecords) {
   const row = tableBodyEl.insertRow();
   row.insertCell().textContent = PersonRec.personId;
   row.insertCell().textContent = PersonRec.personName;
   row.insertCell().textContent = GenderEL.labels[PersonRec.gender - 1];
   row.insertCell().textContent = PersonRec.birth;
 }