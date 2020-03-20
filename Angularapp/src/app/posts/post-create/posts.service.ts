import { Post } from "./post.model";
import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { HttpClientModule, HttpClient } from '@angular/common/http'; 

@Injectable({providedIn:'root'})
export class PostsService
{
    private posts: Post[]=[];
    private postUpdated=new Subject<Post[]>();
    constructor(private http : HttpClient){}
    

    getPosts()
    {
        return [...this.posts];
    }
    getPostUpdatedListener()
    {
        return this.postUpdated.asObservable();
    }

    addPost(username: string, password :string)
    {
        const post: Post = {username : username, password : password };
        this.http.post<{message : string}>("http://localhost:3000/api/posts",post).subscribe((responseData)=>{
        console.log(responseData.message);
        this.postUpdated.next([...this.posts]);    // in order to update when the link is given again, username should change
        });
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
        
    }
}