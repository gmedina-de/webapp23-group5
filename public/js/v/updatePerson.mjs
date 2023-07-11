import Person, { GenderEL } from "../m/Person.mjs";
import { fillSelectWithOptions } from "../../lib/util.mjs";

const MemberRecords = await Person.retrieveAll();
const formEl = document.forms["Person"],
  updateButton = formEl["commit"],
  selectMemberEl = formEl.selectPerson;
let cancelListener = null;
// set up the gender selection list
fillSelectWithOptions(formEl.gender, GenderEL.labels);

formEl["personName"].addEventListener("input", function () {
  formEl["personName"].setCustomValidity(Person.checkPersonName(formEl["personName"].value).message);
  formEl["personName"].reportValidity();
});
formEl["gender"].addEventListener("input", function () {
  formEl["gender"].setCustomValidity(Person.checkGender(formEl["gender"].value).message);
  formEl["gender"].reportValidity();
});
formEl["birth"].addEventListener("input", function () {
  formEl["birth"].setCustomValidity(Person.checkBirth(formEl["birth"].value).message);
  formEl["birth"].reportValidity();
});

for (const MemberRec of MemberRecords) {
  const optionEl = document.createElement("option");
  optionEl.text = MemberRec.personName;
  optionEl.value = MemberRec.personId;
  selectMemberEl.add(optionEl, null);
}
selectMemberEl.addEventListener("change", async function () {
  if (cancelListener) cancelListener();
  const memberId = selectMemberEl.value;
  if (memberId) {
    // retrieve up-to-date person record
    cancelListener = await Person.observeChanges(memberId);
    const personRecord = await Person.retrieve(memberId);
    for (const field of ["personId", "personName", "gender", "birth"]) {
      formEl[field].value = personRecord[field] !== undefined ? personRecord[field] : "";
      // delete custom validation error message which may have been set before
      formEl[field].setCustomValidity("");
    }
  } else {
    formEl.reset();
  }
});

updateButton.addEventListener("click", async function () {
  if (cancelListener) cancelListener();
  const formEl = document.forms["Person"];
  const slots = {
    personId: formEl["personId"].value,
    personName: formEl["personName"].value,
    gender: formEl["gender"].value,
    birth: formEl["birth"].value,
  },
    MemberIdRef = selectMemberEl.value;
  formEl["personName"].addEventListener("input", function () {
    formEl["personName"].setCustomValidity(Person.checkPersonName(formEl["personName"].value).message);
  });
  formEl["gender"].addEventListener("input", function () {
    formEl["gender"].setCustomValidity(Person.checkGender(formEl["gender"].value).message);
  });
  formEl["birth"].addEventListener("input", function () {
    formEl["birth"].setCustomValidity(Person.checkBirth(formEl["birth"].value).message);
  });


  if (!MemberIdRef) return;
  if (formEl.checkValidity()) {
    Person.update(slots);
    selectMemberEl.options[selectMemberEl.selectedIndex].text = slots.personName;
    formEl.reset();
  }
});
