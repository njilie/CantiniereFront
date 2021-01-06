import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  submitted = false;
  userForm: FormGroup;
  clickSubmit = false;
  message: string;

resultat: User;

  constructor(private userService: UserService,private formBuilder: FormBuilder,private router: Router) {
    this.userForm = this.formBuilder.group({
      address: ['', Validators.required],
      wallet : [0, Validators.required],
      postalCode: ['', Validators.required],
      name: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[%!.&$?*]).{8,}$')
      ])],
      town: ['', Validators.required],
      phone: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ])],
      sex:[0, Validators.required]
    });
   }

  ngOnInit(): void {
  }

  get email(){
    return this.userForm.get('email');
  }
  get password(){
    return this.userForm.get('password');
  }

  valider(){
    this.clickSubmit = true;
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.userService.userRegister(this.userForm.value).subscribe(
        (data) => {
        this.router.navigate(['/login']);
        },
        (error) => {
          console.log(error);
          if (error.error.status === 401) {
            this.message = "Vous n'avez pas bien saisi vos informations";
          }
        }
      );
    }
  }

}
