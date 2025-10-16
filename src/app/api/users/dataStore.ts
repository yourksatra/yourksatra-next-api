let memoryUsers = [
  { id: 1, name: 'Bagas', email: 'bagas@example.com' },
  { id: 2, name: 'Test', email: 'test@example.com' },
];

export function getUsers() {
  return memoryUsers;
}

export function addUser(user: any) {
  memoryUsers.push(user);
}

export function updateUsers(newUsers: any[]) {
  memoryUsers = newUsers;
}

export function setUsers(users: any[]) {
  memoryUsers = users;
}