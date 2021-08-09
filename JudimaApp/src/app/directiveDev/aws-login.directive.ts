import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest, pipe, iif } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy, navigationType,judimaDirective,flatDeep,changePanel } from '../customExports'
import { catchError, delay, first, take,concatMap,tap, exhaustMap, takeWhile, filter } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { resourceLimits } from 'worker_threads';



@Directive({
    selector: '[appAwsLogin]'
})
export class AwsLoginDirective {


    @Input() awsLogin: any;
    extras: any;
    appExtras:any = {
        selector:"appAwsLogin",
        name:"awsLogin" // the lowercase name of the directive
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

                        let signIn = Array.from(valx.types['signIn'] || [])
                        let createAccount = Array.from(valx.types['createAccount'] || [])
                        let mainLogin:Array<string> = Array.from(valx.types['mainLogin'] || [])
                        let mainLoginContainer:Array<string> = Array.from(valx.types['mainLoginContainer'] || [])
                        let mainLoginBold:Array<string> = Array.from(valx.types['mainLoginBold'] || [])

                        // create
                        let create1:Array<string> = Array.from(valx.types['create1'] || [])
                        let create1Input  :Array<string>= Array.from(valx.types['create1Input'] || [])
                        let create1Button :Array<string>= Array.from(valx.types['create1Button'] || [])
                        let create1User        :Array<string>= Array.from(valx.types['create1User'] || [])
                        let create1Pass        :Array<string>= Array.from(valx.types['create1Pass'] || [])
                        let create1ConfirmPass :Array<string>= Array.from(valx.types['create1ConfirmPass'] || [])
                        let create1PassError   :Array<string>= Array.from(valx.types['create1PassError'] || [])
                        let create2:Array<string> = Array.from(valx.types['create2'] || [])
                        let create2Bold:Array<string> = Array.from(valx.types['create2Bold'] || [])
                        let create2QR:Array<string> = Array.from(valx.types['create2QR'] || [])
                        let create2Submit:Array<string> = Array.from(valx.types['create2Submit'] || [])
                        let create2TOTP:Array<string> = Array.from(valx.types['create2TOTP'] || [])
                        let create3:Array<string> = Array.from(valx.types['create3'] || [])
                        let create3Bold:Array<string> = Array.from(valx.types['create3Bold'] || [])
                        let create4:Array<string> = Array.from(valx.types['create4'] || [])
                        var create4Bold:Array<string> = Array.from(valx.types['create4Bold'] || [])
                        let create4Input:Array<string> = Array.from(valx.types['create4Input'] || [])
                        let create4Submit :Array<string> = Array.from(valx.types['create4Submit'] || [])
                        let create4Resend:Array<string> = Array.from(valx.types['create4Resend'] || [])
                        //

                        // sign in
                        let signIn1:Array<string> = Array.from(valx.types['signIn1'] || [])
                        let signIn1Bold:Array<string> = Array.from(valx.types['signIn1Bold'] || [])
                        let signIn1Submit:Array<string> = Array.from(valx.types['signIn1Submit'] || [])
                        let signIn1User:Array<string> = Array.from(valx.types['signIn1User'] || [])
                        let signIn1Pass:Array<string> = Array.from(valx.types['signIn1Pass'] || [])
                        let signIn1TOTP:Array<string> = Array.from(valx.types['signIn1TOTP'] || [])
                        let signIn2Bold:Array<string> = Array.from(valx.types['signIn2Bold'] || [])
                        let signIn2:Array<string> = Array.from(valx.types['signIn2'] || [])
                        //

                        // change password
                        let password :Array<string> = Array.from(valx.types['password'] || [])
                        let password1:Array<string> = Array.from(valx.types['password1'] || [])
                        let password1Bold:Array<string> = Array.from(valx.types['password1Bold'] || [])
                        let password1Submit:Array<string> = Array.from(valx.types['password1Submit'] || [])
                        let password1User:Array<string> = Array.from(valx.types['password1User'] || [])
                        let password1Pass:Array<string> = Array.from(valx.types['password1Pass'] || [])
                        let password1TOTP:Array<string> = Array.from(valx.types['password1TOTP'] || [])
                        let password2Bold:Array<string> = Array.from(valx.types['password2Bold'] || [])
                        let password2:Array<string> = Array.from(valx.types['password2'] || [])
                        let password2OldPass:Array<string> = Array.from(valx.types['password2OldPass'] || [])
                        let password2NewPass:Array<string> = Array.from(valx.types['password2NewPass'] || [])
                        let password2ConfirmPass:Array<string> = Array.from(valx.types['password2ConfirmPass'] || [])
                        let password2Submit:Array<string> = Array.from(valx.types['password2Submit'] || [])
                        let password2PassError:Array<string> = Array.from(valx.types['password2PassError'] || [])
                        let password3:Array<string> = Array.from(valx.types['password3'] || [])
                        let password3Bold:Array<string> = Array.from(valx.types['password3Bold'] || [])

                        //

                        // delete Acct
                        let delAcct:Array<string> = Array.from(valx.types['delAcct'] || [])
                        let delete1:Array<string> = Array.from(valx.types['delete1'] || [])
                        let delete1Bold:Array<string> = Array.from(valx.types['delete1Bold'] || [])
                        let delete1Component:Array<string> = Array.from(valx.types['delete1Component'] || [])
                        //

                        // dummy
                        // ryber.appCO0.metadata.awsLogin.user = "michaelodumosu57@gmail.com"
                        // ryber.appCO0.metadata.awsLogin.pass = "Turkey123456"
                        //
                        mainLoginContainer
                        .forEach((y:any,j)=>{

                            // hide all other login flows
                            let loginFlows = [...create1,...create2,...create3,...create4,...signIn1,...signIn2,...password1,...password2,...password3,...delete1]
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



                        // delete account
                        delAcct
                        .forEach((y:any,j)=>{

                            // show delete1
                                // this gets lazyloaded we must indicate when to allow this to work

                            let relatedLazyLoadSub = ryber.appCO0.metadata.components.lazyLoad.current
                            .pipe(
                                filter((data:any)=>{ return data.zSymbol === delete1Component[0] && data.co === extras.co}),
                                take(1)
                            )
                            .subscribe({
                                next:()=>{

                                    let showDelete1 = fromEvent(zChildren[y].element,'click')
                                    .subscribe({
                                        next:(result:any)=>{


                                            changePanel({
                                                closing:mainLogin,
                                                zChildren,
                                                open:delete1,
                                                openBold:delete1Bold,
                                                ref
                                            });


                                            ref.detectChanges()
                                        },
                                        error:(err:any)=>{

                                        }
                                    })
                                    valx.subscriptions.push(showDelete1)
                                }
                            })
                            valx.subscriptions.push(relatedLazyLoadSub)


                            //
                        })

                        delete1Component
                        .forEach((y:any,j)=>{
                            let component= zChildren[y]
                            let lazyLoadSub = ryber.appCO0.metadata.components.lazyLoad.current
                            .pipe(
                                filter((data:any)=>{ return data.zSymbol === y && data.co === extras.co})
                            )
                            .subscribe({
                                next:()=>{


                                    let deletePanels = flatDeep(component.extras.options.panels,Infinity)
                                    let [delete1Bold,delete1,delete1User,delete1Pass,delete1Submit,delete1Error,delete1TOTP,delete2,delete2Bold,delete2Submit,delete2Cancel,delete3,delete3Bold] =
                                    Array(13).fill(null).map( _=>[]);
                                    let myDelete = {delete1Bold,delete1,delete1User,delete1Pass,delete1Submit,delete1Error,delete1TOTP,delete2,delete2Bold,delete2Submit,delete2Cancel,delete3,delete3Bold}
                                    Object.entries(myDelete)
                                    .forEach((z:any,k)=>{

                                        let [keyz,valz] = z
                                        deletePanels
                                        .forEach((w:any,h)=>{

                                            if(w.appAwsLogin.type.includes(keyz) ){
                                                valz.push(w)
                                            }

                                        })

                                    })

                                    // show the first panel

                                    changePanel({
                                        closing:[...delete2,...delete3],
                                        open:delete1,
                                        openBold:delete1Bold,
                                        ref,
                                        type:"component"
                                    })
                                    //

                                    // sign in with userand pass
                                    delete1Submit
                                    .forEach((z:any,k)=>{

                                        z.click = (e:Event)=>{

                                            iif(
                                                ()=>{return env.dev.deleteSignIn.dummy},
                                                of({message:"OK"}),
                                                http.post(
                                                    env.backend.url,
                                                    {
                                                        env:"signInUserPassTOTP",
                                                        user:delete1User[0].value || "",
                                                        pass:delete1Pass[0].value || "",
                                                        totp:delete1TOTP[0].value || "",
                                                    },
                                                    {
                                                        withCredentials:true,
                                                        headers: {
                                                            "Content-Type": "text/plain"
                                                        }
                                                    }
                                                )
                                            )
                                            .pipe(
                                                catchError(ryber.aws.signInUserPassTOTP.catchError),
                                                takeWhile((val:any)=>{return val.message !== 'OK'},true)
                                            )
                                            .subscribe({
                                                next:(result:any)=>{

                                                    if(result.message === 'OK'){
                                                        ryber.appCO0.metadata.awsLogin.user = delete1User[0].value
                                                        ryber.appCO0.metadata.awsLogin.accessToken = result.access_token
                                                        if(env.testingAcct.confirm === "true"){
                                                            window.judima_environment.accessToken = result.access_token
                                                        }


                                                        changePanel({
                                                            closing:delete1,
                                                            open:delete2,
                                                            openBold:delete2Bold,
                                                            ref,
                                                            type:"component"
                                                        })
                                                    }
                                                }
                                            })
                                        }
                                    })
                                    //

                                    // user wants to delete account
                                    delete2Submit
                                    .forEach((z:any,k)=>{

                                        z.click = (e:Event)=>{

                                            iif(
                                                ()=>{return env.dev.deleteConfirm.dummy},
                                                of({message:"OK"}),
                                                http.post(
                                                    env.backend.url,
                                                    {
                                                        env:"deleteAcct",
                                                        access_token: ryber.appCO0.metadata.awsLogin.accessToken
                                                    },
                                                    {
                                                        withCredentials:true,
                                                        headers: {
                                                            "Content-Type": "text/plain"
                                                        }
                                                    }
                                                )
                                            )
                                            .pipe(
                                                catchError(ryber.aws.general.catchError),
                                                takeWhile((val:any)=>{return val.message !== 'OK'},true)
                                            )
                                            .subscribe({
                                                next:(result:any)=>{

                                                    if(result.message === 'OK'){
                                                        ryber.appCO0.metadata.awsLogin.user = ""
                                                        ryber.appCO0.metadata.awsLogin.accessToken = ""
                                                        if(env.testingAcct.confirm === "true"){
                                                            window.judima_environment.accessToken = ""
                                                        }

                                                        changePanel({
                                                            closing:delete2,
                                                            open:delete3,
                                                            openBold:delete3Bold,
                                                            ref,
                                                            type:"component"
                                                        })
                                                    }
                                                }
                                            })
                                        }
                                    })
                                    //

                                    // user wants to keep account
                                    delete2Cancel
                                    .forEach((z:any,k)=>{
                                        z.click = (e:Event)=>{
                                            changePanel({
                                                closing:delete2,
                                                open:[],
                                                openBold:[],
                                                ref,
                                                type:"component"
                                            })
                                            // console.log(mainLoginBold)
                                            changePanel({
                                                closing:delete1Component,
                                                zChildren,
                                                open:mainLogin,
                                                openBold:mainLoginBold,
                                                ref
                                            });
                                        }
                                    })
                                    //
                                }
                            })
                            valx.subscriptions.push(lazyLoadSub)
                            //
                            //
                        })
                        //

                        // change password
                        password
                        .forEach((y:any,j)=>{
                            // show the elements for signIn
                            let showPassword1 = fromEvent(zChildren[y].element,'click')
                            .subscribe({
                                next:(result:any)=>{

                                    changePanel({
                                        closing:mainLogin,
                                        zChildren,
                                        open:password1,
                                        openBold:password1Bold,
                                        ref
                                    })

                                },
                                error:(err:any)=>{

                                }
                            })
                            valx.subscriptions.push(showPassword1)
                            //
                        })

                        password1Submit
                        .forEach((y:any,j)=>{

                            // sign in with userand pass
                            let userPassEvent = fromEvent(zChildren[y].element,'click')
                            .pipe(
                                exhaustMap(()=>{
                                    return iif(
                                        ()=>{return env.dev.passSignIn.dummy},
                                        of({message:"OK"}),
                                        http.post(
                                            env.backend.url,
                                            {
                                                env:"signInUserPassTOTP",
                                                user:zChildren[password1User[0]].element.value,
                                                pass:zChildren[password1Pass[0]].element.value,
                                                totp:zChildren[password1TOTP[0]].element.value,
                                            },
                                            {
                                                withCredentials:true,
                                                headers: {
                                                    "Content-Type": "text/plain"
                                                }
                                            }
                                        )
                                    )
                                    .pipe(
                                        catchError(ryber.aws.signInUserPassTOTP.catchError)
                                    )
                                }),

                            )
                            .subscribe({
                                next:(result:any)=>{

                                    if(result.message === "OK"){
                                        ryber.appCO0.metadata.awsLogin.user = zChildren[password1User[0]].element.value
                                        ryber.appCO0.metadata.awsLogin.accessToken = result.access_token
                                        if(env.testingAcct.confirm === "true"){
                                            window.judima_environment.accessToken = result.access_token
                                        }

                                        changePanel({
                                            closing:password1,
                                            zChildren,
                                            open:password2,
                                            openBold:password2Bold,
                                            ref
                                        })

                                    }
                                },
                                error:(err:any)=>{

                                }
                            })
                            valx.subscriptions.push(userPassEvent)
                            //
                        })

                        password2Submit
                        .forEach((y:any,j)=>{

                            // ask the backend if the credentials are ok to change the password
                            let changePassEvent = fromEvent(zChildren[y].element,'click')
                            .pipe(
                                exhaustMap(()=>{

                                    let passOld = zChildren[password2OldPass[0]]
                                    let passNew = zChildren[password2NewPass[0]]
                                    let comfirm = zChildren[password2ConfirmPass[0]]
                                    let error   = zChildren[password2PassError[0]]

                                    //password check
                                    if(comfirm.element.value !== passNew.element.value){
                                        error.innerText.item= "New Password and Confirm Password does not match, Please Try Again"
                                        ref.detectChanges()
                                        return of({message:"Pass Mismatch"})
                                    }

                                    else if(passNew.element.value.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*/) === null || passNew.element.value.length < 12){
                                        error.innerText.item= `Password Must be a minimun of 12 characters,
                                        At least 1 number, and 1 Uppercase and Lowercase letter`
                                        ref.detectChanges()
                                        return of({message:"Broken Rules"})
                                    }


                                    return iif(
                                        ()=>{return env.dev.passChange.dummy},
                                        of({message:"OK"}),
                                        http.post(
                                            env.backend.url,
                                            {
                                                env:"changePass",
                                                old_pass:zChildren[password2OldPass[0]].element.value,
                                                new_pass:zChildren[password2NewPass[0]].element.value,
                                                confirm_pass:zChildren[password2ConfirmPass[0]].element.value,
                                                access_token:ryber.appCO0.metadata.awsLogin.accessToken
                                            },
                                        )
                                    )
                                    .pipe(
                                        catchError((err:any)=>{
                                            if(err.error === "Unauthenticated"){
                                                alert("Incorrect Username or Password or six-digit code Please Try Again")
                                            }
                                            return of([])
                                        })
                                    )
                                }),

                            )
                            .subscribe({
                                next:(result:any)=>{

                                    if(result.message === "OK"){
                                        ryber.appCO0.metadata.awsLogin.user = zChildren[password1User[0]].element.value
                                        ryber.appCO0.metadata.awsLogin.accessToken = result.access_token
                                        if(env.testingAcct.confirm === "true"){
                                            window.judima_environment.accessToken = result.access_token
                                        }

                                        changePanel({
                                            closing:password2,
                                            zChildren,
                                            open:password3,
                                            openBold:password3Bold,
                                            ref
                                        });
                                    }
                                },
                                error:(err:any)=>{

                                }
                            })
                            valx.subscriptions.push(changePassEvent)
                            //
                        })
                        //

                        // signIn
                        signIn
                        .forEach((y:any,j)=>{
                            // show the elements for signIn
                            let showSignIn1 = fromEvent(zChildren[y].element,'click')
                            .subscribe({
                                next:(result:any)=>{

                                    changePanel({
                                        closing:mainLogin,
                                        zChildren,
                                        open:signIn1,
                                        openBold:signIn1Bold,
                                        ref
                                    })

                                },
                                error:(err:any)=>{

                                }
                            })
                            valx.subscriptions.push(showSignIn1)
                            //
                        })

                        signIn1Submit
                        .forEach((y:any,j)=>{

                            // sign in with userand pass
                            let userPassEvent = fromEvent(zChildren[y].element,'click')
                            .pipe(
                                exhaustMap(()=>{
                                    return iif(
                                        ()=>{return env.dev.totpSignIn.dummy},
                                        of({message:"OK"}),
                                        http.post(
                                            env.backend.url,
                                            {
                                                env:"signInUserPassTOTP",
                                                user:zChildren[signIn1User[0]].element.value,
                                                pass:zChildren[signIn1Pass[0]].element.value,
                                                totp:zChildren[signIn1TOTP[0]].element.value,
                                            },
                                            {
                                                withCredentials:true,
                                                headers: {
                                                    "Content-Type": "text/plain"
                                                }
                                            }
                                        )
                                    )
                                    .pipe(
                                        catchError(ryber.aws.signInUserPassTOTP.catchError)
                                    )
                                }),

                            )
                            .subscribe({
                                next:(result:any)=>{

                                    if(result.message === "OK"){
                                        ryber.appCO0.metadata.awsLogin.user = zChildren[signIn1User[0]].element.value
                                        ryber.appCO0.metadata.awsLogin.accessToken = result.access_token
                                        if(env.testingAcct.confirm === "true"){
                                            window.judima_environment.accessToken = result.access_token
                                        }

                                        changePanel({
                                            closing:signIn1,
                                            zChildren,
                                            open:signIn2,
                                            openBold:signIn2Bold,
                                            ref
                                        })
                                    }
                                },
                                error:(err:any)=>{

                                }
                            })
                            valx.subscriptions.push(userPassEvent)
                            //
                        })
                        //


                        // createAccount
                        createAccount
                        .forEach((y:any,j)=>{


                            // show the elements for create account
                            let showCreate1 = fromEvent(zChildren[y].element,'click')
                            .subscribe({
                                next:(result:any)=>{

                                    changePanel({
                                        closing:mainLogin,
                                        zChildren,
                                        open:create1,
                                        openBold:create1Input,
                                        ref
                                    })

                                },
                                error:(err:any)=>{

                                }
                            })
                            valx.subscriptions.push(showCreate1)
                            //
                        })

                        create1Button
                        .forEach((y:any,j)=>{

                            let createAcctEvent = fromEvent(zChildren[y].element,'click')
                            .subscribe({
                                next:(result:any)=>{


                                    let creds = {
                                        user:zChildren[create1User[0]].element.value,
                                        pass:zChildren[create1Pass[0]].element.value,
                                        confirmPass:zChildren[create1ConfirmPass[0]].element.value,
                                    }

                                    // verify the credentials
                                    if(creds.user.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) === null){
                                        // let the user know
                                        zChildren[create1PassError[0]].innerText.item =
                                        "please provide an email"
                                        ref.detectChanges()
                                        return
                                    }
                                    else if(creds.pass !== creds.confirmPass){
                                        // let the user know
                                        zChildren[create1PassError[0]].innerText.item =
                                        "passwords do not match"
                                        ref.detectChanges()
                                        return
                                    }
                                    else if(creds.pass.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*/) === null){
                                        // show them the rules
                                        zChildren[create1PassError[0]].innerText.item =
                                        "Create and confirm passord according to the instructions"
                                        ref.detectChanges()
                                        return
                                    }
                                    else if(creds.pass.length < 12){
                                        // show them the rules
                                        zChildren[create1PassError[0]].innerText.item =
                                        "Create and confirm passord according to the instructions"
                                        ref.detectChanges()
                                        return
                                    }
                                    ref.detectChanges()
                                    //

                                    iif(
                                        ()=>{return env.dev.createAccount.dummy},
                                        of({message:"OK"}),
                                        http.post(
                                            env.backend.url,
                                            {
                                                env:"createAccount",
                                                user:creds.user,
                                                pass:creds.pass,
                                            },
                                            {
                                                headers:{
                                                    "Content-Type":"text/plain"
                                                }
                                            }
                                        )
                                    )
                                    .pipe(
                                        take(1),
                                        catchError(
                                            ryber.aws.createAccount.catchError({
                                                create1PassError,ref,changePanel,create1,zChildren,mainLogin,mainLoginBold
                                            })
                                        )
                                    )
                                    .subscribe({
                                        next:(result:any)=>{
                                            if(result.message === "OK"){
                                                // hold on to creds for the user to confirm their account
                                                ryber.appCO0.metadata.awsLogin.user = creds.user
                                                ryber.appCO0.metadata.awsLogin.pass= creds.pass
                                                //


                                                // let the user know they need to check the email for the confirmation code
                                                    // setup create4
                                                changePanel({
                                                    closing:create1,
                                                    zChildren,
                                                    open:create4,
                                                    openBold:create4Bold,
                                                    ref
                                                })
                                                //
                                            }
                                        },
                                        error:console.log
                                    })

                                },
                                error:(err:any)=>{

                                }
                            })

                            valx.subscriptions.push(createAcctEvent)
                        })

                        create4Submit
                        .forEach((y:any,j)=>{

                            let submitEvent = fromEvent(zChildren[y].element,'click')
                            .pipe(
                                concatMap(()=>{
                                    return iif(
                                        ()=>{return env.dev.confCode.dummy},
                                        of({message:"OK"}),
                                        http.post(
                                            env.backend.url,
                                            {
                                                env:"confirmAccount",
                                                conf_code: zChildren[create4Input[0]].element.value,
                                                user:ryber.appCO0.metadata.awsLogin.user,
                                                pass:ryber.appCO0.metadata.awsLogin.pass,
                                            },
                                            {
                                                withCredentials:true,
                                                headers:{
                                                    "Content-Type":"text/plain"
                                                }
                                            }
                                        )
                                    )
                                    .pipe(
                                        catchError(ryber.aws.confirmAccount.catchError),
                                    )
                                }),
                                catchError(ryber.aws.confirmAccount.catchError),
                            )
                            .subscribe({
                                next:(result:any)=>{

                                    if(result.message === "OK"){
                                        // in memory for the accessToken
                                        ryber.appCO0.metadata.awsLogin.accessToken = result.access_token
                                        ryber.appCO0.metadata.awsLogin.accessTokenSub.next({
                                            received:"true"
                                        })
                                        if(env.testingAcct.confirm === "true"){
                                            window.judima_environment.accessToken = result.access_token
                                        }
                                        //

                                        // delete the password
                                        delete ryber.appCO0.metadata.awsLogin.pass
                                        //

                                        // let the user know they confirm account via TOTP MFA
                                            // setup create2
                                        changePanel({
                                            closing:create4,
                                            zChildren,
                                            open:create2,
                                            openBold:create2Bold,
                                            ref
                                        })
                                        //
                                    }
                                },
                                error:(err:any)=>{

                                }
                            })
                            valx.subscriptions.push(submitEvent)
                        })

                        create4Resend
                        .forEach((y:any,j)=>{

                            let resendEvent = fromEvent(zChildren[y].element,'click')
                            .pipe(
                                exhaustMap(()=>{
                                    return http.post(
                                        env.backend.url,
                                        {
                                            env:"resendCode",
                                            conf_code: zChildren[create4Input[0]].element.value,
                                            user:ryber.appCO0.metadata.awsLogin.user,
                                        }
                                    )
                                }),
                                catchError((err)=>{return of(err)}),
                                tap(console.log),

                            )
                            .subscribe({
                                next:(result:any)=>{alert("Sent")},
                            })
                            valx.subscriptions.push(resendEvent)
                        })

                        create2QR
                        .forEach((y:any,j)=>{


                            // get the QR code from the backend
                            let dummy =ryber.appCO0.metadata.awsLogin.accessTokenSub
                            .pipe(
                                concatMap((result:any)=>{
                                    if(result.received === "true"){
                                        return http.post(
                                            env.backend.url,
                                            {
                                                env:"QR_init",
                                                user:ryber.appCO0.metadata.awsLogin.user,
                                                access_token:ryber.appCO0.metadata.awsLogin.accessToken
                                            }
                                        )
                                    }
                                    return of("No Access Token")
                                }),
                                concatMap((result:any)=>{
                                    zChildren[y].extras.options.qrdata =
                                    `otpauth://totp/socialSpace:${ryber.appCO0.metadata.awsLogin.user}?secret=${result.QR_code}&issuer=socialSpace`
                                    ref.detectChanges()
                                    if(env.testingAcct.confirm === "true"){
                                        window.judima_environment.QRcode = result.QR_code
                                    }
                                    return of([])
                                }),
                                catchError(ryber.aws.general.catchError)
                            )
                            .subscribe()
                            valx.subscriptions.push(dummy)


                            //
                        })

                        create2Submit
                        .forEach((y:any,j)=>{



                            // TOTP MFA auth
                            let submitEvent= fromEvent(zChildren[y].element,'click')
                            .pipe(
                                exhaustMap(()=>{
                                    return iif(
                                        ()=>{return env.dev.totpCreateAccount.dummy},
                                        of({message:"OK"}),
                                        http.post(
                                            env.backend.url,
                                            {
                                                env:"QR_TOTP",
                                                totp:zChildren[create2TOTP[0]].element.value,
                                                access_token:ryber.appCO0.metadata.awsLogin.accessToken
                                            },
                                            {
                                                withCredentials:true,
                                                headers:{
                                                    "Content-Type":"text/plain"
                                                }
                                            }
                                        )
                                    )
                                    .pipe(
                                        catchError(ryber.aws.signInUserPassTOTP.catchError),
                                        tap(console.log),
                                    )
                                }),
                                concatMap((result:any)=>{

                                    if(result.message === "OK"){
                                        // the user has verified with and TOTP MFA
                                            // show create3

                                            changePanel({
                                                closing:create2,
                                                zChildren,
                                                open:create3,
                                                openBold:create3Bold,
                                                ref
                                            })
                                        //
                                    }
                                    return of([])
                                }),
                                catchError((err)=>{
                                    return of([])
                                })
                            )
                            .subscribe()
                            valx.subscriptions.push(submitEvent)
                            //
                        })
                        //

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

