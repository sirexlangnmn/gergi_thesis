// const adminNav = document.getElementById("admin-navigation");

//     if (adminNav) {
//         const stickyDiv = document.createElement("div");
//         stickyDiv.className = "sticky-top";

//         const shopAccountDiv = document.createElement("div");
//         shopAccountDiv.className = "shop-account";

//         const ul = document.createElement("ul");
//         ul.className = "account-list";

//         const menuItems = [
//             // { href: "my-profile.html", icon: "far fa-user", text: "Profile" },
//             // { href: "services.html", icon: "far fa-bell", text: "Services" },
//             // { href: "help-desk.html", icon: "far fa-id-card", text: "Help Desk" },
//             // { href: "privacy-policy.html", icon: "fa fa-key", text: "Privacy Policy" },
//             // { href: "shop-login.html", icon: "fas fa-sign-out-alt", text: "Log Out" }
//             { href: "/web-scrape", icon: "flaticon-shopping-cart-1", text: "Web Scrape" },
//             { href: "upload-resources", icon: "far fa-heart", text: "Upload Resources" },
//             { href: "/users", icon: "fa fa-briefcase", text: "Users", active: true },
//         ];

//         menuItems.forEach(item => {
//             const li = document.createElement("li");
//             const a = document.createElement("a");
//             a.href = item.href;
//             if (item.active) a.classList.add("active");

//             const i = document.createElement("i");
//             i.className = item.icon;
//             i.setAttribute("aria-hidden", "true");

//             const span = document.createElement("span");
//             span.textContent = item.text;

//             a.appendChild(i);
//             a.appendChild(span);
//             li.appendChild(a);
//             ul.appendChild(li);
//         });

//         shopAccountDiv.appendChild(ul);
//         stickyDiv.appendChild(shopAccountDiv);
//         adminNav.appendChild(stickyDiv);
//     }







const adminNav = document.getElementById("admin-navigation");

    if (adminNav) {
        const stickyDiv = document.createElement("div");
        stickyDiv.className = "sticky-top";

        const shopAccountDiv = document.createElement("div");
        shopAccountDiv.className = "shop-account";

        const ul = document.createElement("ul");
        ul.className = "account-list";

        // Get the current page URL path
        const currentPath = window.location.pathname;

        const menuItems = [
            { href: "/web-scraping", icon: "flaticon-shopping-cart-1", text: "Web Scraping" },
            { href: "/upload-resources", icon: "far fa-heart", text: "Upload Resources" },
            { href: "/resources-setup", icon: "far fa-heart", text: "Resources Setup" },
            { href: "/users", icon: "fa fa-briefcase", text: "Users" }
        ];

        menuItems.forEach(item => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = item.href;

            // Check if the current page matches the menu item and add the 'active' class
            if (currentPath.includes(item.href)) {
                a.classList.add("active");
            }

            const i = document.createElement("i");
            i.className = item.icon;
            i.setAttribute("aria-hidden", "true");

            const span = document.createElement("span");
            span.textContent = item.text;

            a.appendChild(i);
            a.appendChild(span);
            li.appendChild(a);
            ul.appendChild(li);
        });

        shopAccountDiv.appendChild(ul);
        stickyDiv.appendChild(shopAccountDiv);
        adminNav.appendChild(stickyDiv);
    }