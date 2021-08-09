// angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { MyErrorHandler } from './errorHandler'
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HammerModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { environment as env } from '../environments/environment'
//


// judima
import { NestDirective } from './directiveDev/nest.directive';
import { LatchDirective } from './directiveDev/latch.directive';
import { DeltaNodeDirective } from './directiveDev/delta-node.directive';
import { SectionDirective } from './directiveDev/section.directive';
import { NavigationDirective } from './directiveDev/navigation.directive';
import { VanillaTiltDirective } from './directiveDev/vanilla-tilt.directive';
import { VisibleDirective } from './directiveDev/visible.directive';
import { AttributeDirective } from './directiveDev/attribute.directive';
import { ComponentsComponent } from './components/components.component';
import { ComponentsDirective } from './directiveDev/components.directive';
//


// primeNG
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
//


// dev additions
import { ThreeDirective } from './directiveDev/three.directive';
import { AwsLoginDirective } from './directiveDev/aws-login.directive';
import { QRCodeModule } from 'angularx-qrcode';
import { SocialLoginDirective } from './directiveDev/social-login.directive';
//


let providers = []
if (env.testingAcct.confirm === "true") {
    window.judima_environment = env
    providers = [{ provide: ErrorHandler, useClass: MyErrorHandler }]
}

//@ts-ignore
@NgModule({
    declarations: [
        // angular
        AppComponent,
        //

        // judima
        FormComponent,
        NestDirective,
        LatchDirective,
        DeltaNodeDirective,
        SectionDirective,
        NavigationDirective,
        VanillaTiltDirective,
        VisibleDirective,
        ComponentsComponent,
        ComponentsDirective,
        AttributeDirective,
        //

        // dev additions
        ThreeDirective,
        AwsLoginDirective,
        SocialLoginDirective
        //

    ],
    imports: [

        // angular
        // HammerModule,
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        // AppRoutingModule,
        //

        // primeNG
        TableModule,
        ButtonModule,
        CarouselModule,
        CardModule,
        DropdownModule,
        ProgressSpinnerModule,
        //

        // dev additions
        QRCodeModule
        //
    ],
    providers,
    bootstrap: [AppComponent]
})
export class AppModule { }
