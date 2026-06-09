const form = document.querySelector("#form");
const fullName = document.getElementById("full-name");
const email = document.getElementById("email");
const orderNo = document.getElementById("order-no");
const productCode = document.getElementById("product-code");
const quantity = document.getElementById("quantity");
const complaintsGroup = document.querySelector("#complaints-group");
const checkboxes = document.querySelectorAll('[type="checkbox"]');
const otherComplaint = document.getElementById("other-complaint");
const complaintDescription = document.getElementById("complaint-description");
const solutionsGroup = document.querySelector("#solutions-group");
const radio = document.querySelectorAll('[type="radio"]');
const otherSolution = document.getElementById("other-solution");
const solutionDescription = document.getElementById("solution-description");
const submitBtn = document.getElementById("submit-btn");

const description = document.querySelectorAll("textarea");

let validateObject = {};

function validateForm() {
  validateObject = {
    "full-name": fullName.value !== "",
    email: /^([a-zA-Z0-9._-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})$/.test(
      email.value
    ),
    "order-no": /^2024\d{6}$/.test(orderNo.value),
    "product-code": /^[a-zA-Z]{2}\d{2}-[a-zA-Z]\d{3}-[a-zA-Z]{2}\d$/.test(
      productCode.value
    ),
    quantity: quantity.value > 0,

    "complaints-group": [...checkboxes].some(checkbox => checkbox.checked),
    "complaint-description":
      otherComplaint.checked === false ||
      (otherComplaint.checked && /.{20}/.test(complaintDescription.value)),
    "solutions-group": Array.from(radio).some(radio => radio.checked),
    "solution-description":
      otherSolution.checked === false ||
      (otherSolution.checked && /.{20}/.test(solutionDescription.value)),
  };
  console.log(validateObject);
  return validateObject;
}

// added just to test validity methods
email.addEventListener("change", e => {
  if (!e.target.checkValidity()) {
    e.target.reportValidity();
    console.log(e.target.validity);
    console.log(e.target);
  }
});

function isValid(validateForm) {
  return Object.values(validateForm).every(value => value === true);
}

form.addEventListener("submit", e => {
  e.preventDefault(); //prevents the form's submission
  alert('Submit event prevented by "e.preventDefault"')
  const object = validateForm();
  isValid(object);
  console.log(isValid(object));
});

form.addEventListener("change", event => {
  const object = validateForm();
  const inputsAndTextareas = event.target.id;
  object[inputsAndTextareas]
    ? (event.target.style.borderColor = "green")
    : (event.target.style.borderColor = "red");
});

checkboxes.forEach(checkbox => {
  checkbox.addEventListener("change", () => {
    const someChecked = Array.from(checkboxes).some(cb => cb.checked);
    complaintsGroup.style.borderColor = someChecked ? "green" : "red";
  });
});

radio.forEach(rad => {
  rad.addEventListener("change", () => {
    const check = Array.from(radio).some(rad => rad.checked);
    solutionsGroup.style.borderColor = check ? "green" : "red";
  });
});
