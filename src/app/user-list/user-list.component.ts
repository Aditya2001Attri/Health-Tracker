import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users = [];
  paginatedUsers = [];
  workoutTypes: string[] = [];
  displayedColumns: string[] = ['name', 'workouts'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.users = this.userService.getUsers();
    this.paginatedUsers = this.users.slice(0, 5);
    this.workoutTypes = [...new Set(this.users.flatMap(user => user.workouts.map(w => w.type)))];
  }

  applyFilter(name: string) {
    this.paginatedUsers = this.users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
    this.paginatedUsers = this.paginatedUsers.slice(0, 5); // Apply pagination
  }

  filterByType(type: string) {
    this.paginatedUsers = this.users.filter(user => user.workouts.some(workout => workout.type === type));
    this.paginatedUsers = this.paginatedUsers.slice(0, 5); // Apply pagination
  }

  onPageChange(event: any) {
    const startIndex = event.pageIndex * event.pageSize;
    this.paginatedUsers = this.users.slice(startIndex, startIndex + event.pageSize);
  }
}
