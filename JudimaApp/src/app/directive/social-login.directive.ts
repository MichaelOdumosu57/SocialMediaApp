import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest, iif } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy, navigationType,judimaDirective,changePanel, flatDeep } from '../customExports'
import { catchError, delay, first, switchMap, take,filter, takeWhile } from 'rxjs/operators'
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

                        //facebook
                        let FBManage:Array<string> = Array.from(valx.types['FBManage'] || [])
                        let FB:Array<string> = Array.from(valx.types['FB'] || [])
                        let FBBold:Array<string> = Array.from(valx.types['FBBold'] || [])
                        let FBView1:Array<string> = Array.from(valx.types['FBView1'] || [])
                        //

                        mainLoginPod
                        .forEach((y:any,j)=>{

                            // hide other login flows
                            let loginFlows = [...mainLogin,FBView1]

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


                        FBManage
                        .forEach((y:any,j)=>{

                            let relatedLazyLoadSub = ryber.appCO0.metadata.components.lazyLoad.current
                            .pipe(
                                filter((data:any)=>{ return data.zSymbol === FBView1[0] && data.co === extras.co}),
                                take(1), //should it be here
                                switchMap((result)=>{

                                    let clickEvent$ = fromEvent(zChildren[y].element, 'click')
                                    return clickEvent$
                                })
                            )
                            .subscribe({
                                next:(result:any)=>{
                                    changePanel({
                                        closing:[...mainLogin,...mainLoginBold],
                                        zChildren,
                                        open:FB,
                                        openBold:FBBold,
                                        ref
                                    })


                                },
                                error:console.log
                            })
                            valx.subscriptions.push(relatedLazyLoadSub)

                        })

                        FBView1
                        .forEach((y:any,j)=>{
                            let component= zChildren[y]
                            let lazyLoadSub = ryber.appCO0.metadata.components.lazyLoad.current
                            .pipe(
                                filter((data:any)=>{ return data.zSymbol === y && data.co === extras.co})
                            )
                            .subscribe({
                                next:(result:any)=>{

                                    let FBPanel = flatDeep(component.extras.options.panels,Infinity)
                                    let [FB1,FB1Bold,FB1User,FB1Pass,FB1Submit] =
                                    Array(5).fill(null).map( _=>[]);
                                    let myFB = {FB1,FB1Bold,FB1User,FB1Pass,FB1Submit}
                                    Object.entries(myFB)
                                    .forEach((z:any,k)=>{

                                        let [keyz,valz] = z
                                        FBPanel
                                        .forEach((w:any,h)=>{

                                            if(w.appSocialLogin.type.includes(keyz) ){
                                                valz.push(w)
                                            }

                                        })

                                    })

                                    //show the probably only panel
                                    changePanel({
                                        closing:[],
                                        open:FB1,
                                        openBold:FB1Bold,
                                        ref,
                                        type:"component"
                                    })
                                    //

                                    // manage the fb account to the app
                                    FB1Submit
                                    .forEach((z:any,k)=>{
                                        z.click = (evt:Event) =>{

                                            iif(
                                                ()=> env.dev.socialLogin.addFBAcct.dummy,
                                                of({message:"OK"}),
                                                http.post(
                                                    env.backend.url,
                                                    {
                                                        env:"addFBAcct",
                                                        user:FB1User[0].value || "",
                                                        pass:FB1Pass[0].value || "",
                                                        access_token: ryber.appCO0.metadata.awsLogin.accessToken
                                                    },
                                                )
                                            )
                                            .pipe(
                                                catchError(ryber.socialLogin.addFBAcct.catchError),
                                                takeWhile((val:any)=>{return val.message !== 'OK'},true)
                                            )
                                            .subscribe({
                                                next:(result:any)=>{

                                                },
                                                error:(err:any)=>{

                                                }
                                            })
                                        }
                                    })
                                    //

                                },
                                error:(err:any)=>{

                                }
                            })
                            valx.subscriptions.push(lazyLoadSub)
                        })
                        subscriptions.push(...valx.subscriptions)


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

