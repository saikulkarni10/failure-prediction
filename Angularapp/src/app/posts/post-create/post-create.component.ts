import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { ThrowStmt } from '@angular/compiler';
import { NgForm } from '@angular/forms';
import { PostsService } from './posts.service';

@Component({
    selector:"app-post-create",
    templateUrl:"./post-create.component.html"
     
})



export class PostCreateComponent implements OnInit{

    constructor(private router : Router, public postsService :PostsService){}

    ngOnInit()
    {

    }




    newPost='';
    newUser="";
    newPassword="";
    entered_User="";
    entered_Password="";
    
    storedPosts=[];
    Login()
    {
      
        this.newUser=this.entered_User;
        this.newPassword=this.entered_Password;
       //this.newUser=form.value.username;
       //this.newPassword=form.value.password;
        console.log(this.newUser);
        alert("Logged in successfully !")
        
        const post={
            username : this.entered_User,
            password : this.entered_Password
        };
        this.postsService.addPost(this.entered_User,this.entered_Password);

    }

    

}
