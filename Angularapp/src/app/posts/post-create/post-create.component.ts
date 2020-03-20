import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { ThrowStmt } from '@angular/compiler';
import { NgForm } from '@angular/forms';
import { PostsService } from './posts.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "src/app/signup/auth.service";

@Component({
    selector:"app-post-create",
    templateUrl:"./post-create.component.html",
     styleUrls : ['./post-create.component.css']
})



export class PostCreateComponent implements OnInit{

    registerForm: FormGroup;
    submitted = false;
    answer="";
    check =false;
    
  
    constructor(private formBuilder: FormBuilder, public authService :AuthService) { }
  
    ngOnInit(): void {
      this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        password: ['', [Validators.required, Validators.minLength(6)]]  
    });
    }
  
    get f() { return this.registerForm.controls; }
  
      onSubmit() {
          this.submitted = true;
  
        //   // stop here if form is invalid
        //   if (this.registerForm.invalid) {
        //       return;
        //   }
          this.authService.login(this.registerForm.value.email,this.registerForm.value.password);
           

      }
}
