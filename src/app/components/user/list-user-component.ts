import { Component } from '@angular/core';
import { UserResponseDTO } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user-component.html',
  styleUrls: ['./list-user-component.scss'],
})
export class ListUserComponent {
  term: string = '';
  users: UserResponseDTO[] = [];
  showLoader: boolean = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.showLoader = false;
      },
      error: (err) => {
        this.showLoader = false;
        console.log(err.message);
      },
    });
  }

  deleteUser(id: number): void {
    if (
      window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')
    ) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (err) => {
          console.error('Erreur:', err);
        },
      });
    }
  }
}
