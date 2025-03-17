document.addEventListener("DOMContentLoaded", () => {
    fetchAndPopulateUsers();
    fetchOrganizations();
});

async function fetchAndPopulateUsers() {
    try {
        const users = await fetchUsers();
        populateTable(users);
    } catch (error) {
        console.error('Error fetching or displaying users:', error);
    }
}

let globalOrganizations = [];

async function fetchOrganizations() {
    try {
        const response = await fetch(`${baseUrl}api/v1/get/organizations`);
        if (!response.ok) throw new Error('Failed to fetch organizations');

        globalOrganizations = await response.json();
    } catch (error) {
        console.error("Error fetching organizations:", error);
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
    const tableBody = getId("usersTable");

    users.forEach(user => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.mobile_number}</td>
            <td>${user.email}</td>
            <td>${user.user_type === '1' ? 'Admin' : user.user_type === '2' ? 'Client' : user.user_type === '3' ? 'Student' : ''}</td>
            <td>${user.organization_id ? user.organization_title : "N/A"}</td>
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

async function handleEditClick(event) {
    const button = event.currentTarget;
    const userData = JSON.parse(button.getAttribute("data-user"));

    modal.style.display = "block";

    getId("modalName").value = userData.name || "";
    getId("modalMobile").value = userData.mobile_number || "";
    getId("modalEmail").value = userData.email || "";
    getId("modalType").value = userData.user_type === '1' ? 'Admin' : userData.user_type === '2' ? 'Client' : userData.user_type === '3' ? 'Student' : '';
    getId("modalCreatedAt").value = userData.createdAt || "";
    getId("modalUpdatedAt").value = userData.updatedAt || "";
    populateOrganizationDropdown(userData.organization_id);
}


function populateOrganizationDropdown(selectedOrganizationId) {
    const modalOrganization = getId("modalOrganization");
    modalOrganization.innerHTML = "";


    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Nothing Selected";
    if (!selectedOrganizationId) {
        defaultOption.selected = true;
    }
    modalOrganization.appendChild(defaultOption);

    globalOrganizations.forEach((org, index, array) => {
        const option = document.createElement("option");
        option.value = org.id;
        option.textContent = org.title;
        if (org.id == selectedOrganizationId) {
            option.selected = true;
        }
        modalOrganization.appendChild(option);

        if (index === array.length - 1) {
            modal.style.display = "block";
        }
    });
}
