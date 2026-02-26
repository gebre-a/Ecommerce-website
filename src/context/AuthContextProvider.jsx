import { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(
    localStorage.getItem("currentUserEmail")
      ? { email: localStorage.getItem("currentUserEmail") }
      : null
  );

  function signUp(email, password) {
    const normalizedEmail = normalizeEmail(email);
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.find((u) => normalizeEmail(u.email) === normalizedEmail)) {
      return { success: false, error: "Account already exists" };
    }

    const newUser = { email: normalizedEmail, password };
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUserEmail", normalizedEmail);
    setUser({ email: normalizedEmail });

    return { success: true };
  }

  function login(email, password) {
    const normalizedEmail = normalizeEmail(email);
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const existingUser = users.find(
      (u) => normalizeEmail(u.email) === normalizedEmail && u.password === password
    );

    if (!existingUser) {
      return { success: false, error: "Invalid credentials" };
    }

    localStorage.setItem("currentUserEmail", normalizedEmail);
    setUser({ email: normalizedEmail });

    return { success: true };
  }

  function logout() {
    localStorage.removeItem("currentUserEmail");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signUp, signup: signUp, user, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
