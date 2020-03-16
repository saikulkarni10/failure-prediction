import { Component, OnInit,Input, OnDestroy } from '@angular/core';
import { PostsService } from '../posts/post-create/posts.service';
import { Post } from "../posts/post-create/post.model";
import { Subscriber, Subscription } from "rxjs"; 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit, OnDestroy {

  posts:Post[]=[];
  user1:string;
  private postsSub : Subscription;
  

  constructor(public postsService:PostsService) { }

  ngOnInit(): void { 
    this.posts=(this.postsService.getPosts());
    this.user1=this.posts[0].username;
    this.postsSub=this.postsService.getPostUpdatedListener().subscribe((posts:Post[])=>{
    this.posts=posts;
    
    });
    
    
  }
  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }


}
