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

const validateForm = () => {
  const isComplaintLongEnough = /^.{20}/.test(complaintDescription.value);
  const isComplaintOtherChecked = [...checkboxes][3].checked;
  const isComplaintSomeChecked = [...checkboxes].some(check => check.checked);
  const isSolutionLongEnough = /^.{20}/.test(solutionDescription.value);
  const isSolutionOtherChecked = [...radio][2].checked;
  const isSolutionSomeChecked = [...radio].some(radio => radio.checked);
  const isNameValid = fullName.value !== "";
  const isEmailValid = /^(?:.+?)@(?:.+?)\.[a-z]{2,3}$/i.test(email.value);
  const isOrderNoValid = /^2024\d{6}$/.test(orderNo.value);
  const isCodeValid = /^[a-z]{2}\d{2}-[a-z]\d{3}-[a-z]{2}\d$/i.test(
    productCode.value
  );

  const toValidate = {
    "full-name": isNameValid,
    email: isEmailValid,
    "order-no": isOrderNoValid,
    "product-code": isCodeValid,
    quantity: Number(quantity.value) > 0,
    "complaints-group": isComplaintSomeChecked,
    "complaint-description":
      (isComplaintLongEnough && isComplaintOtherChecked) ||
      (isComplaintSomeChecked && !otherComplaint.checked),
    "solutions-group": isSolutionSomeChecked,
    "solution-description":
      (isSolutionLongEnough && isSolutionOtherChecked) ||
      (isSolutionSomeChecked && !otherSolution.checked),
  };
  return toValidate;
};

form.addEventListener("change", event => {
  const object = validateForm();
  event.target.style.borderColor = object[event.target.id] ? "green" : "red";
});

// sets the border color of the choice groups
const getChecked = (
  nodeList,
  target,
  validColor = "green",
  invalidColor = "red"
) => {
  target.style.borderColor = [...nodeList].some(choice => choice.checked)
    ? validColor
    : invalidColor;
};

complaintsGroup.addEventListener("change", () =>
  getChecked(checkboxes, complaintsGroup)
);

solutionsGroup.addEventListener("change", () =>
  getChecked(radio, solutionsGroup)
);

const isValid = object => Object.values(object).every(Boolean);

form.addEventListener("submit", e => {
  e.preventDefault();
  isValid(validateForm());
});
