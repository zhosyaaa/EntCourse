function validateForm(event) {
    event.preventDefault(); // Предотвращаем отправку формы

    // Получаем ссылки на обязательные поля
    var contactName = document.getElementById("contactName");
    var contactSurname = document.getElementById("contactSurname");
    var contactNumber = document.getElementById("contactNumber");
    var contactEmail = document.getElementById("contactEmail");
    var contactMessage = document.getElementById("contactMessage");

    // Проверка обязательных полей
    if (contactName.value.trim() === "") {
        alert("Өтінемін, Атыңызды жазыңыз!");
        return;
    }
    
    if (contactSurname.value.trim() === "") {
        alert("Өтінемін, Жөніңізді жазыңыз!");
        return;
    }
    
    if (contactNumber.value.trim() === "") {
        alert("Өтінемін, номеріңізді жазыңыз!");
        return;
    }
    
    if (contactEmail.value.trim() === "") {
        alert("Өтінемін, почтаңызды жазыңыз!");
        return;
    }
    
    if (contactMessage.value.trim() === "") {
        alert("Өтінемін, таңдау пәндерді жазыңыз!");
        return;
    }
    
    // Если все поля заполнены, можно отправить форму
    document.querySelector(".contactForm").submit();
}

// Назначаем функцию validateForm на событие отправки формы
document.querySelector(".contactForm").addEventListener("submit", validateForm);