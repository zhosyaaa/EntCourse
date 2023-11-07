function validateForm(event) {
    var contactName = document.getElementById("contactName");
    var contactSurname = document.getElementById("contactSurname");
    var contactNumber = document.getElementById("contactNumber");
    var contactEmail = document.getElementById("contactEmail");
    var contactMessage = document.getElementById("contactMessage");

    if (!/^[A-Za-z]+$/.test(contactName.value)) {
        alert("Өтінемін, Атыңызды тек әріптерден тұратын сөздермен жазыңыз!");
        event.preventDefault();
        return;
    }

    if (!/^[A-Za-z]+$/.test(contactSurname.value)) {
        alert("Өтінемін, Жөніңізді тек әріптерден тұратын сөздермен жазыңыз!");
        event.preventDefault();
        return;
    }

    if (!/^\d+$/.test(contactNumber.value)) {
        alert("Өтінемін, номеріңіз тек сандардан тұруы керек!");
        event.preventDefault();
        return;
    }

    if (contactEmail.value.trim() === "") {
        alert("Өтінемін, почтаңызды жазыңыз!");
        event.preventDefault();
        return;
    } else if (!isValidEmail(contactEmail.value)) {
        alert("Өтінемін, дұрыс пошта мекенжайын енгізіңіз!");
        event.preventDefault();
        return;
    }

    if (contactMessage.value.trim() === "") {
        alert("Өтінемін, таңдау пәндерді жазыңыз!");
        event.preventDefault();
        return;
    }
}

function isValidEmail(email) {
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}

var form = document.querySelector(".contactForm");

form.addEventListener("submit", validateForm);

// Real-time validation
document.getElementById("contactName").addEventListener("input", function () {
    if (!/^[A-Za-z]+$/.test(this.value)) {
        alert("Өтінемін, Атыңызды тек әріптерден тұратын сөздермен жазыңыз!");
    }
});

document.getElementById("contactSurname").addEventListener("input", function () {
    if (!/^[A-Za-z]+$/.test(this.value)) {
        alert("Өтінемін, Жөніңізді тек әріптерден тұратын сөздермен жазыңыз!");
    }
});

document.getElementById("contactNumber").addEventListener("input", function () {
    if (!/^\d+$/.test(this.value)) {
        alert("Өтінемін, номеріңіз тек сандардан тұруы керек!");
    }
});

document.getElementById("contactEmail").addEventListener("input", function () {
    if (this.value.trim() === "") {
        alert("Өтінемін, почтаңызды жазыңыз!");
    } else if (!isValidEmail(this.value)) {
        alert("Өтінемін, дұрыс пошта мекенжайын енгізіңіз!");
    }
});

document.getElementById("contactMessage").addEventListener("input", function () {
    if (this.value.trim() === "") {
        alert("Өтінемін, таңдау пәндерді жазыңыз!");
    }
});