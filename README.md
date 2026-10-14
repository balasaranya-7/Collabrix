# COLLABRIX — Where Brands Meet AI Creators

**COLLABRIX** is an AI-powered content creator marketplace that connects brands with AI creators, including AI filmmakers, animators, and generative artists. It helps brands discover suitable creators, define campaign requirements, and find collaborators based on skills, AI tools, creative style, and project needs.

## ✨ Features

- **Creator Profiles & Portfolios** — Showcase specializations, skills, AI tools, workflows, and creative work.
- **Campaign Creation** — Define campaign briefs, content types, creative styles, formats, budgets, and commercial-use requirements.
- **Smart Creator Discovery** — Explore creators using relevant search and filters.
- **Creator Matching** — Recommend creators based on campaign requirements, with match scores and explanations.
- **Brand & Creator Dashboards** — Dedicated workspaces for brands and creators.
- **Authentication** — Registration and login for marketplace users.
- **Responsive UI** — Designed to support different screen sizes.

## 🛠️ Tech Stack

**Frontend**
- React
- TypeScript
- Vite
- CSS

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB

**Other Tools**
- Git & GitHub
- AI content-generation tools and image assets

## 📁 Project Structure

```text
Collabrix/
├── client/          # React frontend
│   ├── src/
│   └── package.json
├── server/          # Express backend
│   ├── src/
│   └── package.json
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Install the following before running the project:

- Node.js and npm
- MongoDB, either locally or through MongoDB Atlas
- Git

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd Collabrix
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd server
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the `server` directory and add the variables required by your backend configuration.

Example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Add any other variables required by your authentication or API integrations. Never commit real credentials or secrets to GitHub.

### 5. Start the backend

From the `server` directory:

```bash
npm run dev
```

### 6. Start the frontend

From the `client` directory, open a separate terminal:

```bash
npm run dev
```

Open the local URL displayed by Vite in your browser.

> **Note:** Ensure MongoDB and the required environment variables are configured before testing backend features. Check the project's existing configuration for the exact variable names and API requirements.

## 🎯 Project Goal

The goal of COLLABRIX is to simplify collaboration between brands and AI creators through structured campaign briefs, creator discovery, and relevant creator recommendations.

Instead of relying only on manual browsing, brands can discover creators whose creative capabilities and project requirements align with their campaigns.

## 🔮 Future Enhancements

- AI-assisted campaign brief generation
- Creator verification and trust signals
- Advanced semantic creator matching
- Campaign application and collaboration tracking
- Analytics for brands and creators
- Improved portfolio management

## 🤝 Contributing

Contributions, suggestions, and feedback are welcome. Fork the repository, create a feature branch, and submit a pull request.

## 📄 License

Choose and add an appropriate open-source license before distributing the project.

---

**COLLABRIX — Where Brands Meet AI Creators.**
