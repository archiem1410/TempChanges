// angular core modules
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { XHRBackend } from '@angular/http';
import { HttpModule, ResponseOptions, XSRFStrategy, BrowserXhr } from '@angular/http';
import { GallaryComponent } from './components/gallary/gallary.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoaderComponent } from './components/loader/loader.component';


import { validator } from './services/validations.service';
import {GoogleAnalyticsEventsService} from "./services/google-analytics-events.service";
import { HttpHandler } from './services/http-handler';
import { AuthGuard } from './guards/auth.guard';


// Components

// Pipes

// Directives

// services

@NgModule ({
    declarations: [
        // Components
      GallaryComponent,
      FooterComponent,
      NavbarComponent,
      LoaderComponent,

        // Directives

        // Pipes
    ],
    imports: [
        CommonModule,
        HttpModule,
        RouterModule,
        FormsModule
    ],
    exports: [
        // Modules

        // Components
        GallaryComponent,
        FooterComponent,
        NavbarComponent,
        LoaderComponent,

        // Directives
        // Pipes
    ],
    providers: [
    //     SharedService,
    //     PollResolver,
    //     AlertService,    
        AuthGuard,
        HttpHandler,
        validator,
        GoogleAnalyticsEventsService
        // { provide: XHRBackend, useClass: CustomAuthGuard, deps: [BrowserXhr, ResponseOptions, XSRFStrategy, Router, SlimLoadingBarService] },
    ]
})

export class SharedModule {  };