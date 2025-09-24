# Auth Task – React + Vite

This project is a **test assignment** implementing an **authentication flow** with login and two-factor verification screens.  
It follows the provided Figma design and handles API errors using **React Query** with mocked responses.  

---

## ✨ Features

- 🔐 Login screen with form validation  
- 📲 Two-Factor Authentication (2FA) flow  
- ⚡ Built with **React + TypeScript + Vite**  
- 🎨 Styled with **Ant Design + custom CSS**  
- 🔄 React Query for API state management  
- 🧩 Modular structure with reusable components & hooks  
- ✅ Form validation & error handling  

---

## 🛠 Tech Stack

- [React](https://react.dev/) (TypeScript)  
- [Vite](https://vitejs.dev/)  
- [Ant Design](https://ant.design/)  
- [React Query](https://tanstack.com/query)  
- ESLint (code style)  

---

## 📂 Project Structure

```
task-auth/
├── public/              # Static assets (favicon, logo)
├── src/
│   ├── api/             # API mock functions
│   ├── components/      # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components (Login, TwoFactor)
│   ├── providers/       # Context providers
│   ├── utils/           # Validation & helpers
│   ├── main.tsx         # App entry
│   └── index.css        # Global styles
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/rakhmatovich/test-auth-react-vite.git
cd task-auth
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Run the dev server

```bash
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📜 Available Scripts

| Command          | Description                       |
|------------------|-----------------------------------|
| `yarn dev`       | Start development server          |
| `yarn build`     | Build for production              |
| `yarn preview`   | Preview production build locally  |
| `yarn lint`      | Run ESLint checks                 |

---

## 🧪 Mock API & Error Handling

- API calls are **mocked** inside `src/api/auth.ts`  
- React Query is used to simulate async login & 2FA requests  
- Errors are handled and displayed in UI (see `ErrorAlert.tsx`)  

---

## ✅ Test Task Notes

- The implementation is based on the provided **Figma design**.  
- All API error states are simulated as requested.  
- The project demonstrates modular coding style, clean structure, and reusable hooks/components.  

---

## ❗️Auth Informations

- Email: `test@test@gmail.com`
- Password: `password`
- Two-Factor Authentication code: `123456`

---

## 📄 License

This project is provided as part of a **test assignment**.  
