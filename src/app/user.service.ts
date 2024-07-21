import { Injectable } from '@angular/core';

interface Workout {
  type: string;
  minutes: number;
}

interface User {
  id?: number;
  name: string;
  workouts: Workout[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];

  constructor() {
    this.loadUsers();
  }

  addUser(user: User) {
    const id = this.users.length ? this.users[this.users.length - 1].id! + 1 : 1;
    this.users.push({ ...user, id });
    this.saveUsers();
  }

  getUsers() {
    return this.users;
  }

  private saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  private loadUsers() {
    const users = localStorage.getItem('users');
    this.users = users ? JSON.parse(users) : [];
  }
}
