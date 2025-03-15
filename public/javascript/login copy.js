document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login");
    const fields = {
        email: form.querySelector("input[type='email']"),
        password: form.querySelector("input[type='password']")
    };
    const loginButton = form.querySelector("button");

    loginButton.addEventListener("click", async function (event) {
        event.preventDefault(); // Prevent form submission
        clearValidationMessages();

        if (!validateFields(fields)) return;

        const credentials = {
            emailAddressInput: fields.email.value.trim(),
            passwordInput: fields.password.value.trim()
        };

        await loginUser(credentials);
    });

    function validateFields(fields) {
        let isValid = true;
        Object.entries(fields).forEach(([key, input]) => {
            if (input.value.trim() === "") {
                showValidationMessage(input, `${capitalize(key)} is required.`);
                isValid = false;
            }
        });
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

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
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
            window.location.href = "/library"; // Redirect to dashboard after successful login
        } catch (error) {
            showServerError(error.message);
        }
    }
});
