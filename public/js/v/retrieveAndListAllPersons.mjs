import Person, { GenderEL } from "../m/Person.mjs";
import { handleAuthentication } from "./accessControl.mjs";
import { showProgressBar, hideProgressBar } from "../../lib/util.mjs";

handleAuthentication();

const PersonRecords = await Person.retrieveAll(),
progressEl = document.querySelector("progress");

const tableBodyEl = document.querySelector("table#Persons>tbody");

for (const PersonRec of PersonRecords) {
  showProgressBar( progressEl);
  const row = tableBodyEl.insertRow();
  row.insertCell().textContent = PersonRec.personId;
  row.insertCell().textContent = PersonRec.personName;
  row.insertCell().textContent = GenderEL.labels[PersonRec.gender - 1];
  row.insertCell().textContent = PersonRec.birth;
}

