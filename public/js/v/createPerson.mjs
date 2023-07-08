/*Import Statements */

import Person, { GenderEL } from "../m/Person.mjs";
import { showProgressBar, hideProgressBar,fillSelectWithOptions } from "../../lib/util.mjs";
import { handleAuthentication } from "./accessControl.mjs";

/* UI Authentication */
handleAuthentication();

/* Variable Declaration */
const formEl = document.forms["Person"],
createButton = formEl["commit"],
progressEl = document.querySelector("progress");

/* Add event listeners */
formEl["personId"].addEventListener("input", function () {
    // do not yet check the ID constraint, only before commit
    formEl["personId"].setCustomValidity( Person.checkPersonId( formEl["personId"].value).message);
});
formEl["personName"].addEventListener("input", function () {
    formEl["personName"].setCustomValidity( Person.checkName( formEl["personName"].value).message);
});
formEl["birth"].addEventListener("input", function () {
    formEl["birth"].setCustomValidity( Person.checkBirth( formEl["birth"].value).message);
});


const createGenderSelectEl = formEl.gender;
fillSelectWithOptions(createGenderSelectEl, GenderEL.labels);

createButton.addEventListener("click", async function () {
 const slots = {
   personId: formEl["personId"].value,
   personName: formEl["personName"].value,
   birth: formEl["birth"].value,
   gender: formEl["gender"].value,
 };
    showProgressBar( progressEl);
    formEl["personId"].setCustomValidity(( await Person.checkPersonIdAsId( slots.personId)).message);
    formEl["personName"].setCustomValidity( Person.checkName( slots.personName).message);
    formEl["birth"].setCustomValidity( Person.checkBirth( slots.birth).message);
    if (formEl.checkValidity()) {
        await Person.add( slots);
        formEl.reset();
    }
    hideProgressBar( progressEl);
});
// neutralize the submit event
formEl.addEventListener("submit", function (e) {
    e.preventDefault();
});