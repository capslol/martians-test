interface User {
  email: string;
  password: string;
}

const USERS_FILE = 'users.json';

export const registerUser = async (email: string, password: string): Promise<boolean> => {
  try {
    const users = await getUsers();
    
    if (users.find(user => user.email === email)) {
      return false;
    }
    
    users.push({ email, password });
    await saveUsers(users);
    return true;
  } catch (error) {
    console.error('Registration error:', error);
    return false;
  }
};

export const loginUser = async (email: string, password: string): Promise<boolean> => {
  try {
    const users = await getUsers();
    return users.some(user => user.email === email && user.password === password);
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

const getUsers = async (): Promise<User[]> => {
  try {
    const data = localStorage.getItem(USERS_FILE);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveUsers = async (users: User[]): Promise<void> => {
  localStorage.setItem(USERS_FILE, JSON.stringify(users, null, 2));
}; 