import { createContext, useContext, useState } from "react";

type Role = "hr" | "emp" | "manager" | "account" | "board";
interface User {
  name: string;
  password: string;
  role: Role;
}
interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => void; // đầu vào là username và password, trả về void
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = (props: any) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser ? JSON.parse(savedUser) : null;
  });
  const fakeUser: User[] = [
    { name: "bpnhansu", password: "123456", role: "hr" },
    { name: "ketoan", password: "123456", role: "account" },
    { name: "nvien", password: "123456", role: "emp" },
    { name: "truongphong", password: "123456", role: "manager" },
    { name: "giamdoc", password: "123456", role: "board" },
  ];

  const login = (username: string, password: string) => {
    const foundUser = fakeUser.find(
      (u) => u.name === username && u.password === password,
    );
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
    } else {
      alert("Invalid username or password");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Phải dùng useAuth trong AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
