document.addEventListener("DOMContentLoaded", function () {

});


const loginForm = getId("loginForm");
const loginEmailAddress = getId("loginEmailAddress");
const loginPassword = getId("loginPassword");
const loginButton = getId("loginButton");

loginButton.addEventListener("click", async function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    clearValidationMessages();

    if (!validateFields(loginEmailAddress, loginPassword)) return;

    const credentials = {
        emailAddressInput: loginEmailAddress.value.trim(),
        passwordInput: loginPassword.value.trim(),
    };

    await loginUser(credentials);
});

function validateFields(email, password) {
    let isValid = true;

    if (email.value.trim() === "") {
        showValidationMessage(email, "Email Address is required.");
        isValid = false;
    }

    if (password.value.trim() === "") {
        showValidationMessage(password, "Password is required.");
        isValid = false;
    }

    return isValid;
}

function showValidationMessage(inputElement, message) {
    const errorElement = document.createElement("small");
    errorElement.className = "text-danger validation-message";
    errorElement.textContent = message;
    inputElement.parentNode.appendChild(errorElement);
}

function clearValidationMessages() {
    document.querySelectorAll(".validation-message").forEach(msg => msg.remove());
}

async function loginUser(credentials) {
    try {
        const response = await fetch(`${baseUrl}api/post/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }

        alert("Login successful!");
        window.location.href = "/library"; // Redirect after successful login
    } catch (error) {
        alert("Login failed!");
    }
}

function showServerError(message) {
    const errorContainer = document.createElement("div");
    errorContainer.className = "text-danger validation-message";
    errorContainer.textContent = message;
    loginForm.prepend(errorContainer);
}