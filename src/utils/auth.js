
import { getData, setData } from '../config/data';

export const login = (email, password) => {
  const users = getData('users');
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    return { success: true, user: userWithoutPassword };
  }
  
  return { success: false, error: 'Invalid credentials' };
};

export const signup = (userData) => {
  const users = getData('users');
  const existingUser = users.find(u => u.email === userData.email);
  
  if (existingUser) {
    return { success: false, error: 'User already exists' };
  }
  
  const newUser = {
    ...userData,
    id: Date.now().toString(),
    role: userData.role || 'customer'
  };
  
  users.push(newUser);
  setData('users', users);
  
  const { password: _, ...userWithoutPassword } = newUser;
  localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
  
  return { success: true, user: userWithoutPassword };
};

export const logout = () => {
  localStorage.removeItem('currentUser');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

export const hasRole = (requiredRole) => {
  const user = getCurrentUser();
  return user && user.role === requiredRole;
};
