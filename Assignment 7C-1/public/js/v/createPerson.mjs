 import Person, { GenderEL } from "../m/Person.mjs";
 import { fillSelectWithOptions } from "../../lib/util.mjs";

 const formEl = document.forms["Person"],
 createButton = formEl["commit"];


 const createGenderSelectEl = formEl.gender;
fillSelectWithOptions(createGenderSelectEl, GenderEL.labels);

createButton.addEventListener("click", async function () {
  const slots = {
    personId: formEl["personId"].value,
    personName: formEl["personName"].value,
    birth: formEl["birth"].value,
    gender: formEl["gender"].value,
  };
  await Person.add(slots);
  formEl.reset();
});
