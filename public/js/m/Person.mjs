import { fsDb } from "../initFirebase.mjs";
import {collection as fsColl, deleteDoc, doc as fsDoc, getDoc, getDocs, onSnapshot,orderBy, query as fsQuery, setDoc, updateDoc}
  from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
  import { Enumeration } from "../../lib/Enumeration.mjs";
  import {
    NoConstraintViolation, MandatoryValueConstraintViolation, IntervalConstraintViolation,
    RangeConstraintViolation, UniquenessConstraintViolation, StringLengthConstraintViolation
  } from "../../lib/errorTypes.mjs";
  import { createModalFromChange } from "../../lib/util.mjs";
  const GenderEL = new Enumeration({ "M": "Male", "F": "Female"});


  class Person {
    // record parameter with the ES6 syntax for function parameter destructuring
    constructor({ personId, personName, gender, birth }) {
      this.personId = personId;
      this.personName = personName;
      this.gender = gender;
      this.birth = birth;
    }
    get personId() {
      return this._personId;
    };
  
    static checkPersonId(personId) {
      if (!personId) {
        return new MandatoryValueConstraintViolation("A value for the person ID must be provided!");
      } else {
        if (isNaN(personId) || personId < 1) {
          return new RangeConstraintViolation("The person ID must be a positive integer!");
        } else {
          return new NoConstraintViolation();
        }
      }
    }
  
    static async checkPersonIdAsId(personId) {
      let validationResult = Person.checkPersonId(personId);
      if ((validationResult instanceof NoConstraintViolation)) {
        if (!personId) {
          validationResult = new MandatoryValueConstraintViolation(
            "A value for the person ID must be provided!");
        } else {
          const personDocSn = await getDoc(fsDoc(fsDb, "persons", personId));
          if (personDocSn.exists()) {
            console.log("The person ID already exist");
            validationResult = new UniquenessConstraintViolation(
              "There is already a person record with this person ID!");
          } else {
            validationResult = new NoConstraintViolation();
          }
        }
      }
      return validationResult;
    }
  
    set personId(personId) {
      var validationResult = Person.checkPersonId(personId);
      if (validationResult instanceof NoConstraintViolation) {
        this._personId = personId;
      } else {
        throw validationResult;
      }
    }
    
    get personName() {
      return this._personName;
    }
    static checkPersonName(personName) {
      const PERSONNAME_LENGTH_MAX = 50;
      if (!personName) {
        return new MandatoryValueConstraintViolation("A name must be provided!");
      } else if (personName === "") {
        return new RangeConstraintViolation("The name must be a non-empty string!");
      } else if (personName.length > PERSONNAME_LENGTH_MAX) {
        return new StringLengthConstraintViolation(
          `The value of the person must be at most ${PERSONNAME_LENGTH_MAX} characters!`);
      }
      else {
        return new NoConstraintViolation();
      }
    }
    set personName(personName) {
      const validationResult = Person.checkPersonName(personName);
      if (validationResult instanceof NoConstraintViolation) {
        this._personName = personName;
      } else {
        throw validationResult;
      }
    }
  
    get gender() {
      return this._gender;
    }
    static checkGender(gender) {
      if (!gender || gender === "") {
        return new MandatoryValueConstraintViolation("A gender must be selected!");
      } else {
        return new NoConstraintViolation();
      }
    }
    set gender(gender) {
      const validationResult = Person.checkGender(gender);
      if (validationResult instanceof NoConstraintViolation) {
        this._gender = gender;
      } else {
        throw validationResult;
      }
    }
    
    get birth() {
      return this._birth;
    }
    static checkBirth(birth) {
      let DOB = new Date(birth);
      DOB.setFullYear(DOB.getFullYear());
      if (!birth || birth === "") {
        return new MandatoryValueConstraintViolation("A Date must be selected!");
      } else {
        return new NoConstraintViolation();
      }
    }
    set birth(birth) {
      const validationResult = Person.checkBirth(birth);
      if (validationResult instanceof NoConstraintViolation) {
        this._birth = birth;
      } else {
        throw validationResult;
      }
    }
  }
  
  
  Person.converter = {
    toFirestore: function (person) {
      const data = {
        personId: person.personId,
        personName: person.personName,
        gender: person.gender,
        birth: person.birth,
      };
      return data;
    },
    fromFirestore: function (snapshot, options) {
      const data = snapshot.data(options);
      return new Person(data);
    }
  };
  
  Person.add = async function (slots) {
    let person = null;
    try {
      person = new Person(slots);
      let validationResult = await Person.checkPersonIdAsId(person.personId);
      if (!validationResult instanceof NoConstraintViolation) throw validationResult;
    } catch (e) {
      console.error(`${e.constructor.name}: ${e.message}`);
      person = null;
    }
    if (person) {
      try {
        const personDocRef = fsDoc(fsDb, "persons", person.personId).withConverter(Person.converter);
        await setDoc(personDocRef, person);
        console.log(`person record "${person.personId}" created!`);
      } catch (e) {
        console.error(`${e.constructor.name}: ${e.message} + ${e}`);
      }
    }
  };
  
  Person.retrieve = async function (personId) {
    try {
      const personRec = (await getDoc(fsDoc(fsDb, "persons", personId)
        .withConverter(Person.converter))).data();
      console.log(`Person record "${personRec.personId}" retrieved.`);
      return personRec;
    } catch (e) {
      console.error(`Error retrieving person record: ${e}`);
    }
  };
 
  Person.retrieveAll = async function (order) {
    if (!order) order = "personId";
    const personsCollRef = fsColl(fsDb, "persons"),
      q = fsQuery(personsCollRef, orderBy(order));
    try {
      const personRecs = (await getDocs(q.withConverter(Person.converter))).docs.map(d => d.data());
      console.log(`${personRecs.length} person records retrieved ${order ? "ordered by " + order : ""}`);
      return personRecs;
    } catch (e) {
      console.error(`Error retrieving person records: ${e}`);
    }
  };
 
  Person.update = async function (slots) {
    let noConstraintViolated = true,
      validationResult = null,
      personBeforeUpdate = null;
    const personDocRef = fsDoc(fsDb, "persons", slots.personId).withConverter(Person.converter),
      updatedSlots = {};
    try {
      // retrieve up-to-date book record
      const personDocSn = await getDoc(personDocRef);
      personBeforeUpdate = personDocSn.data();
    } catch (e) {
      console.error(`${e.constructor.name}: ${e.message}`);
    }
    try {
      if (personBeforeUpdate.personName !== slots.personName) {
        validationResult = Person.checkPersonName(slots.personName);
        if (validationResult instanceof NoConstraintViolation) updatedSlots.personName = slots.personName;
        else throw validationResult;
      }
      if (personBeforeUpdate.gender !== slots.gender) {
        validationResult = Person.checkGender(slots.gender);
        if (validationResult instanceof NoConstraintViolation) updatedSlots.gender = slots.gender;
        else throw validationResult;
      }
      if (personBeforeUpdate.birth !== slots.birth) {
        validationResult = Person.checkBirth(slots.birth);
        if (validationResult instanceof NoConstraintViolation) updatedSlots.birth = slots.birth;
        else throw validationResult;
      }
  
    } catch (e) {
      noConstraintViolated = false;
      console.error(`${e.constructor.name}: ${e.message}`);
    }
    if (noConstraintViolated) {
      const updatedProperties = Object.keys(updatedSlots);
      if (updatedProperties.length) {
        await updateDoc(personDocRef, updatedSlots);
        console.log(`Property(ies) "${updatedProperties.toString()}" modified for person record "${slots.personId}"`);
      } else {
        console.log(`No property value changed for person record "${slots.personId}"!`);
      }
    }
  };
 
  Person.destroy = async function (personId) {
    try {
      await deleteDoc(fsDoc(fsDb, "persons", personId));
      console.log(`person record "${personId}" deleted!`);
    } catch (e) {
      console.error(`Error deleting book record: ${e}`);
    }
  };
 
  Person.generateTestData = async function () {
    try {
      console.log("Generating test data...");
      const response = await fetch("../../test-data/persons.json");
      const personRecs = await response.json();
      await Promise.all(personRecs.map(d => Person.add(d)));
      console.log(`${personRecs.length} persons saved.`);
    } catch (e) {
      console.error(`${e.constructor.name}: ${e.message}`);
    }
  };
 
  Person.clearData = async function (confirmation = true) {
    if (confirm("Do you really want to delete all person records?")) {
      try {
        console.log("Clearing test data...");
        const personsCollRef = fsColl(fsDb, "persons");
        const personsQrySn = (await getDocs(personsCollRef));
        await Promise.all(personsQrySn.docs.map(d => Person.destroy(d.id)))
        console.log(`${personsQrySn.docs.length} persons deleted.`);
      } catch (e) {
        console.error(`${e.constructor.name}: ${e.message}`);
      }
    }
  };
  
  Person.observeChanges = async function (personId) {
    try {
      // listen document changes, returning a snapshot (snapshot) on every change
      const personDocRef = fsDoc(fsDb, "persons", personId).withConverter(Person.converter);
      const personRec = (await getDoc(personDocRef)).data();
      return onSnapshot(personDocRef, function (snapshot) {
        // create object with original document data
        const originalData = { itemName: "person", description: `${personRec.personName} (personId: ${personRec.personId})` };
        if (!snapshot.data()) { // removed: if snapshot has not data
          originalData.type = "REMOVED";
          createModalFromChange(originalData); // invoke modal window reporting change of original data
        } else if (JSON.stringify(personRec) !== JSON.stringify(snapshot.data())) {
          originalData.type = "MODIFIED";
          createModalFromChange(originalData); // invoke modal window reporting change of original data
        }
      });
    } catch (e) {
      console.error(`${e.constructor.name} : ${e.message}`);
    }
  }
  
  export default Person;
  export { GenderEL };