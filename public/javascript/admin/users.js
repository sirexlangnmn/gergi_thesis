document.addEventListener("DOMContentLoaded", () => {
    fetchAndPopulateUsers();
});

async function fetchAndPopulateUsers() {
    try {
        const users = await fetchUsers();
        populateTable(users);
    } catch (error) {
        console.error('Error fetching or displaying users:', error);
    }
}

async function fetchUsers() {
    try {
        const response = await fetch(`${baseUrl}api/v1/get/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

function populateTable(users) {
    const tableBody = document.getElementById("usersTable");

    users.forEach(user => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.mobile_number}</td>
            <td>${user.email}</td>
            <td>${user.user_type ?? "N/A"}</td>
            <td>${user.organization_id ? user.organization_id : "N/A"}</td>
            <td class="product-item-close">
                <a href="javascript:void(0);" class="edit-btn" data-user='${JSON.stringify(user)}'>
                    <img src="https://cdn-icons-png.flaticon.com/128/9283/9283120.png"
                         loading="lazy"
                         alt="Edit"
                         title="Edit"
                         width="32"
                         height="32">
                </a>
            </td>
        `;

        tableBody.appendChild(row);
    });
    attachEditEventListeners();
}


function attachEditEventListeners() {
    document.querySelectorAll(".edit-btn").forEach((button) => {
        button.addEventListener("click", handleEditClick);
    });
}

function handleEditClick(event) {
    const button = event.currentTarget;
    const userData = JSON.parse(button.getAttribute("data-user"));
    console.log("Selected User Data:", userData);

    modal.style.display = "block";
}