# Work Wise

[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

Work Wise is a modern job board and career management platform built with React, Apollo GraphQL, and Node.js. It allows users to browse, search, and apply for jobs, as well as manage their profiles and applications in a secure, user-friendly dashboard.

**🌐 Live Demo:**  
[https://workwise-1-3yv0.onrender.com/](https://workwise-1-3yv0.onrender.com/)

---

## 🚀 Features

- **User Authentication:** Register, login, and manage sessions securely.
- **Job Listings:** Browse and search for jobs with real-time filtering.
- **Job Application:** Apply to jobs directly from the platform.
- **Dashboard:** Personalized dashboard with user info and quick navigation.
- **Responsive Design:** Works beautifully on desktop and mobile.
- **Protected Routes:** Only authenticated users can access certain pages.
- **Modern UI:** Clean, animated, and accessible interface.

---

## 🛠️ Tech Stack

- **Frontend:** React, React Router, Apollo Client, CSS Modules
- **Backend:** Node.js, Express, Apollo Server, MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment:** [Render](https://render.com/)

---

## 📦 Project Structure

```
client/
  public/
    background.png
  src/
    components/
      Header.js
      ProtectedRoute.js
      MainLayout.js
    context/
      AuthContext.js
    pages/
      LandingPage.js
      Dashboard.js
      JobListings.js
      JobApplication.js
      Register.js
      Login.js
    styles/
      LandingPage.css
      Dashboard.css
      Header.css
    App.js
    index.js
  package.json
server/
  ...
```

---

## 🖥️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/workwise.git
cd workwise
```

### 2. Install dependencies

```bash
cd client
npm install
# In another terminal:
cd ../server
npm install
```

### 3. Start the development servers

- **Frontend:**
  ```bash
  cd client
  npm start
  ```
- **Backend:**
  ```bash
  cd server
  npm start
  ```

### 4. Open in your browser

Visit [http://localhost:3000](http://localhost:3000) to view the app locally, or try the [Live Demo](https://workwise-1-3yv0.onrender.com/).

---

## 🌟 Usage

- **Landing Page:** Browse featured jobs, search, or register/login.
- **Dashboard:** View your profile, job applications, and personalized content.
- **Job Listings:** Explore all available jobs and apply with one click.
- **Profile:** Update your information and track your applications.

---

## 🔒 Authentication

- JWT-based authentication.
- Protected routes for dashboard and job management.
- User session is persisted via localStorage.

---

## 🎨 Customization

- **Background Image:** Place your own `background.png` in `client/public/` for a custom look.
- **Branding:** Edit `Header.js` and CSS files for your own branding and navigation.

---

## 📝 License

MIT License

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📧 Contact

For questions or support, please open an issue or contact ruben.alston646@gmail.com.

---

**Work Wise** – Find your next opportunity, the smart way!
