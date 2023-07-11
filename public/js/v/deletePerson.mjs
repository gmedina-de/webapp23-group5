 import Person from "../m/Person.mjs";
 const PersonRecords = await Person.retrieveAll();

 const formEl = document.forms["Person"],
   deleteButton = formEl["commit"],
   selectPersonEl = formEl["selectPerson"];
 let cancelListener = null;

 for (const PersonRec of PersonRecords) {
   const optionEl = document.createElement("option");
   optionEl.text = PersonRec.personName;
   optionEl.value = PersonRec.personId;
   selectPersonEl.add(optionEl, null);
 }

 selectPersonEl.addEventListener("change", async function () {
   const personKey = selectPersonEl.value;
   if (personKey) {
     if (cancelListener) cancelListener();
     cancelListener = await Person.observeChanges(personKey);
   }
 });
 
 deleteButton.addEventListener("click", async function () {
   const personId = selectPersonEl.value;
   if (!personId) return;
   if (confirm("Do you really want to delete this Person record?")) {
     await Person.destroy(personId);
     selectPersonEl.remove(selectPersonEl.selectedIndex);
   }
 });