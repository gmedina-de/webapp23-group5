import Person from "../m/Person.mjs";

const PersonRecords = await Person.retrieveAll();

const formEl = document.forms["Person"],
  deleteButton = formEl["commit"],
  selectPersonEl = formEl["selectPerson"];
for (const PersonRec of PersonRecords) {
  const optionEl = document.createElement("option");
  optionEl.text = PersonRec.personName;
  optionEl.value = PersonRec.personId;
  selectPersonEl.add(optionEl, null);
}

deleteButton.addEventListener("click", async function () {
  const personId = selectPersonEl.value;
  if (!personId) return;
  if (confirm("Do you really want to delete this Person?")) {
    await Person.destroy(personId);
    selectPersonEl.remove(selectPersonEl.selectedIndex);
  }
});