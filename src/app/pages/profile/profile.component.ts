import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../shared/auth/auth.service';
import { UserService } from '../../shared/services/user.service';

import { User /*UserOUT, UserIN*/ } from '../../shared/interfaces/user';
import { ImageOUT, ImageIN } from '../../shared/interfaces/image';
import { PictureDialogComponent } from './picture-dialog/picture-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  
  user: User /*UserOUT*/;
  profilePicture: string;
  registrationDate: number[];
  form: FormGroup;
  loading: boolean;
  initName: string;
  initFirstname: string;
  prenom: string;
  image: ImageIN;

  constructor(
    private auth: AuthService,
    private route: Router,
    private userService: UserService,
    private fb: FormBuilder, 
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {}

    name() : void{
      this.user.name = this.form.get('name').value;
      this.initName = this.user.name.substring(0,1);
    }
     firstname(): void{
      this.user.firstname = this.form.get('firstname').value;
      this.initFirstname = this.user.firstname.substring(0,1);
    }

  ngOnInit(): void {
    if (localStorage.getItem('userChangedValues')) {
      this.user = JSON. parse(localStorage.getItem('userChangedValues'));
    }
    else {
      this.user = this.auth.userLogged();
    }

    this.userImage(this.user.id);

    this.form = this.fb.group({
      imagePath: [''],
      address: [''],
      postalCode: [
        '',
        Validators.compose([
          Validators.pattern('[0-9]+'),
          Validators.minLength(5),
          Validators.maxLength(5)
        ])
      ],
      email: ['', Validators.required],
      password: [''],
      name: ['', Validators.required],
      firstname: ['', Validators.required],
      phone: [
        '',
        Validators.compose([
          Validators.pattern('[0-9]+'),
          Validators.minLength(10),
          Validators.maxLength(10)
        ])
      ],
      town: [''],
      sex: ['', Validators.required],
    });
  }

  userImage(userId: number): void {
    this.userService.userImage(userId).subscribe(
      (data) => {
        this.profilePicture = data.image64;
        this.firstname();
        this.name();
        this.image = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit(): void {
    if (this.form.valid) {

      this.image.image64 = this.profilePicture;

      if (confirm('Etes-vous sûr de vouloir modifier vos informations ?')) {
        this.loading = true;

        this.userService.updateImage(this.user.id, this.image).subscribe(
          (data) => {
            this.route.navigate(['/home']);
          },
          (error) => {
            console.log(error);
          }
        );

        this.userService.update(this.user.id, this.form.value).subscribe(
          (data) => {
            localStorage.setItem('userChangedValues', JSON.stringify(data));
            this.user = data;
            this.loading = false;
            alert('Informations modifiées succès');
            this.route.navigate(['/home']);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PictureDialogComponent, {
      width: '550px',
      data: {
        title: "Changez votre photo de profil",
        profilePicture :  this.profilePicture,   
        prenom : this.user.firstname
      }
    });

    dialogRef.afterClosed().subscribe(
        data => {
          console.log("The Dialog was closed");
          this.profilePicture = data;
        }); 
  }
}
