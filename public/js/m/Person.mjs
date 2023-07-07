import { fsDb } from "../initFirebase.mjs";
import { collection as fsColl, deleteDoc, doc as fsDoc, getDoc, getDocs, setDoc, updateDoc }
  from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore-lite.js";
  import { Enumeration } from "../../lib/Enumeration.mjs";
import {cloneObject, isNonEmptyString} from "../../lib/util.mjs";
import { NoConstraintViolation, MandatoryValueConstraintViolation,
  RangeConstraintViolation, UniquenessConstraintViolation,
  ReferentialIntegrityConstraintViolation }
  from "../../lib/errorTypes.mjs";

  const GenderEL = new Enumeration({ "M": "Male", "F": "Female"});


  class Person {
    constructor({ personId, personName, gender, birth }) {
      this.personId = personId;
      this.personName = personName;
      this.gender = gender;
      this.birth = birth;
  
    }

    get personId() {
      return this._personId;
    }
    static checkPersonId( id) {
      if (!id) {
        return new NoConstraintViolation();  // may be optional as an IdRef
      }else if (typeof( id) !== "string" || id.trim() === "") {
        return new RangeConstraintViolation("The ID must be a non-empty string!")
      }else {
        id = parseInt( id);  // convert to integer
        if (isNaN( id) || !Number.isInteger( id) || id < 1) {
          return new RangeConstraintViolation("The person ID must be a positive integer!");
        } else {
          return new NoConstraintViolation();
        }
      }
    }
    static async checkPersonIdAsId( id) {
      var constraintViolation = Person.checkPersonId(id);
      if ((constraintViolation instanceof NoConstraintViolation)) {
        // convert to integer
        id = parseInt(id);
        if (isNaN(id)) {
          return new MandatoryValueConstraintViolation(
              "A positive integer value for the person ID is required!");
        } else {
          const personDocSn = await getDoc( fsDoc( fsDb, "persons", id));
          if (personDocSn.exists()) {
            constraintViolation = new UniquenessConstraintViolation(
              "There is already a person record with this person ID!");
          } else {
          constraintViolation = new NoConstraintViolation();}
        }
      }
      return constraintViolation;
    }

    set personId( id) {
      const constraintViolation = Person.checkPersonIdAsId( id);
      if (constraintViolation instanceof NoConstraintViolation) {
        this._personId = parseInt( id);
      } else {
        throw constraintViolation;
      }
    }
    get name() {
      return this._name;
    }

    static async checkName(t) {
      if (!t) {
        return new MandatoryValueConstraintViolation("A title must be provided!");
      } else if (!isNonEmptyString(t)) {
        return new RangeConstraintViolation("The title must be a non-empty string!");
      } else {
        return new NoConstraintViolation();
      }
    }
    set name(t) {
      var validationResult = Person.checkName(t);
      if (validationResult instanceof NoConstraintViolation) {
        this._name = t;
      } else {
        throw validationResult;
      }
    }
    get birth() {
      return this._birth;
    }
    static async checkBirth(rd) {
      const BIRTH_DATE_MIN = new Date("1895-12-28");
      const BIRTH_DATE_MAX = new Date("2014-01-01");
      if (!rd || rd === "") return new MandatoryValueConstraintViolation(
          "A value for the birth date must be provided!"
      );
      else {
        if (new Date(rd) < BIRTH_DATE_MIN) {
          return new IntervalConstraintViolation(
              `The value of birth date must be greater than or equal to 
              ${createIsoDateString(BIRTH_DATE_MIN)}!`);
        } else if (new Date(rd) > BIRTH_DATE_MAX) {
          return new IntervalConstraintViolation(
              `The value of birth date must be less than
              ${createIsoDateString(BIRTH_DATE_MIN)}!`);
        } else {
          return new NoConstraintViolation();
        }
      }
    }
    set birth( rd) {
      const validationResult = Person.checkBirth( rd);
      if (validationResult instanceof NoConstraintViolation) {
        this._birth = new Date( rd);
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
      birth: parseInt( person.birth ),
      gender: person.gender
    };
    return data;
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data( options);
    return new Person( data);
  }
};

Person.add = async function (slots) {
  let person = null;
  try {
    // validate data by creating Book instance
    person = new Person( slots);
    // invoke asynchronous ID/uniqueness check
    let validationResult = await Person.checkPersonIdAsId( person.personId);
    if (!validationResult instanceof NoConstraintViolation) throw validationResult;
  } catch (e) {
    console.error(`${e.constructor.name}: ${e.message}`);
    person = null;
  }
  if (person) {
    try {
      const personDocRef = fsDoc( fsDb, "persons", person.personId).withConverter( Person.converter);
      await setDoc( personDocRef, person);
      console.log(`Person record "${person.personId}" created!`);
    } catch (e) {
      console.error(`${e.constructor.name}: ${e.message} + ${e}`);
    }
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
  let noConstraintViolated = true,
      validationResult = null,
      personBeforeUpdate = null;
  const personDocRef = fsDoc( fsDb, "persons", slots.personId).withConverter( Person.converter),
      updatedSlots = {};
  try {
    // retrieve up-to-date person record
    const personDocSn = await getDoc( personDocRef);
    personBeforeUpdate = personDocSn.data();
  } catch (e) {
    console.error(`${e.constructor.name}: ${e.message}`);
  }
  try {
    if (personBeforeUpdate.personName !== slots.personName) {
      validationResult = Person.checkName( slots.personName);
      if (validationResult instanceof NoConstraintViolation) updatedSlots.personName = slots.personName;
      else throw validationResult;
    }
    if (personBeforeUpdate.birth !== parseInt( slots.birth)) {
      validationResult = Person.checkBirth( slots.birth);
      if (validationResult instanceof NoConstraintViolation) updatedSlots.birth = parseInt( slots.birth);
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
      console.log(`Property(ies) "${updatedProperties.toString()}" modified for person record "${slots.isbn}"`);
    } else {
      console.log(`No property value changed for person record "${slots.isbn}"!`);
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
    try {
      console.log("Generating test data...");
      const response = await fetch( "public/js/test-data/persons.json");
      const personRecs = await response.json();
      await Promise.all( personRecs.map( d => Person.add( d)));
      console.log(`${personRecs.length} persons saved.`);
    } catch (e) {
      console.error(`${e.constructor.name}: ${e.message}`);
    }
  };

  Person.clearData = async function () {
    if (confirm("Do you really want to delete all book records?")) {
      try {
        console.log("Clearing test data...");
        const personsCollRef = fsColl( fsDb, "person");
        const personsQrySn = (await getDocs( personsCollRef));
        await Promise.all( personsQrySn.docs.map( d => Person.destroy( d.id)))
        console.log(`${personsQrySn.docs.length} books deleted.`);
      } catch (e) {
        console.error(`${e.constructor.name}: ${e.message}`);
      }
    }
  };
  
  export default Person;
  export { GenderEL };