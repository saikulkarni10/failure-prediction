import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { EmailValidator } from '@angular/forms';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';



@Injectable({providedIn:'root'})
export class AuthService{
    private isAuthenticated =false;
    private token : string;
    private authStatusListener=new Subject<boolean>();
    constructor(private http:HttpClient, public router : Router){}

    getAuthStatusListener()
    {
        return this.authStatusListener.asObservable();
    }

    getToken()
    {
        return this.token;
    }
    getIsAuth(){
        return this.isAuthenticated;
    }

    createUser(email : string, password : string)
    {
        const authData : AuthData = {email : email , password : password}
        this.http.post("http://localhost:3000/api/user/signup",authData)
        .subscribe(response=>{
            console.log(response);
        });
    }

     login(email:string,password:string)
    {
        const authData : AuthData = {email : email , password : password}
        this.http.post<{token : string}>("http://localhost:3000/api/user/post-create",authData)
        .subscribe(response=>{
           const token=response.token;
           this.token=token;
           console.log(this.token);
            if(!response)
            {
                alert("Invalid Username or password!!")
            }
           else{
           this.isAuthenticated=true;
           this.authStatusListener.next(true);
            console.log(response);
           
            alert("Logged in successfully!");
            this.router.navigateByUrl("/home");
           }
           
          
        });
    }

    logout(){
        this.token=null;
        this.isAuthenticated=false;
        this.authStatusListener.next(false);
        this.router.navigateByUrl("/post-create");

    }

}