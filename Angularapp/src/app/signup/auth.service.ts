import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { EmailValidator } from '@angular/forms';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { Data } from "../../../models/data.model"


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
            
          
           this.isAuthenticated=true;
           this.authStatusListener.next(true);
            console.log(response);
           
            alert("Logged in successfully!");
            this.router.navigateByUrl("/home");
           
           
          
        },(error)=>{
            console.log("Invalid Username or password, please try again.")
            alert("Invalid Username or Password. Try again!");
        }
        );
    }

    logout(){
        this.token=null;
        this.isAuthenticated=false;
        this.authStatusListener.next(false);
        this.router.navigateByUrl("/post-create");

    }

    sendData(enteredAge : number,enteredGenderF : number,enteredGenderM: number,total_bilirubin :number,direct_bilirubin: number,alkaline_phosphotase : number,alamine_aminotransferase : number,aspartate_aminotransferase : number,total_proteins : number,albumin : number,albumin_and_globulin_ratio: number)
    {
       const InputData:Data ={enteredAge : enteredAge,enteredGenderF : enteredGenderF,enteredGenderM:enteredGenderM,total_bilirubin :total_bilirubin ,direct_bilirubin: direct_bilirubin,alkaline_phosphotase : alkaline_phosphotase,alamine_aminotransferase : alamine_aminotransferase,aspartate_aminotransferase : aspartate_aminotransferase,total_proteins : total_proteins,albumin : albumin,albumin_and_globulin_ratio:  albumin_and_globulin_ratio};     
       this.http.post("http://localhost:3000/api/data/inputdata",InputData)
       .subscribe(response=>{
           if(response){
           console.log(response);
           }
           
       });
}
    }

