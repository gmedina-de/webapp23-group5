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



fillSelectWithOptions(formEl.gender, GenderEL.labels);

for (const MemberRec of MemberRecords) {
  const optionEl = document.createElement("option");
  optionEl.text = MemberRec.personName;
  optionEl.value = MemberRec.personId;
  selectMemberEl.add(optionEl, null);
}
selectMemberEl.addEventListener("change", async function () {
  const memberId = selectMemberEl.value;
  if (memberId) {
    const MemberRec = await Person.retrieve(memberId);
    formEl["PersonId"].value = MemberRec.personId;
    formEl["PersonName"].value = MemberRec.personName;
    formEl["gender"].value = MemberRec.gender;
    formEl["birth"].value = MemberRec.birth;
  } else {
    formEl.reset();
  }
});

updateButton.addEventListener("click", async function () {
  const slots = {
    personId: formEl["PersonId"].value,
    personName: formEl["PersonName"].value,
    gender: formEl["gender"].value,
    birth: formEl["birth"].value,
  },
    MemberIdRef = selectMemberEl.value;
  if (!MemberIdRef) return;
  await Person.update(slots);
  selectMemberEl.options[selectMemberEl.selectedIndex].text = slots.personName;
  formEl.reset();
});