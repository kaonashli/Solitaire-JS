const MONTHARR = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const fields = ['firstName', 'lastName', 'username', 'phoneNum', 'pCode', 'bankRoll', 'lastVisit'];

$("#myForm").validate({
    rules: {
        firstName: {
            required: true,
            pattern: /^[a-zA-Z][a-zA-Z \-']{1,20}$/

        },
        lastName: {
            required: true,
            pattern: /^[a-zA-Z][a-zA-Z \-']{1,30}$/

        },
        username: {
            required: true,
            pattern: /^[a-z]\d{3}[A-B]$/

        },
        phoneNumber: {
            required: true,
            pattern: /(^\d{3}\.\d{3}\.\d{4})$|(^\(\d{3}\) \d{3}\-\d{4})$/

        },
        postalCode: {
            required: true,
            pattern: /^[a-zA-Z]\d[a-zA-Z] \d[a-zA-Z]\d$/

        },
        email: {
            required: true,
            pattern: /^[a-zA-Z\d_\-.]*@[a-zA-Z\d]*\.(com|ca|org)$/
        },
        amount: {
            required: true,
            pattern: /^\d*$/,
            min: 5,
            max: 5000

        }

    },
    messages: {
        firstName: {
            required: "Please enter your name.",
            pattern: "This name may have certain characters that aren't allowed. Please enter your first name."

        },
        lastName: {
            required: "Please enter your last name.",
            pattern: "This name may have certain characters that aren't allowed. Please enter your last name."

        },
        username: {
            required: "Please enter your username.",
            pattern: "Username must start with a lower case letter, followed by three digits and either an uppercase A or B."

        },
        phoneNumber: {
            required: "Please enter your phone number.",
            pattern: "Phone numbers must be in the format: (###) ###-#### or ###.###.####"

        },
        postalCode: {
            required: "Please enter your postal code.",
            pattern: "Postal codes must be in the format: A0A 0A0"

        },
        email: {
            required: "Please enter your email.",
            pattern: "You have entered an incorrect email address."

        },
        amount: {
            required: "Please enter your starting amount.",
            pattern: "Please enter an amount between $5 to $5000. Please do not include any cents.",
            min: "Please enter an amount between $5 to $5000. Please do not include any cents.",
            max: "Please enter an amount between $5 to $5000. Please do not include any cents."
        }
    },
    errorPlacement: function (err, el) {
        $(`.${el.attr("id")}-error`).html(err);
    }

});

let now = new Date();
let month = MONTHARR[now.getMonth()];
let day = now.getDate();
let year = now.getFullYear();
let hour = now.getHours();
let min = now.getMinutes();
let currentVisit = `${month} ${day}, ${year} at ${hour < 13? hour : hour-12}:${min < 10 ? "0"+min : min} ${hour<12? "AM" : "PM"}`;

let setLocalStorage = function(){
    localStorage.setItem("currentVisit", currentVisit);
    localStorage.setItem("lastVisit", currentVisit);
    if ($('#firstName').val().length > 0) {
        localStorage.setItem("firstName", $('#firstName').val());
    }
    if ($('#lastName').val().length > 0) {
        localStorage.setItem("lastName", $('#lastName').val());
    }
    if ($("#username").val().length > 0) {
        localStorage.setItem("username", $("#username").val());
    }
    if ($("#phoneNumber").val().length > 0) {
        localStorage.setItem("phoneNum", $("#phoneNumber").val());
    }
    if ($("#postalCode").val().length > 0) {
        localStorage.setItem("pCode", $("#postalCode").val());
    }
    if ($("#email").val().length > 0) {
        localStorage.setItem("email", $("#email").val());
    }
    if ($("#amount").val().length > 0) {
        localStorage.setItem("bankRoll", $("#amount").val());
    }
};

let checkKeys = function (f) {
    let stop = false;
    let key;
    for (let x = 0; x < localStorage.length && stop === false; x++) {
        key = localStorage.key(x);
        if (key === f)
            stop = true;
    }
    return key === f;
};

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
};

let elForm = document.querySelector("#myForm");
elForm.addEventListener("submit", setLocalStorage, false);


if (checkLocalStorage())
    location.href = "game.html";