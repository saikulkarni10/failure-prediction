import { NgModule } from '@angular/core';
import {  RouterModule,Routes } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'post-create', component: PostCreateComponent },
  { path: 'home',        component: HomeComponent },
  { path: '',   redirectTo: '/post-create', pathMatch: 'full' }
 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
