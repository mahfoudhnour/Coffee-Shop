import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

 
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    
   
    const hardcodedUsers = [
      {
        email: "admin@cafemiranda.com",
        password: "admin123",
        name: "Admin User",
        role: "admin",
        id: 1
      },
      {
        email: "barista@cafemiranda.com",
        password: "barista123",
        name: "Barista User",
        role: "barista",
        id: 2
      },
      {
      "email": "user@cafemiranda.com",
      "password": "user123",
      "name": "Regular User",
      "role": "user",
      "id": 3
      }
    ];

  
    const allUsers = [...hardcodedUsers, ...users];

    const foundUser = allUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) return false;

    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    setCurrentUser(foundUser);
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      isAuthenticated,
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};