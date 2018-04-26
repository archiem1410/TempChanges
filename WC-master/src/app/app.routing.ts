import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/pre/register.component';
import { PostRegisterComponent } from './components/register/post/register.component';
import { mLoginComponent } from './components/login/mlogin.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { AuthGuard } from './common/guards/auth.guard';

const APP_ROUTES: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'register', component: PostRegisterComponent },
  { path: 'login', component : mLoginComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'bloglist', component: BlogComponent },
  // { path: 'password', component: passwordComponent, children: [
  //     {path: ''}
  // ]},
  // { path: 'password/set/:id', component: SetComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];
export const AppRouting = RouterModule.forRoot(APP_ROUTES);
