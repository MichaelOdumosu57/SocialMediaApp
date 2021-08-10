import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest, iif, defer } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy, navigationType,judimaDirective,changePanel, flatDeep } from '../customExports'
import { catchError, delay, first, switchMap, take,filter, takeWhile, exhaustMap } from 'rxjs/operators'
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
            let loadedScripts =this.ryber.appGetScripts({
                scriptStrings:["FB.js SDK"]
            })
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
                        let FaceBManage:Array<string> = Array.from(valx.types['FaceBManage'] || [])
                        let FaceB:Array<string> = Array.from(valx.types['FaceB'] || [])
                        let FaceBBold:Array<string> = Array.from(valx.types['FaceBBold'] || [])
                        let FaceBView1:Array<string> = Array.from(valx.types['FaceBView1'] || [])
                        //

                        // twitter
                        let TWManage:Array<string> = Array.from(valx.types['TWManage'] || [])
                        let TW:Array<string> = Array.from(valx.types['TW'] || [])
                        let TWBold:Array<string> = Array.from(valx.types['TWBold'] || [])
                        let TWView1:Array<string> = Array.from(valx.types['TWView1'] || [])
                        //

                        // IG
                        let IGManage:Array<string> = Array.from(valx.types['IGManage'] || [])
                        let IG:Array<string> = Array.from(valx.types['IG'] || [])
                        let IGBold:Array<string> = Array.from(valx.types['IGBold'] || [])
                        let IGView1:Array<string> = Array.from(valx.types['IGView1'] || [])
                        //

                        // PI
                        let PIManage:Array<string> = Array.from(valx.types['PIManage'] || [])
                        let PI:Array<string> = Array.from(valx.types['PI'] || [])
                        let PIBold:Array<string> = Array.from(valx.types['PIBold'] || [])
                        let PIView1:Array<string> = Array.from(valx.types['PIView1'] || [])
                        //

                        // TM
                        let TMManage:Array<string> = Array.from(valx.types['TMManage'] || [])
                        let TM:Array<string> = Array.from(valx.types['TM'] || [])
                        let TMBold:Array<string> = Array.from(valx.types['TMBold'] || [])
                        let TMView1:Array<string> = Array.from(valx.types['TMView1'] || [])
                        //

                        // DS
                        let DSManage:Array<string> = Array.from(valx.types['DSManage'] || [])
                        let DS:Array<string> = Array.from(valx.types['DS'] || [])
                        let DSBold:Array<string> = Array.from(valx.types['DSBold'] || [])
                        let DSView1:Array<string> = Array.from(valx.types['DSView1'] || [])
                        //

                        // RDIT
                        let RDITManage:Array<string> = Array.from(valx.types['RDITManage'] || [])
                        let RDIT:Array<string> = Array.from(valx.types['RDIT'] || [])
                        let RDITBold:Array<string> = Array.from(valx.types['RDITBold'] || [])
                        let RDITView1:Array<string> = Array.from(valx.types['RDITView1'] || [])
                        //

                        // BLOG
                        let BLOGManage:Array<string> = Array.from(valx.types['BLOGManage'] || [])
                        let BLOG:Array<string> = Array.from(valx.types['BLOG'] || [])
                        let BLOGBold:Array<string> = Array.from(valx.types['BLOGBold'] || [])
                        let BLOGView1:Array<string> = Array.from(valx.types['BLOGView1'] || [])
                        //

                        // TWH
                        let TWHManage:Array<string> = Array.from(valx.types['TWHManage'] || [])
                        let TWH:Array<string> = Array.from(valx.types['TWH'] || [])
                        let TWHBold:Array<string> = Array.from(valx.types['TWHBold'] || [])
                        let TWHView1:Array<string> = Array.from(valx.types['TWHView1'] || [])
                        //

                        // PT
                        let PTManage:Array<string> = Array.from(valx.types['PTManage'] || [])
                        let PT:Array<string> = Array.from(valx.types['PT'] || [])
                        let PTBold:Array<string> = Array.from(valx.types['PTBold'] || [])
                        let PTView1:Array<string> = Array.from(valx.types['PTView1'] || [])
                        //

                        mainLoginPod
                        .forEach((y:any,j)=>{

                            // hide other login flows
                            let loginFlows = [...mainLogin,FaceBView1,TWView1,IGView1,PIView1,TMView1,DSView1,RDITView1,BLOGView1,TWHView1,PTView1]

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


                        FaceBManage
                        .forEach((y:any,j)=>{
                            console.log(FB)
                            let relatedLazyLoadSub = ryber.appCO0.metadata.components.lazyLoad.current
                            .pipe(
                                filter((data:any)=>{ return data.zSymbol === FaceBView1[0] && data.co === extras.co}),
                                take(1), //should it be here
                                switchMap((result)=>{

                                    let clickEvent$ = fromEvent(zChildren[y].element, 'click')
                                    return clickEvent$
                                }),
                                exhaustMap(()=>{
                                    return defer(()=>from(new Promise(FB.login)))
                                }),
                                exhaustMap((result:any)=>{

                                    // set the accessToken
                                    ryber.appCO0.metadata.awsLogin.FaceB.accessToken = result.authResponse.accessToken
                                    //
                                    
                                    return iif(
                                        ()=> env.dev.socialLogin.addAcct.dummy,
                                        of({message:"OK"}),
                                        http.post(
                                            env.backend.url,
                                            {
                                                env:"addFaceBAcct",
                                                access_token: ryber.appCO0.metadata.awsLogin.accessToken,
                                                FaceB:{
                                                    access_token:result.authResponse.accessToken,
                                                }
                                            },
                                            {
                                                withCredentials:true,
                                                headers: {
                                                    'Content-Type': 'text/plain'
                                                }
                                            }
                                        )
                                    )
                                    .pipe(
                                        catchError(ryber.socialLogin.addFaceBAcct.catchError),
                                        takeWhile((val:any)=>{return val.message !== 'OK'},true)
                                    )
                                }),
                            )
                            .subscribe({
                                next:(result:any)=>{
                                    // console.log(result)
                                    // FB.login((response)=>{
                                    //     console.log(response)
                                    // });
                                    // changePanel({
                                    //     closing:[...mainLogin,...mainLoginBold],
                                    //     zChildren,
                                    //     open:FaceB,
                                    //     openBold:FaceBBold,
                                    //     ref
                                    // })


                                },
                                error:console.log
                            })
                            valx.subscriptions.push(relatedLazyLoadSub)

                        })

                        FaceBView1
                        .forEach((y:any,j)=>{
                            let component= zChildren[y]
                            let lazyLoadSub = ryber.appCO0.metadata.components.lazyLoad.current
                            .pipe(
                                filter((data:any)=>{ return data.zSymbol === y && data.co === extras.co})
                            )
                            .subscribe({
                                next:(result:any)=>{

                                    let FaceBPanel = flatDeep(component.extras.options.panels,Infinity)
                                    let [FaceB1,FaceB1Bold,FaceB1User,FaceB1Pass,FaceB1Submit] =
                                    Array(5).fill(null).map( _=>[]);
                                    let myFaceB = {FaceB1,FaceB1Bold,FaceB1User,FaceB1Pass,FaceB1Submit}
                                    Object.entries(myFaceB)
                                    .forEach((z:any,k)=>{

                                        let [keyz,valz] = z
                                        FaceBPanel
                                        .forEach((w:any,h)=>{

                                            if(w.appSocialLogin.type.includes(keyz) ){
                                                valz.push(w)
                                            }

                                        })

                                    })

                                    //show the probably only panel
                                    changePanel({
                                        closing:[],
                                        open:FaceB1,
                                        openBold:FaceB1Bold,
                                        ref,
                                        type:"component"
                                    })
                                    //

                                    // manage the fb account to the app
                                    FaceB1Submit
                                    .forEach((z:any,k)=>{
                                        z.click = (evt:Event) =>{

                                            iif(
                                                ()=> env.dev.socialLogin.addAcct.dummy,
                                                of({message:"OK"}),
                                                http.post(
                                                    env.backend.url,
                                                    {
                                                        env:"addFaceBAcct",
                                                        user:FaceB1User[0].value || "",
                                                        pass:FaceB1Pass[0].value || "",
                                                        access_token: ryber.appCO0.metadata.awsLogin.accessToken
                                                    },
                                                )
                                            )
                                            .pipe(
                                                catchError(ryber.socialLogin.addFaceBAcct.catchError),
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

                        TWManage
                        .forEach((y:any,j)=>{

                            let relatedLazyLoadSub = ryber.appCO0.metadata.components.lazyLoad.current
                            .pipe(
                                filter((data:any)=>{ return data.zSymbol === TWView1[0] && data.co === extras.co}),
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
                                        open:TW,
                                        openBold:TWBold,
                                        ref
                                    })


                                },
                                error:console.log
                            })
                            valx.subscriptions.push(relatedLazyLoadSub)

                        })

                        TWView1
                        .forEach((y:any,j)=>{
                            let component= zChildren[y]
                            let lazyLoadSub = ryber.appCO0.metadata.components.lazyLoad.current
                            .pipe(
                                filter((data:any)=>{ return data.zSymbol === y && data.co === extras.co})
                            )
                            .subscribe({
                                next:(result:any)=>{

                                    let TWPanel = flatDeep(component.extras.options.panels,Infinity)
                                    let [TW1,TW1Bold,TW1User,TW1Pass,TW1Submit] =
                                    Array(5).fill(null).map( _=>[]);
                                    let myTW = {TW1,TW1Bold,TW1User,TW1Pass,TW1Submit}
                                    Object.entries(myTW)
                                    .forEach((z:any,k)=>{

                                        let [keyz,valz] = z
                                        TWPanel
                                        .forEach((w:any,h)=>{

                                            if(w.appSocialLogin.type.includes(keyz) ){
                                                valz.push(w)
                                            }

                                        })

                                    })

                                    //show the probably only panel
                                    changePanel({
                                        closing:[],
                                        open:TW1,
                                        openBold:TW1Bold,
                                        ref,
                                        type:"component"
                                    })
                                    //

                                    // manage the tw account to the app
                                    TW1Submit
                                    .forEach((z:any,k)=>{
                                        z.click = (evt:Event) =>{

                                            iif(
                                                ()=> env.dev.socialLogin.addAcct.dummy,
                                                of({message:"OK"}),
                                                http.post(
                                                    env.backend.url,
                                                    {
                                                        env:"addTWAcct",
                                                        user:TW1User[0].value || "",
                                                        pass:TW1Pass[0].value || "",
                                                        access_token: ryber.appCO0.metadata.awsLogin.accessToken
                                                    },
                                                )
                                            )
                                            .pipe(
                                                catchError(ryber.socialLogin.general.catchError),
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

                        IGManage
                        .forEach((y:any,j)=>{

                            let relatedLazyLoadSub = ryber.appCO0.metadata.components.lazyLoad.current
                            .pipe(
                                filter((data:any)=>{ return data.zSymbol === IGView1[0] && data.co === extras.co}),
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
                                        open:IG,
                                        openBold:IGBold,
                                        ref
                                    })


                                },
                                error:console.log
                            })
                            valx.subscriptions.push(relatedLazyLoadSub)

                        })

                        IGView1
                        .forEach((y:any,j)=>{
                            let component= zChildren[y]
                            let lazyLoadSub = ryber.appCO0.metadata.components.lazyLoad.current
                            .pipe(
                                filter((data:any)=>{ return data.zSymbol === y && data.co === extras.co})
                            )
                            .subscribe({
                                next:(result:any)=>{

                                    let IGPanel = flatDeep(component.extras.options.panels,Infinity)
                                    let [IG1,IG1Bold,IG1User,IG1Pass,IG1Submit] =
                                    Array(5).fill(null).map( _=>[]);
                                    let myIG = {IG1,IG1Bold,IG1User,IG1Pass,IG1Submit}
                                    Object.entries(myIG)
                                    .forEach((z:any,k)=>{

                                        let [keyz,valz] = z
                                        IGPanel
                                        .forEach((w:any,h)=>{

                                            if(w.appSocialLogin.type.includes(keyz) ){
                                                valz.push(w)
                                            }

                                        })

                                    })

                                    //show the probably only panel
                                    changePanel({
                                        closing:[],
                                        open:IG1,
                                        openBold:IG1Bold,
                                        ref,
                                        type:"component"
                                    })
                                    //

                                    // manage the tw account to the app
                                    IG1Submit
                                    .forEach((z:any,k)=>{
                                        z.click = (evt:Event) =>{

                                            iif(
                                                ()=> env.dev.socialLogin.addAcct.dummy,
                                                of({message:"OK"}),
                                                http.post(
                                                    env.backend.url,
                                                    {
                                                        env:"addIGAcct",
                                                        user:IG1User[0].value || "",
                                                        pass:IG1Pass[0].value || "",
                                                        access_token: ryber.appCO0.metadata.awsLogin.accessToken
                                                    },
                                                )
                                            )
                                            .pipe(
                                                catchError(ryber.socialLogin.general.catchError),
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

                        PIManage
                        .forEach((y:any,j)=>{

                            let relatedLazyLoadSub = ryber.appCO0.metadata.components.lazyLoad.current
                            .pipe(
                                filter((data:any)=>{ return data.zSymbol === PIView1[0] && data.co === extras.co}),
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
                                        open:PI,
                                        openBold:PIBold,
                                        ref
                                    })


                                },
                                error:console.log
                            })
                            valx.subscriptions.push(relatedLazyLoadSub)

                        })

                        PIView1
                        .forEach((y:any,j)=>{
                            let component= zChildren[y]
                            let lazyLoadSub = ryber.appCO0.metadata.components.lazyLoad.current
                            .pipe(
                                filter((data:any)=>{ return data.zSymbol === y && data.co === extras.co})
                            )
                            .subscribe({
                                next:(result:any)=>{

                                    let PIPanel = flatDeep(component.extras.options.panels,Infinity)
                                    let [PI1,PI1Bold,PI1User,PI1Pass,PI1Submit] =
                                    Array(5).fill(null).map( _=>[]);
                                    let myPI = {PI1,PI1Bold,PI1User,PI1Pass,PI1Submit}
                                    Object.entries(myPI)
                                    .forEach((z:any,k)=>{

                                        let [keyz,valz] = z
                                        PIPanel
                                        .forEach((w:any,h)=>{

                                            if(w.appSocialLogin.type.includes(keyz) ){
                                                valz.push(w)
                                            }

                                        })

                                    })

                                    //show the probably only panel
                                    changePanel({
                                        closing:[],
                                        open:PI1,
                                        openBold:PI1Bold,
                                        ref,
                                        type:"component"
                                    })
                                    //

                                    // manage the tw account to the app
                                    PI1Submit
                                    .forEach((z:any,k)=>{
                                        z.click = (evt:Event) =>{

                                            iif(
                                                ()=> env.dev.socialLogin.addAcct.dummy,
                                                of({message:"OK"}),
                                                http.post(
                                                    env.backend.url,
                                                    {
                                                        env:"addPIAcct",
                                                        user:PI1User[0].value || "",
                                                        pass:PI1Pass[0].value || "",
                                                        access_token: ryber.appCO0.metadata.awsLogin.accessToken
                                                    },
                                                )
                                            )
                                            .pipe(
                                                catchError(ryber.socialLogin.general.catchError),
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

                        TMManage
                        .forEach((y:any,j)=>{

                            let relatedLazyLoadSub = ryber.appCO0.metadata.components.lazyLoad.current
                            .pipe(
                                filter((data:any)=>{ return data.zSymbol === TMView1[0] && data.co === extras.co}),
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
                                        open:TM,
                                        openBold:TMBold,
                                        ref
                                    })


                                },
                                error:console.log
                            })
                            valx.subscriptions.push(relatedLazyLoadSub)

                        })

                        TMView1
                        .forEach((y:any,j)=>{
                            let component= zChildren[y]
                            let lazyLoadSub = ryber.appCO0.metadata.components.lazyLoad.current
                            .pipe(
                                filter((data:any)=>{ return data.zSymbol === y && data.co === extras.co})
                            )
                            .subscribe({
                                next:(result:any)=>{

                                    let TMPanel = flatDeep(component.extras.options.panels,Infinity)
                                    let [TM1,TM1Bold,TM1User,TM1Pass,TM1Submit] =
                                    Array(5).fill(null).map( _=>[]);
                                    let myTM = {TM1,TM1Bold,TM1User,TM1Pass,TM1Submit}
                                    Object.entries(myTM)
                                    .forEach((z:any,k)=>{

                                        let [keyz,valz] = z
                                        TMPanel
                                        .forEach((w:any,h)=>{

                                            if(w.appSocialLogin.type.includes(keyz) ){
                                                valz.push(w)
                                            }

                                        })

                                    })

                                    //show the probably only panel
                                    changePanel({
                                        closing:[],
                                        open:TM1,
                                        openBold:TM1Bold,
                                        ref,
                                        type:"component"
                                    })
                                    //

                                    // manage the tw account to the app
                                    TM1Submit
                                    .forEach((z:any,k)=>{
                                        z.click = (evt:Event) =>{

                                            iif(
                                                ()=> env.dev.socialLogin.addAcct.dummy,
                                                of({message:"OK"}),
                                                http.post(
                                                    env.backend.url,
                                                    {
                                                        env:"addTMAcct",
                                                        user:TM1User[0].value || "",
                                                        pass:TM1Pass[0].value || "",
                                                        access_token: ryber.appCO0.metadata.awsLogin.accessToken
                                                    },
                                                )
                                            )
                                            .pipe(
                                                catchError(ryber.socialLogin.general.catchError),
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

                        DSManage
                        .forEach((y:any,j)=>{

                            let relatedLazyLoadSub = ryber.appCO0.metadata.components.lazyLoad.current
                            .pipe(
                                filter((data:any)=>{ return data.zSymbol === DSView1[0] && data.co === extras.co}),
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
                                        open:DS,
                                        openBold:DSBold,
                                        ref
                                    })


                                },
                                error:console.log
                            })
                            valx.subscriptions.push(relatedLazyLoadSub)

                        })

                        DSView1
                        .forEach((y:any,j)=>{
                            let component= zChildren[y]
                            let lazyLoadSub = ryber.appCO0.metadata.components.lazyLoad.current
                            .pipe(
                                filter((data:any)=>{ return data.zSymbol === y && data.co === extras.co})
                            )
                            .subscribe({
                                next:(result:any)=>{

                                    let DSPanel = flatDeep(component.extras.options.panels,Infinity)
                                    let [DS1,DS1Bold,DS1User,DS1Pass,DS1Submit] =
                                    Array(5).fill(null).map( _=>[]);
                                    let myDS = {DS1,DS1Bold,DS1User,DS1Pass,DS1Submit}
                                    Object.entries(myDS)
                                    .forEach((z:any,k)=>{

                                        let [keyz,valz] = z
                                        DSPanel
                                        .forEach((w:any,h)=>{

                                            if(w.appSocialLogin.type.includes(keyz) ){
                                                valz.push(w)
                                            }

                                        })

                                    })

                                    //show the probably only panel
                                    changePanel({
                                        closing:[],
                                        open:DS1,
                                        openBold:DS1Bold,
                                        ref,
                                        type:"component"
                                    })
                                    //

                                    // manage the tw account to the app
                                    DS1Submit
                                    .forEach((z:any,k)=>{
                                        z.click = (evt:Event) =>{

                                            iif(
                                                ()=> env.dev.socialLogin.addAcct.dummy,
                                                of({message:"OK"}),
                                                http.post(
                                                    env.backend.url,
                                                    {
                                                        env:"addDSAcct",
                                                        user:DS1User[0].value || "",
                                                        pass:DS1Pass[0].value || "",
                                                        access_token: ryber.appCO0.metadata.awsLogin.accessToken
                                                    },
                                                )
                                            )
                                            .pipe(
                                                catchError(ryber.socialLogin.general.catchError),
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

                        RDITManage
                        .forEach((y:any,j)=>{

                            let relatedLazyLoadSub = ryber.appCO0.metadata.components.lazyLoad.current
                            .pipe(
                                filter((data:any)=>{ return data.zSymbol === RDITView1[0] && data.co === extras.co}),
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
                                        open:RDIT,
                                        openBold:RDITBold,
                                        ref
                                    })


                                },
                                error:console.log
                            })
                            valx.subscriptions.push(relatedLazyLoadSub)

                        })

                        RDITView1
                        .forEach((y:any,j)=>{
                            let component= zChildren[y]
                            let lazyLoadSub = ryber.appCO0.metadata.components.lazyLoad.current
                            .pipe(
                                filter((data:any)=>{ return data.zSymbol === y && data.co === extras.co})
                            )
                            .subscribe({
                                next:(result:any)=>{

                                    let RDITPanel = flatDeep(component.extras.options.panels,Infinity)
                                    let [RDIT1,RDIT1Bold,RDIT1User,RDIT1Pass,RDIT1Submit] =
                                    Array(5).fill(null).map( _=>[]);
                                    let myRDIT = {RDIT1,RDIT1Bold,RDIT1User,RDIT1Pass,RDIT1Submit}
                                    Object.entries(myRDIT)
                                    .forEach((z:any,k)=>{

                                        let [keyz,valz] = z
                                        RDITPanel
                                        .forEach((w:any,h)=>{

                                            if(w.appSocialLogin.type.includes(keyz) ){
                                                valz.push(w)
                                            }

                                        })

                                    })

                                    //show the probably only panel
                                    changePanel({
                                        closing:[],
                                        open:RDIT1,
                                        openBold:RDIT1Bold,
                                        ref,
                                        type:"component"
                                    })
                                    //

                                    // manage the tw account to the app
                                    RDIT1Submit
                                    .forEach((z:any,k)=>{
                                        z.click = (evt:Event) =>{

                                            iif(
                                                ()=> env.dev.socialLogin.addAcct.dummy,
                                                of({message:"OK"}),
                                                http.post(
                                                    env.backend.url,
                                                    {
                                                        env:"addRDITAcct",
                                                        user:RDIT1User[0].value || "",
                                                        pass:RDIT1Pass[0].value || "",
                                                        access_token: ryber.appCO0.metadata.awsLogin.accessToken
                                                    },
                                                )
                                            )
                                            .pipe(
                                                catchError(ryber.socialLogin.general.catchError),
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

                        BLOGManage
                        .forEach((y:any,j)=>{

                            let relatedLazyLoadSub = ryber.appCO0.metadata.components.lazyLoad.current
                            .pipe(
                                filter((data:any)=>{ return data.zSymbol === BLOGView1[0] && data.co === extras.co}),
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
                                        open:BLOG,
                                        openBold:BLOGBold,
                                        ref
                                    })


                                },
                                error:console.log
                            })
                            valx.subscriptions.push(relatedLazyLoadSub)

                        })

                        BLOGView1
                        .forEach((y:any,j)=>{
                            let component= zChildren[y]
                            let lazyLoadSub = ryber.appCO0.metadata.components.lazyLoad.current
                            .pipe(
                                filter((data:any)=>{ return data.zSymbol === y && data.co === extras.co})
                            )
                            .subscribe({
                                next:(result:any)=>{

                                    let BLOGPanel = flatDeep(component.extras.options.panels,Infinity)
                                    let [BLOG1,BLOG1Bold,BLOG1User,BLOG1Pass,BLOG1Submit] =
                                    Array(5).fill(null).map( _=>[]);
                                    let myBLOG = {BLOG1,BLOG1Bold,BLOG1User,BLOG1Pass,BLOG1Submit}
                                    Object.entries(myBLOG)
                                    .forEach((z:any,k)=>{

                                        let [keyz,valz] = z
                                        BLOGPanel
                                        .forEach((w:any,h)=>{

                                            if(w.appSocialLogin.type.includes(keyz) ){
                                                valz.push(w)
                                            }

                                        })

                                    })

                                    //show the probably only panel
                                    changePanel({
                                        closing:[],
                                        open:BLOG1,
                                        openBold:BLOG1Bold,
                                        ref,
                                        type:"component"
                                    })
                                    //

                                    // manage the tw account to the app
                                    BLOG1Submit
                                    .forEach((z:any,k)=>{
                                        z.click = (evt:Event) =>{

                                            iif(
                                                ()=> env.dev.socialLogin.addAcct.dummy,
                                                of({message:"OK"}),
                                                http.post(
                                                    env.backend.url,
                                                    {
                                                        env:"addBLOGAcct",
                                                        user:BLOG1User[0].value || "",
                                                        pass:BLOG1Pass[0].value || "",
                                                        access_token: ryber.appCO0.metadata.awsLogin.accessToken
                                                    },
                                                )
                                            )
                                            .pipe(
                                                catchError(ryber.socialLogin.general.catchError),
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

                        TWHManage
                        .forEach((y:any,j)=>{

                            let relatedLazyLoadSub = ryber.appCO0.metadata.components.lazyLoad.current
                            .pipe(
                                filter((data:any)=>{ return data.zSymbol === TWHView1[0] && data.co === extras.co}),
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
                                        open:TWH,
                                        openBold:TWHBold,
                                        ref
                                    })


                                },
                                error:console.log
                            })
                            valx.subscriptions.push(relatedLazyLoadSub)

                        })

                        TWHView1
                        .forEach((y:any,j)=>{
                            let component= zChildren[y]
                            let lazyLoadSub = ryber.appCO0.metadata.components.lazyLoad.current
                            .pipe(
                                filter((data:any)=>{ return data.zSymbol === y && data.co === extras.co})
                            )
                            .subscribe({
                                next:(result:any)=>{

                                    let TWHPanel = flatDeep(component.extras.options.panels,Infinity)
                                    let [TWH1,TWH1Bold,TWH1User,TWH1Pass,TWH1Submit] =
                                    Array(5).fill(null).map( _=>[]);
                                    let myTWH = {TWH1,TWH1Bold,TWH1User,TWH1Pass,TWH1Submit}
                                    Object.entries(myTWH)
                                    .forEach((z:any,k)=>{

                                        let [keyz,valz] = z
                                        TWHPanel
                                        .forEach((w:any,h)=>{

                                            if(w.appSocialLogin.type.includes(keyz) ){
                                                valz.push(w)
                                            }

                                        })

                                    })

                                    //show the probably only panel
                                    changePanel({
                                        closing:[],
                                        open:TWH1,
                                        openBold:TWH1Bold,
                                        ref,
                                        type:"component"
                                    })
                                    //

                                    // manage the tw account to the app
                                    TWH1Submit
                                    .forEach((z:any,k)=>{
                                        z.click = (evt:Event) =>{

                                            iif(
                                                ()=> env.dev.socialLogin.addAcct.dummy,
                                                of({message:"OK"}),
                                                http.post(
                                                    env.backend.url,
                                                    {
                                                        env:"addTWHAcct",
                                                        user:TWH1User[0].value || "",
                                                        pass:TWH1Pass[0].value || "",
                                                        access_token: ryber.appCO0.metadata.awsLogin.accessToken
                                                    },
                                                )
                                            )
                                            .pipe(
                                                catchError(ryber.socialLogin.general.catchError),
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

                        PTManage
                        .forEach((y:any,j)=>{

                            let relatedLazyLoadSub = ryber.appCO0.metadata.components.lazyLoad.current
                            .pipe(
                                filter((data:any)=>{ return data.zSymbol === PTView1[0] && data.co === extras.co}),
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
                                        open:PT,
                                        openBold:PTBold,
                                        ref
                                    })


                                },
                                error:console.log
                            })
                            valx.subscriptions.push(relatedLazyLoadSub)

                        })

                        PTView1
                        .forEach((y:any,j)=>{
                            let component= zChildren[y]
                            let lazyLoadSub = ryber.appCO0.metadata.components.lazyLoad.current
                            .pipe(
                                filter((data:any)=>{ return data.zSymbol === y && data.co === extras.co})
                            )
                            .subscribe({
                                next:(result:any)=>{

                                    let PTPanel = flatDeep(component.extras.options.panels,Infinity)
                                    let [PT1,PT1Bold,PT1User,PT1Pass,PT1Submit] =
                                    Array(5).fill(null).map( _=>[]);
                                    let myPT = {PT1,PT1Bold,PT1User,PT1Pass,PT1Submit}
                                    Object.entries(myPT)
                                    .forEach((z:any,k)=>{

                                        let [keyz,valz] = z
                                        PTPanel
                                        .forEach((w:any,h)=>{

                                            if(w.appSocialLogin.type.includes(keyz) ){
                                                valz.push(w)
                                            }

                                        })

                                    })

                                    //show the probably only panel
                                    changePanel({
                                        closing:[],
                                        open:PT1,
                                        openBold:PT1Bold,
                                        ref,
                                        type:"component"
                                    })
                                    //

                                    // manage the tw account to the app
                                    PT1Submit
                                    .forEach((z:any,k)=>{
                                        z.click = (evt:Event) =>{

                                            iif(
                                                ()=> env.dev.socialLogin.addAcct.dummy,
                                                of({message:"OK"}),
                                                http.post(
                                                    env.backend.url,
                                                    {
                                                        env:"addPTAcct",
                                                        user:PT1User[0].value || "",
                                                        pass:PT1Pass[0].value || "",
                                                        access_token: ryber.appCO0.metadata.awsLogin.accessToken
                                                    },
                                                )
                                            )
                                            .pipe(
                                                catchError(ryber.socialLogin.general.catchError),
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
                loadedScripts
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

