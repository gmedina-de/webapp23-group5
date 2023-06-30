import { fsDb } from "../initFirebase.mjs";
import { collection as fsColl, deleteDoc, doc as fsDoc, getDoc, getDocs, setDoc, updateDoc }
  from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore-lite.js";
  import { Enumeration } from "../../lib/Enumeration.mjs";

  const GenderEL = new Enumeration({ "M": "Male", "F": "Female"});


  class Person {
    constructor({ personId, personName, gender, birth }) {
      this.personId = personId;
      this.personName = personName;
      this.gender = gender;
      this.birth = birth;
  
    }
  }

  Person.add = async function (slots) {
    console.log(slots.personId);
    const personsCollRef = fsColl(fsDb, "persons"),
      personDocRef = fsDoc(personsCollRef, slots.personId);
    try {
      await setDoc(personDocRef, slots);
      console.log(`person record ${slots.personId} created.`);
    } catch (e) {
      console.error(`Error adding person: ${e}`);
    }
  };
  
  Person.retrieve = async function (personId) {
    let personDocSn = null;
    try {
      const personDocRef = fsDoc(fsDb, "persons", personId);
      personDocSn = await getDoc(personDocRef);
    } catch (e) {
      console.error(`Error retrieving person: ${e}`);
      return null;
    }
    const personRec = personDocSn.data();
    console.log(personRec);
    return personRec;
  };
 
  Person.retrieveAll = async function () {
    let personsQrySn = null;
    try {
      const personsCollRef = fsColl(fsDb, "persons");
      personsQrySn = await getDocs(personsCollRef);
    } catch (e) {
      console.error(`Error retrieving person: ${e}`);
      return null;
    }
    const personDocs = personsQrySn.docs,
      personRecs = personDocs.map(d => d.data());
    console.log(`${personRecs.length} person retrieved.`);
    return personRecs;
  };
 
  Person.update = async function (slots) {
    const updSlots = {};
    const personRec = await Person.retrieve(slots.personId);
    if (personRec.personName !== slots.personName) updSlots.personName = slots.personName;
    if (personRec.gender !== slots.gender) updSlots.gender = slots.gender;
    if (personRec.birth !== slots.birth) updSlots.birth = slots.birth;
    if (Object.keys(updSlots).length > 0) {
      try {
        const personDocRef = fsDoc(fsDb, "persons", slots.personId);
        await updateDoc(personDocRef, updSlots);
        console.log(`person ${slots.personId} modified.`);
      } catch (e) {
        console.error(`Error updating person: ${e}`);
      }
    }
  };
 
  Person.destroy = async function (personId) {
    try {
      await deleteDoc(fsDoc(fsDb, "persons", personId));
      console.log(`person ${personId} deleted.`);
    } catch (e) {
      console.error(`Error deleting person record: ${e}`);
    }
  };
 
  Person.generateTestData = async function () {
    let personRecs = [
      {
        personId: "1",
        personName: "Carolyn Ward",
        gender: "2",
        birth: "1995-01-11",
      },
      {
        personId: "2",
        personName: "Toby Leach",
        gender: "1",
        birth: "1978-10-23",
      },
      {
        personId: "3",
        personName: "Katie Pritch",
        gender: "2",
        birth: "1989-09-13",
      }
    ];
    await Promise.all(personRecs.map(d => Person.add(d)));
    console.log(`${Object.keys(personRecs).length} person saved.`);
  };
  Person.clearData = async function () {
    if (confirm("Do you really want to delete all person?")) {
      const personRecs = await Person.retrieveAll();
      await Promise.all(personRecs.map(d => Person.destroy(d.personId)));
      console.log(`${Object.values(personRecs).length} person records deleted.`);
    }
  };
  
  export default Person;
  export { GenderEL };