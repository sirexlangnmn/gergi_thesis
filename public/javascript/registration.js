document.addEventListener("DOMContentLoaded", function () {

});


const registrationForm = getId("registrationForm");
const registrationFullname = getId("registrationFullname");
const registrationMobileNumber = getId("registrationMobileNumber");
const registrationEmailAddress = getId("registrationEmailAddress");
const registrationPassword = getId("registrationPassword");
const registrationButton = getId("registrationButton");

registrationButton.addEventListener("click", async function (event) {
    event.preventDefault(); // Prevent form from refreshing
    clearValidationMessages();

    if (!validateFields(registrationFullname, registrationMobileNumber, registrationEmailAddress, registrationPassword)) return;

    const userData = {
        fullNameInput: registrationFullname.value.trim(),
        mobileNumberInput: registrationMobileNumber.value.trim(),
        emailAddressInput: registrationEmailAddress.value.trim(),
        passwordInput: registrationPassword.value.trim(),
    };

    await registerUser(userData);
});

function validateFields(fullName, mobileNumber, email, password) {
    let isValid = true;

    if (fullName.value.trim() === "") {
        showValidationMessage(fullName, "Fullname is required.");
        isValid = false;
    }

    if (mobileNumber.value.trim() === "") {
        showValidationMessage(mobileNumber, "Mobile Number is required.");
        isValid = false;
    }

    if (email.value.trim() === "") {
        showValidationMessage(email, "Email Address is required.");
        isValid = false;
    }

    if (password.value.trim() === "") {
        showValidationMessage(password, "Password is required.");
        isValid = false;
    } else if (password.value.length < 6) {
        showValidationMessage(password, "Password must be at least 6 characters.");
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

async function registerUser(userData) {
    try {
        const response = await fetch(`${baseUrl}api/post/registration`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Registration failed");
        }

        alert("Registration successful! Redirecting to login...");
        window.location.href = "/login"; // Redirect after successful registration
    } catch (error) {
        showServerError(error.message);
    }
}

function showServerError(message) {
    const errorContainer = document.createElement("div");
    errorContainer.className = "text-danger validation-message";
    errorContainer.textContent = message;
    registrationForm.prepend(errorContainer);
}