document.addEventListener("DOMContentLoaded", function () {
    const openModalButton = document.getElementById("openModalButton");
    const openModalButton2 = document.getElementById("openModalButton2");
    const userEmailElement = document.getElementById("userEmail");
    const logoutButton = document.getElementById("logoutButton");

    const userEmail = localStorage.getItem("userEmail");

    if (userEmail) {
        userEmailElement.textContent = userEmail;
        userEmailElement.style.display = "block";
        openModalButton.style.display = "none";
        openModalButton2.style.display = "none";
        logoutButton.style.display = "block";
    } else {
        userEmailElement.style.display = "none";
        openModalButton.style.display = "block";
        openModalButton2.style.display = "block";
        logoutButton.style.display = "none";
    }
});

function logout() {
    localStorage.removeItem("userEmail");
    const openModalButton = document.getElementById("openModalButton");
    const openModalButton2 = document.getElementById("openModalButton2");
    const userEmailElement = document.getElementById("userEmail");
    const logoutButton = document.getElementById("logoutButton");

    userEmailElement.style.display = "none";
    openModalButton.style.display = "block";
    openModalButton2.style.display = "block";
    logoutButton.style.display = "none";
}
