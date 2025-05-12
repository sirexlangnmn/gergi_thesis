# 🌐 Global E-Library Resource Group, Inc. (GeRGI)

A centralized digital platform that curates and links academic and professional digital resources based on user-specific needs.
This system is designed to simplify access to relevant, legal, and high-quality open-access resources for
students, researchers, professionals, and institutions.

---

## 📌 Project Overview

**GeRGI** (Global E-Library Resource Group, Inc.) serves as a **curated gateway**—not a content host.
It helps users **access legally available, high-quality academic and professional digital resources** by linking directly to original sources.


---


### 👤 Client Side Features

- 🧠 **Personalized Recommendations**
  Tailored resource suggestions based on user profile (course, department, interest).

- 🔎 **Search & Filtering Tools**
  Find resources using keywords, course, department, categories, and subjects.

- 📚 **Bookmarking & Personal Library**
  Save frequently accessed or favorite resources for future use.

- 📩 **Resource Request System**
  Request specific materials that are not currently available in the database.

- ✅ **Legal Resource Linking**
  Platform only links to official sources — no illegal hosting or downloads.


---


### 🛠️ Admin Side Features

- 🌐 **Web Scraping & External Aggregation**
  Search and extract resource links (where legally allowed) from the internet.

- 📁 **File Upload & Metadata Management**
  Upload Excel/CSV files with curated resources from information specialists.

- 🏛️ **Resource Structuring by Organization**
  Organize content by institution, department, course, and subject.

- 🔎 **Advanced Search & Management Tools**
  Locate and manage resources using internal filters and queries.

- 📥 **Monitor User Activity**
  View bookmarked resources and submitted requests from users.

- ✅ **Legal Resource Linking**
  Ensures all content is linked to legitimate, original sources only.


---


## 🛠 Technologies Used

| Area            | Technology                        |
|-----------------|-----------------------------------|
| Frontend        | HTML, Tailwind CSS, JavaScript    |
| Backend         | Node.js, JavaScript               |
| Database        | MariaDB                           |
| API Testing     | Postman                           |
| Authentication  | JSON Web Tokens (JWT), bcrypt     |
| Security        | SSL/TLS Encryption                |
| Server/Hosting  | Nginx, Linode Cloud               |
| Version Control | GitHub                            |


---


## 🛠 User Manual
Client Side:
1. Need to register, after that you will be notify that you are not yet able to login. Because its need to verify first by GeRGI admin.
2. "Library" page. If you are able to login, it will direct you to page where you can see the resources.
    On the left side column, there is a "filter" to get resources under organization, department, course, subject.
    You can search resources by keyword.
3. "Favorites" page. You can save or bookmark the resources as your.
4. "Request" page. If you cant find the resources that you are looking for, you can request.


Admin Side:
1. Me as developer and Master Admin, I will give you Admin login credentials.
2. "Web Scraping" page. If you are able to login, it will direct you to page with input field for keyword so you can search the internet.
    Your input keyword will trigger the function to webscrape the internet and after a secs it will return possible results
    The result can be save in database by clicking the "save button"
3. "Upload Resources" page, you can also upload excel files with collected resources by GeRGI information specialist
4. "Resources Setup" page. Here you can set up the resources to whom it needed.
    Initially you can see the list of Organizations. Choose organization, then next it will show all department, course, subject.
    Then on the last part, search the resources you want to save on your choosen organization, department, course, subject.
5. "Users" page. List of Users
6. "Favorites" page. List of users saves favorites
6. "Requests" page. List of request of users


---


## 📬 Contact

| Field             | Details                                                   |
|------------------|--------------------------------------------------------------|
| 👤 Name           | **Federex A. Potolin**                                     |
| 📧 Email          | potolin.federex@gmail.com |
| 📱 Contact Number | 09267332616                 |
| 🎓 Program        | Master of Information and Communication Studies           |
| 🏫 Institution    | University of the Philippines – Open University            |


> 🚀 Thank you for exploring the GeRGI platform — empowering access to information for all.