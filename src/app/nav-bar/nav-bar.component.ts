import { Component, OnInit } from '@angular/core';

import { AuthService } from '../shared/auth/auth.service';
import { UserService } from '../shared/services/user.service';

import { User /*UserOUT*/ } from '../shared/interfaces/user';
import { ImageOUT } from '../shared/interfaces/image';

declare let $: any;

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {

  user: User /*UserOUT*/;
  profilePicture: ImageOUT;

  constructor(public authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.userInfos();
  }

  userInfos(): void {
    if (localStorage.getItem('userChangedValues')) {
      this.user = JSON. parse(localStorage.getItem('userChangedValues'));
    }
    else {
      this.user = this.authService.userLogged();
    }

    if (this.user) {
      this.userService.userImage(this.user.id).subscribe(
        (data) => {
          this.profilePicture = data;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
