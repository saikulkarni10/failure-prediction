import { NgModule } from '@angular/core';
import {  RouterModule,Routes } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './signup/auth.guard';
const routes: Routes = [
  { path: '',   redirectTo: '/header', pathMatch: 'full' },
  { path: 'header',        component: HeaderComponent },
  { path: 'post-create', component: PostCreateComponent },
  { path: 'home',        component: HomeComponent },
  { path: 'signup',        component: SignupComponent },
 
 
];

@NgModule({  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
 
})
export class AppRoutingModule { }
