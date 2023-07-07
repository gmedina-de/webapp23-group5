 import { auth } from "../initFirebase.mjs";
 import { sendPasswordResetEmail }
   from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";

 const formEl = document.forms["Password"],
   resetBtn = formEl["commit"];

 resetBtn.addEventListener("click", async function () {
   const email = formEl["email"].value;
   if (email) {
     try {
       // send a password reset email
       await sendPasswordResetEmail( auth, email);
       alert(`Check your email "${email}" and confirm this request to create a new password.`);
       window.location.pathname = "/index.html"; // redirect user to start page
     } catch (e) {
       const spanMsgEl = document.getElementById("message");
       spanMsgEl.textContent = e.message;
       spanMsgEl.hidden = false;
     }
   }
 });