let $$ = select => document.querySelector(select);
let elFirstName = $$("#firstName");
let elLastName = $$("#lastName");
let elUsername = $$("#username");
let elPhone = $$("#phoneNumber");
let elPostalCode = $$("#postalCode");
let elEmail = $$("#email");
let elAmount = $$("#amount");
const MONTHARR = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const fields = ['firstName', 'lastName', 'username', 'phoneNum', 'pCode', 'bankRoll', 'lastVisit'];
let checkFirstName = function () {
    let valid = false;
    let elMsg = $$("#fNameMsg");
    let namePattern = /^[a-zA-Z][a-zA-Z \-']{1,20}$/;
    if (!(namePattern.test(elFirstName.value))) {
        elMsg.textContent = "This name may have certain characters that aren't allowed. Please enter your first name.";
        elMsg.style.color = "red";
        elFirstName.style.border = "2px solid red";
        valid = false;
    } else {
        elMsg.textContent = "";
        elFirstName.style.border = "";
        valid = true;
    }
    return valid;
};

let checkLastName = function () {

    let elMsg = $$("#lNameMsg");
    let namePattern = /^[a-zA-Z][a-zA-Z \-']{1,30}$/;
    if (!(namePattern.test(elLastName.value))) {
        elMsg.textContent = "This name may have certain characters that aren't allowed. Please enter your last name.";
        elMsg.style.color = "red";
        elLastName.style.border = "2px solid red";
    } else {
        elMsg.textContent = "";
        elLastName.style.border = "";
        valid = true;
    }
    return valid;
};

let checkUsername = function () {
    let valid = false;
    elMsg = $$("#userMsg");

    let userPattern = /^[a-z]\d{3}[A-B]$/;
    if (!(userPattern.test(elUsername.value))) {
        elMsg.textContent = "Username must start with a lower case letter, followed by three digits and either an uppercase A or B.";
        elMsg.style.color = "red";
        elUsername.style.border = "2px solid red";
        valid = false;
    } else {
        elMsg.textContent = "";
        elUsername.style.border = "";
        valid = true;
    }
    return valid;
};

let checkPhoneNumber = function () {
    let valid = false;
    elMsg = $$("#phoneMsg");

    let phonePattern = /(^\d{3}\.\d{3}\.\d{4})$|(^\(\d{3}\) \d{3}\-\d{4})$/;
    if (!(phonePattern.test(elPhone.value))) {
        elMsg.textContent = "It looks like you may have entered an incorrect phone number. Phone numbers must be in the format: (###) ###-#### or ###.###.####";
        elMsg.style.color = "red";
        elPhone.style.border = "2px solid red";
        valid = false;
    } else {
        elMsg.textContent = "";
        elPhone.style.border = "";
        valid = true;
    }
    return valid;
};

let checkPostalCode = function () {
    let valid = false;
    elMsg = $$("#postalMsg");

    let postalCodePattern = /^[a-zA-Z]\d[a-zA-Z] \d[a-zA-Z]\d$/;
    if (!(postalCodePattern.test(elPostalCode.value))) {
        elMsg.textContent = "It looks like you may have entered an incorrect postal code. Make sure the postal code is in the format: A0A 0A0";
        elMsg.style.color = "red";
        elPostalCode.style.border = "2px solid red";
        valid = false;
    } else {
        elMsg.textContent = "";
        elPostalCode.style.border = "";
        valid = true;
    }
    return valid;
};

let checkEmailAddress = function () {
    let valid = false;
    let elMsg = $$("#emailMsg");

    let emailPattern = /^[a-zA-Z\d_\-.]*@[a-zA-Z\d]*\.(com|ca|org)$/;
    if (!(emailPattern.test(elEmail.value))) {
        elMsg.textContent = "You may have entered an incorrect email address. Please correct it then press play!";
        elMsg.style.color = "red";
        elEmail.style.border = "2px solid red";
        valid = false;
    } else {
        elMsg.textContent = "";
        elEmail.style.border = "";
        valid = true;
    }
    return valid;
};

let checkAmount = function () {
    let valid = false;
    let elMsg = $$("#amountMsg");

    let amountPattern = /^\d*$/;
    if ((elAmount.value < 5 || elAmount.value > 5000) || (!(amountPattern.test(elAmount.value)))) {
        elMsg.textContent = "Please enter an amount between $52 to $5000. Please do not include any cents.";
        elMsg.style.color = "red";
        elAmount.style.border = "2px solid red";
        valid = false;
    } else {
        elMsg.textContent = "";
        elAmount.style.border = "";
        valid = true;
    }
    return valid;
};

elFirstName.addEventListener("change", checkFirstName, false);
elLastName.addEventListener("change", checkLastName, false);
elUsername.addEventListener("change", checkUsername, false);
elPhone.addEventListener("change", checkPhoneNumber, false);
elPostalCode.addEventListener("change", checkPostalCode, false);
elEmail.addEventListener("change", checkEmailAddress, false);
elAmount.addEventListener("change", checkAmount, false);




let validateForm = function (ev) {
    localStorage.setItem("currentVisit", currentVisit);
    localStorage.setItem("lastVisit", currentVisit);
    if (elFirstName.value.length > 0 && checkFirstName()) {
        localStorage.setItem("firstName", elFirstName.value);
    } else
        ev.preventDefault();
    if (elLastName.value.length > 0 && checkLastName()) {
        localStorage.setItem("lastName", elLastName.value);
    } else
        ev.preventDefault();
    if (elUsername.value.length > 0 && checkUsername()) {
        localStorage.setItem("username", elUsername.value);
    } else
        ev.preventDefault();
    if (elPhone.value.length > 0 && checkPhoneNumber()) {
        localStorage.setItem("phoneNum", elPhone.value);
    } else
        ev.preventDefault();
    if (elPostalCode.value.length > 0 && checkPostalCode()) {
        localStorage.setItem("pCode", elPostalCode.value.toUpperCase());
    } else
        ev.preventDefault();
    if (elEmail.value.length > 0 && checkEmailAddress()) {
        localStorage.setItem("email", elEmail.value);
    } else
        ev.preventDefault();
    if (elAmount.value.length > 0 && checkAmount()) {
        localStorage.setItem("bankRoll", elAmount.value);
    } else
        ev.preventDefault();
};

let checkKeys = function (f) {
    let stop = false;
    let key
    for (let x = 0; x < localStorage.length && stop === false; x++) {
        key = localStorage.key(x);
        if (key === f)
            stop = true;
    }
    return key === f;
}

let checkLocalStorage = function (ev) {
    if (localStorage.length > 0) {
        if (fields.every(checkKeys)) {
            localStorage.setItem('lastVisit', localStorage.getItem('currentVisit'));
            localStorage.setItem('currentVisit', currentVisit);
        } else
            localStorage.setItem('firstVisit', true);
        return fields.every(checkKeys);
    } else
        localStorage.setItem('firstVisit', true);
}

let elForm = document.querySelector("#myForm");
elForm.addEventListener("submit", validateForm, false);


if (checkLocalStorage())
    location.href = "game.html";