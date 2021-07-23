import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy, navigationType,judimaDirective } from '../customExports'
import { catchError, delay, first, take } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Directive({
    selector: '[appTemplate]'
})
export class TemplateDirective {


    @Input() template: any;
    extras: any;
    appExtras:any = {
        selector:"appTemplate",
        name:"template" // the lowercase name of the directive
    }
    zChildren: any;
    subscriptions:Array<Subscription> = []
    group:any;
    ref:ChangeDetectorRef

    constructor(
        private el: ElementRef,
        private http: HttpClient,
        private renderer2: Renderer2,
        private ryber: RyberService
    ) { }


    @HostListener('click') onClick() {
        //how you would get a host listener to run
    }


    ngOnInit() {
        this.extras = this[this.appExtras.name]
        let {onInit} = judimaDirective
        if (this.extras?.confirm === 'true' && this.extras?.type.includes("body")) {

            // // optional script loading
            // let loadedScripts =this.ryber.appGetScripts({
            //     scriptStrings:["ParticlesJS"]
            // })
            // //

            onInit({
                myThis:this,
                featureFn:(devObj)=>{
                    let {group,subscriptions} = devObj
                    let {ryber,ref,zChildren}= this
                    //  work goes here
                    Object.entries(group)
                    .forEach((x:any,i)=>{
                        let [keyx, valx] = x

                        let username = Array.from(valx.types['username'] || [])
                        let password = Array.from(valx.types['password'] || [])
                        let submit = Array.from(  valx.types['submit'] || [])


                        // username
                        // .forEach((y:any,j)=>{
                        //     // take some action

                        //     //
                        // })


                        // submit
                        // .forEach((y:any,j)=>{
                        //     // take some action
                        //     vaxl.subscriptions.push(of[])
                        //     //
                        // })
                        subscriptions.push(...valx.subscriptions)
                        //

                    })
                    //
                },
                // loadedScripts
            })
        }

    }

    ngOnDestroy() {
        let {onDestroy} = judimaDirective
        onDestroy({
            myThis:this
        })

    }

}

