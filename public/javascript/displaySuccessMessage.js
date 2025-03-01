function showSuccessMessage(message, elementId) {
    // var successDiv = getId(elementId);
    elementId.innerHTML = message;
    elementId.classList.remove("hidden");
    setTimeout(function(){
        elementId.classList.add("hidden");
    }, 3000); // 3000 milliseconds = 3 seconds
}