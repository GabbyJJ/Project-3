let name = document.getElementById("name");
name.focus();

var jobRole = document.getElementById("title");
var otherJobRole = document.getElementById("other-job-role");

otherJobRole.style.display = "none";

//when the "Other" option is selected/deselected from "Job Role" menu, the "Other job role" field should be visible/hidden on the page.
jobRole.addEventListener("change", (e) => {
  if (e.target.value === "other") {
    otherJobRole.style.display = "block";
  } else {
    otherJobRole.style.display = "none";
  }
});

var design = document.querySelector("#design");
var color = document.querySelector("#color");
var shirtColor = document.querySelector("#shirt-colors");
shirtColor.hidden = true;

//To prevent users from selecting an invalid color for a particular theme, the "Color" menu should be disabled by default.

design.addEventListener("change", (event) => {
  var design = event.target.value;
  shirtColor.hidden = false;

  for (var i = 0; i < color.options.length; i++) {
    if (design === color.options[i].getAttribute("data-theme")) {
      color.options[i].hidden = false;
      color.options[i].disabled = false;
    } else {
      color.options[i].hidden = true;
      color.options[i].disabled = true;
    }
  }
});
var registerForActivities = document.querySelector("#activities");
var total = document.querySelector("#activities-cost");
var totalcostofactivites = 0;
var registerForActivitiesBox = document.querySelector("#activities-box");

registerForActivities.addEventListener("change", (event) => {
  var dataCost = event.target.getAttribute("data-cost");
  dataCost = +dataCost;

  if (event.target.checked) {
    totalcostofactivites = totalcostofactivites + dataCost;
  } else {
    totalcostofactivites = totalcostofactivites - dataCost;
  }

  total.innerHTML = `Total: $${totalcostofactivites}`;
});

var payment = document.querySelector("#payment");
var cardPayment = document.querySelector("#credit-card");
var paypalPayment = document.querySelector("#paypal");
var bitcoinPayment = document.querySelector("#bitcoin");

paypalPayment.style.display = "none";
bitcoinPayment.style.display = "none";

var secondChildElement = payment.children[1];

secondChildElement.setAttribute("selected", "selected");

//The preferred or most common payment method option should be selected and the corresponding payment form sections should be displayed by default, while the other payment form sections should be hidden.

payment.addEventListener("change", (event) => {
  if (event.target.value === "credit-card") {
    paypalPayment.style.display = "none";
    bitcoinPayment.style.display = "none";
    cardPayment.style.display = "block";
  } else if (event.target.value === "bitcoin") {
    bitcoinPayment.style.display = "block";
    paypalPayment.style.display = "none";
    cardPayment.style.display = "none";
  } else if (event.target.value === "paypal") {
    paypalPayment.style.display = "block";
    bitcoinPayment.style.display = "none";
    cardPayment.style.display = "none";
  }
});

var emailAddress = document.querySelector("#email");
var cardNumber = document.querySelector("#cc-num");
var zip = document.querySelector("#zip");
var cvvCode = document.querySelector("#cvv");
var form = document.querySelector("form");
var activities = registerForActivitiesBox.getElementsByTagName("input");

form.addEventListener("submit", (event) => {
  var nameValue = name.value;
  var nameTest = /^[a-zA-Z,.-]+$/i.test(nameValue);

  var cvvValue = cvvCode.value;
  var cvvTest = /^\d{3}$/.test(cvvValue);

  var zipCodeValue = zip.value;
  var zipCodeTest = /^\d{5}$/.test(zipCodeValue);

  var cardNumberValue = cardNumber.value;
  var cardNumberTest = /^\b\d{13,16}\b$/.test(cardNumberValue);

  var emailValue = emailAddress.value;
  var emailTest = /^[a-zA-Z0-9, !#$%&'*+/=?^_`{|}~]+@[a-zA-Z0-9-]+(?:|.[a-zA-Z0-9]+)$/i.test(
    emailValue
  );

  if (name.value !== "") {
    validInput(name);
  } else {
    event.preventDefault();
    invalidInput(name);
  }
  //This will count the number of activites you have checked
  var numberChecked = 0;

  for (let i = 0; i < activities.length; i++) {
    if (activities[i].checked === true) {
      numberChecked += 1;
    }
  }
  // This will check if each field has been entered correctly, if it is not then it will display a red highlight and display a message.
  if (numberChecked === 0) {
    event.preventDefault();
    invalidInput(registerForActivitiesBox);
  } else {
    validInput(registerForActivitiesBox);
  }
  var emailErrorSpan = document.querySelector("#email-hint");

  if (emailTest) {
    validInput(emailAddress);
  } else {
    event.preventDefault();
    invalidInput(emailAddress);
  }

  if (secondChildElement.selected === true) {
    if (cardNumberTest) {
      validInput(cardNumber);
    } else {
      event.preventDefault();
      invalidInput(cardNumber);
    }

    if (zipCodeTest) {
      validInput(zip);
    } else {
      event.preventDefault();
      invalidInput(zip);
    }

    if (cvvTest) {
      validInput(cvvCode);
    } else {
      event.preventDefault();
      invalidInput(cvvCode);
    }
  }
});

//This adds form input validation error indications that can be perceived by all users.

function validInput(element) {
  element.parentElement.classList.remove("not-valid");
  element.parentElement.classList.add("valid");
  element.parentElement.lastElementChild.style.display = "none";
}
function invalidInput(element) {
  element.parentElement.classList.add("not-valid");
  element.parentElement.classList.remove("valid");
  element.parentElement.lastElementChild.style.display = "block";
}

//This focuses what you are working on
for (var i = 0; i < activities.length; i++) {
  activities[i].addEventListener("focus", (event) => {
    event.target.parentNode.classList.add("focus");
  });
  //This blurs what you are not working on

  activities[i].addEventListener("blur", (event) => {
    event.target.parentNode.classList.remove("focus");
  });
}
