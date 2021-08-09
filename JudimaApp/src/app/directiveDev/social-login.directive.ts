import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy, navigationType,judimaDirective,changePanel } from '../customExports'
import { catchError, delay, first, take } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Directive({
    selector: '[appSocialLogin]'
})
export class SocialLoginDirective {


    @Input() socialLogin: any;
    extras: any;
    appExtras:any = {
        selector:"appSocialLogin",
        name:"socialLogin" // the lowercase name of the directive
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
                    let {ryber,ref,zChildren,http,extras}= this
                    //  work goes here
                    Object.entries(group)
                    .forEach((x:any,i)=>{
                        let [keyx, valx] = x

                        // main login pod
                        let mainLogin:Array<string> = Array.from(valx.types['mainLogin'] || [])
                        let mainLoginPod:Array<string> = Array.from(valx.types['mainLoginPod'] || [])
                        let mainLoginBold:Array<string> = Array.from(valx.types['mainLoginBold'] || [])
                        //


                        mainLoginPod
                        .forEach((x:any,i)=>{

                            // hide other login flows
                            let loginFlows = [...mainLogin]
                            loginFlows
                            .forEach((z:any,k)=>{
                                zChildren[z].css.transition = "none"
                                zChildren[z].css.opacity = 0
                                zChildren[z].css["z-index"] = 4
                            })
                            ref.detectChanges()
                            loginFlows
                            .forEach((z:any,k)=>{
                                delete zChildren[z].css.transition
                            })
                            //

                            // make the login menu slowly appear
                            of([])
                            .pipe(take(1),delay(200))
                            .subscribe({
                                next:(result:any)=>{

                                    changePanel({
                                        closing:[],
                                        zChildren,
                                        open:mainLogin,
                                        openBold:mainLoginBold,
                                        ref
                                    })

                                },
                                error:(err:any)=>{

                                }
                            })
                            //

                        })
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

