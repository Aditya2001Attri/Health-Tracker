import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  userName: string = '';
  workoutType: string = '';
  workoutMinutes: number = 0;

  constructor(private userService: UserService) {}

  addUser() {
    this.userService.addUser({
      name: this.userName,
      workouts: [{ type: this.workoutType, minutes: this.workoutMinutes }]
    });
    this.userName = '';
    this.workoutType = '';
    this.workoutMinutes = 0;
  }
}
