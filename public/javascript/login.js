
let loginEmailAddress = getId('LoginEmailAddress');
let loginPassword = getId('LoginPassword');

let loginEmailAddressError = getId('LoginEmailAddressError');
let loginPasswordError = getId('LoginPasswordError');

let loginError  = getId('LoginError');
let loginForm = getId('loginForm');

function validateRegistrationForm() {
    const emailAddressValue = loginEmailAddress.value;
    const passwordValue = loginPassword.value;

    resetErrorMessages();

    let isValid = true;

    if (!emailAddressValue) {
        displayErrorMessage('Please enter an Email Address', loginEmailAddressError);
        isValid = false;
    }

    if (!passwordValue) {
        displayErrorMessage('Please enter a Password', loginPasswordError);
        isValid = false;
    }

    return isValid;
}


function submitLoginForm(event) {
    event.preventDefault();

    if (!validateRegistrationForm()) {
        return;
    }

    const formData = {
        emailAddressInput: loginEmailAddress.value,
        passwordInput: loginPassword.value
    };

    fetch(baseUrl + 'api/post/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (response.status === 401) {
                displayErrorMessage('The email address or password is incorrect', loginError);
                loginError.classList.add("error_message");
            }

            if (!response.ok) {
                throw new Error('The email address or password is incorrect');
            }
            return response.json();
        })
        .then(data => {
            if (data.message === 'Login successful') {
                loginError.classList.remove("error_message");
                displayErrorMessage(null, loginError);
                window.location.href = '/library';
            }
        })
        .catch(error => {
            console.log('Login failed error:', error);
        });
}


loginForm.addEventListener('submit', submitLoginForm);


loginEmailAddress.addEventListener("keyup", function (event) {
    event.target.value
        ? displayErrorMessage(null, loginEmailAddressError)
        : displayErrorMessage('Please enter your Email Address', loginEmailAddressError);
});

loginPassword.addEventListener("keyup", function (event) {
    event.target.value
        ? displayErrorMessage(null, loginPasswordError)
        : displayErrorMessage('Please enter your Password', loginPasswordError);
});