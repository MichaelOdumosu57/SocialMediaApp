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
import { NestDirective } from './directive/nest.directive';
import { LatchDirective } from './directive/latch.directive';
import { DeltaNodeDirective } from './directive/delta-node.directive';
import { SectionDirective } from './directive/section.directive';
import { NavigationDirective } from './directive/navigation.directive';
import { VanillaTiltDirective } from './directive/vanilla-tilt.directive';
import { VisibleDirective } from './directive/visible.directive';
import { AttributeDirective } from './directive/attribute.directive';
import { ComponentsComponent } from './components/components.component';
import { ComponentsDirective } from './directive/components.directive';
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

//  dev additions
import { ThreeDirective } from './directive/three.directive';
import { AwsLoginDirective } from './directive/aws-login.directive';
import { QRCodeModule } from 'angularx-qrcode';
//


let providers = []
if (env.testingAcct.confirm === "true") {

    providers = [{ provide: ErrorHandler, useClass: MyErrorHandler }]
}

//  no messages
(console.log as any) = ()=>{}
(console.warn as any) = ()=>{}
(console.error as any) = ()=>{}


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
        AwsLoginDirective
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
