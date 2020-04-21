import { Component, OnInit,Input, OnDestroy } from '@angular/core';
import { PostsService } from '../posts/post-create/posts.service';
import { Post } from "../posts/post-create/post.model";
import { Subscriber, Subscription } from "rxjs"; 
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HomesService } from '../../../homes.service';
import { Data } from "../../../models/data.model"
import { AuthService } from '../signup/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit, OnDestroy {
  data : Data =new Data();
  posts:Post[]=[];
  user1:string;
  private postsSub : Subscription;
  form : FormGroup; 
 
  public formGroup : FormGroup;

  enteredAge : number;
  _Age=null;
  enteredGender : number;
  _Gender=null;
  total_bilirubin :number;
  _Total_bilirubin=null;
  direct_bilirubin: number;
  _Direct_bilirubin=null;
  alkaline_phosphotase : number;
  _Alkaline_phosphotase=null;
  alamine_aminotransferase : number;
  _Alamine_aminotransferase=null;
  aspartate_aminotransferase : number;
  _Aspartate_aminotransferase=null;
  total_proteins : number;
  _Total_proteins=null;
  albumin : number;
  _Albumin=null;
  albumin_and_globulin_ratio: number;
  _Albumin_and_globulin_ratio=null;
  imagePreview: string;
  
 
  constructor(public postsService:PostsService,private homesService : HomesService, private authService : AuthService) { }

  ngOnInit(): void { 
    
    //this.form=new FormGroup({
      //"age-number": new FormControl(null,{validators :[Validators.required, Validators.min(0)]}),
      //"gender": new FormControl(null,{validators :[Validators.required, Validators.max(1)]}),
      //"total_bilirubin": new FormControl(null,{validators :[Validators.required]}),
      //"direct_bilirubin": new FormControl(null,{validators :[Validators.required]}),
      // "alkaline_phosphotase": new FormControl(null,{validators :[Validators.required]}),
      // "alamine_aminotransferase": new FormControl(null,{validators :[Validators.required]}),
      // "aspartate_aminotransferase": new FormControl(null,{validators :[Validators.required]}),
      // "total_proteins": new FormControl(null,{validators :[Validators.required]}),
      // "albumin": new FormControl(null,{validators :[Validators.required]}),
     // "albumin_and_globulin_ratio": new FormControl(null,{validators :[Validators.required]})
   // });
    //this.form.setValue()
   

    this.posts=(this.postsService.getPosts());
    //this.user1=this.posts[0].username;
    this.postsSub=this.postsService.getPostUpdatedListener().subscribe((posts:Post[])=>{
    this.posts=posts;
    
    
    
    
    });
    
    
  }

  Predict()
  {
    this.data.enteredAge=this._Age;
    this.data.enteredGender=this._Gender;
    this.data.total_bilirubin=this._Total_bilirubin;
    this.data.direct_bilirubin=this._Direct_bilirubin;
    this.data.alkaline_phosphotase=this._Alkaline_phosphotase;
    this.data.alamine_aminotransferase=this._Alamine_aminotransferase;
    this.data.aspartate_aminotransferase=this._Aspartate_aminotransferase;
    this.data.total_proteins=this._Total_proteins;
    this.data.albumin=this._Albumin;
    this.data.albumin_and_globulin_ratio=this._Albumin_and_globulin_ratio;

    this.homesService.setData(this.data);
    // console.log(this.enteredAge);
    // console.log(this.enteredGender);
    // console.log(this.total_bilirubin);
    // console.log(this.direct_bilirubin);
    // console.log(this.alkaline_phosphotase);
    // console.log(this.alamine_aminotransferase);
    // console.log(this.aspartate_aminotransferase);
    // console.log(this.total_proteins);
    // console.log(this.albumin);
    // console.log(this.albumin_and_globulin_ratio);

    //this.homesService.enteredData(this.enteredAge);

    //this.authService.sendData(this.data.enteredAge,this.data.enteredGender,this.data.total_bilirubin,this.data.direct_bilirubin,this.data.alkaline_phosphotase,this.data.alamine_aminotransferase,this.data.aspartate_aminotransferase,this.data.total_proteins,this.data.albumin,this.data.albumin_and_globulin_ratio);
  }
  SaveData()
  {
    this.authService.sendData(this.data.enteredAge,this.data.enteredGender,this.data.total_bilirubin,this.data.direct_bilirubin,this.data.alkaline_phosphotase,this.data.alamine_aminotransferase,this.data.aspartate_aminotransferase,this.data.total_proteins,this.data.albumin,this.data.albumin_and_globulin_ratio);
  }


  onImagePicked(event : Event)
  {
    const file=(event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload=()=>{
      this.imagePreview=reader.result as string;
    };
    reader.readAsDataURL(file);
  }    

  CheckResult(){
    

  }
  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }



}
