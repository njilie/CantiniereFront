import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  userForm: FormGroup;
  message: string;
  clickSubmit = false;

  constructor( private formBuilder: FormBuilder, private userService: UserService, private route: Router) {
    this.userForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ])]
    })
   }

  ngOnInit(): void {
  }

  get email(){
    return this.userForm.get('email');
  }

  onSubmit(){
    if (this.userForm.valid) {
      this.userService.forgotPassword(this.userForm.controls['email'].value).subscribe(
        (data) => {
          this.route.navigate(['/login']);
      },
      (error) => {
        if (error.status === 412) {
          this.message = "L'e-mail n'a pas été trouvé ou l'utilisateur n'est pas dans notre base de données ou le serveur de messagerie ne fonctionne pas.";
        }
      });
    }
  }

  valide(){
 this.clickSubmit = true;
  }

}
