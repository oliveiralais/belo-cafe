import { Component } from '@angular/core';
import { User } from 'src/app/dashboard/models/user';
import { GlebaService } from 'src/app/dashboard/services/gleba.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  loggedUser!: User;

  constructor(private glebaService: GlebaService) {}

  ngOnInit(): void {
    this.getUser(+localStorage.getItem('user_id')!);
  }

  getUser(id: number): void {
    this.glebaService.getProprietary(id).subscribe({
      next: (user) => {
        this.loggedUser = user;
      },
    });
  }

  handleLogout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_id');
    window.location.reload();
  }
}
