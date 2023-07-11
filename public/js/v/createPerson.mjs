import Person, { GenderEL } from "../m/Person.mjs";
import { fillSelectWithOptions } from "../../lib/util.mjs";
import { showProgressBar, hideProgressBar } from "../../lib/util.mjs";


const formEl = document.forms["Person"],
    createButton = formEl["commit"],
    progressEl = document.querySelector("progress");

const createGenderSelectEl = formEl.gender;
fillSelectWithOptions(createGenderSelectEl, GenderEL.labels);

formEl["personId"].addEventListener("input", function () {
    formEl["personId"].setCustomValidity(Person.checkPersonId(formEl["personId"].value).message);
    formEl["personId"].reportValidity();
});
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
createButton.addEventListener("click", async function () {
    const slots = {
        personId: formEl["personId"].value,
        personName: formEl["personName"].value,
        gender: formEl["gender"].value,
        birth: formEl["birth"].value,
    };
    showProgressBar(progressEl);
    formEl["personId"].setCustomValidity((await Person.checkPersonIdAsId(slots.personId)).message);
    formEl["personId"].reportValidity();
    formEl["personName"].setCustomValidity(Person.checkPersonName(slots.personName).message);
    formEl["gender"].setCustomValidity(Person.checkGender(slots.gender).message);
    formEl["birth"].setCustomValidity(Person.checkBirth(slots.birth).message);
    if (formEl.checkValidity()) {
        await Person.add(slots);
        formEl.reset();
    }
    hideProgressBar(progressEl);
});
formEl.addEventListener("submit", function (e) {
    e.preventDefault();
});