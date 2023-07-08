import Person, { GenderEL } from "../m/Person.mjs";
import { fillSelectWithOptions } from "../../lib/util.mjs";
import { handleAuthentication } from "./accessControl.mjs";

handleAuthentication();

const MemberRecords = await Person.retrieveAll();


const formEl = document.forms["Person"],
  updateButton = formEl["commit"],
  selectMemberEl = formEl["selectPerson"];

formEl["personName"].addEventListener("input", function () {
  formEl["personName"].setCustomValidity(
      Person.checkName( formEl["personName"].value).message);
});
formEl["birth"].addEventListener("input", function () {
  formEl["birth"].setCustomValidity(
      Person.checkBirth( formEl["year"].value).message);
});



fillSelectWithOptions(MemberRecords,selectMemberEl,"personId",'personName');

// for (const MemberRec of MemberRecords) {
//   const optionEl = document.createElement("option");
//   optionEl.text = MemberRec.personName;
//   optionEl.value = MemberRec.personId;
//   selectMemberEl.add(optionEl, null);
// }
selectMemberEl.addEventListener("change", async function () {
  const memberId = selectMemberEl.value;
  if (memberId) {
    const MemberRec = await Person.retrieve(memberId);
    for (const field of ["personId", "personName", "gender", "birth"]) {
      formEl[field].value = MemberRec[field] !== undefined ? MemberRec[field] : "";
      // delete custom validation error message which may have been set before
      formEl[field].setCustomValidity("");
    }
  } else {
    formEl.reset();
  }
});

updateButton.addEventListener("click", async function () {
  const  MemberIdRef = selectMemberEl.value;
  if (!MemberIdRef) return;
  const slots = {
    personId: formEl["PersonId"].value,
    personName: formEl["PersonName"].value,
    gender: formEl["gender"].value,
    birth: formEl["birth"].value,
  };
  formEl["personName"].addEventListener("input", function () {
    formEl["personName"].setCustomValidity(
        Person.checkName( slots.personName).message);
  });
  formEl["birth"].addEventListener("input", function () {
    formEl["birth"].setCustomValidity(
        Person.checkBirth( slots.birth).message);
  });
  if (formEl.checkValidity()){
    Person.update(slots);
    selectMemberEl.options[selectMemberEl.selectedIndex].text = slots.personName;
    formEl.reset();
  }
});

formEl.addEventListener("submit", function (e) {
  e.preventDefault();
});