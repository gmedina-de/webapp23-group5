import Person from "../m/Person.mjs";
function generateTestData() {
  try {
    Person.generateTestData();
  } catch (e) {
    console.log(`${e.constructor.name}: ${e.message}`);
  }
}
function clearData() {
  if (confirm("Do you really want to delete the entire database?")) {
    try {
      Person.clearData(false);
      console.log("All data cleared.");
    } catch (e) {
      console.log(`${e.constructor.name}: ${e.message}`);
    }
  }
}

export { generateTestData, clearData };