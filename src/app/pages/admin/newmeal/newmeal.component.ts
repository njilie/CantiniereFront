import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../../shared/services/admin.service';

@Component({
  selector: 'app-newmeal',
  templateUrl: './newmeal.component.html',
  styleUrls: ['./newmeal.component.css']
})
export class NewmealComponent implements OnInit {

  newmeal: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private adminService: AdminService,
    private router: Router
    ) {
    
   }

  ngOnInit(): void {
    this.newmeal = this.formBuilder.group({
      Meals:[''],
      Prix:[''],
      Id:[''],
      Images:['']
    });
  }

  onSubmit(){
    this.adminService.save(this.newmeal.value);
    this.router.navigate([`/admin/meals`]);
  }
}