import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { JasperoAlertsModule } from '@jaspero/ng2-alerts';

import { DateTimePickerModule } from 'ng-pick-datetime';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MomentModule } from 'angular2-moment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CollapsibleModule } from 'angular2-collapsible';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { LoginComponent} from './components/login/login.component';

import { RegisterComponent } from './components/register/pre/register.component';
import { PostRegisterComponent } from './components/register/post/register.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { HomeComponent } from './components/home/home.component';
import { ResetComponent } from './components/password/reset/reset.component';
import { SetComponent } from './components/password/set/set.component';
import { mLoginComponent} from './components/login/mlogin.component';
import { SharedModule } from './common/shared.module';
import { WowService } from './core/wow.service';
import { BlogComponent } from './components/blog/blog.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRouting,
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule,
    DateTimePickerModule,
    JasperoAlertsModule,
    BrowserAnimationsModule,
    CollapsibleModule,
    // NoopAnimationsModule,
    FormsModule,
    HttpModule,
    DateTimePickerModule,
    MomentModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PostRegisterComponent,
    ContactusComponent,
    HomeComponent,
    ResetComponent,
    SetComponent,
    mLoginComponent,
    BlogComponent
    // RegisterComponent,
    // ContactusComponent
  ],
  providers: [
    WowService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
