import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef,Injector, ViewRef,ComponentFactoryResolver, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest,defer,concat } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy, navigationType,judimaDirective } from '../customExports'
import { catchError, delay, concatMap, first, take,tap,timeout,timeoutWith } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Directive({
    selector: '[appComponents]'
})
export class ComponentsDirective {

    @Input() components: any;
    extras: any;
    appExtras:any = {
        selector:"appComponents",
        name:"components" // the lowercase name of the directive
    }
    zChildren: any;
    subscriptions: Array<Subscription> = []
    group: any;
    ref: ChangeDetectorRef

    // judima additions
    lazyLoad:Array<string>
    //


    constructor(
        private el: ElementRef,
        private http: HttpClient,
        private renderer2: Renderer2,
        private ryber: RyberService,
        private injector: Injector,
        private cfr: ComponentFactoryResolver,
    ) { }

    ngOnInit() {
        this.extras = this[this.appExtras.name]
        let {onInit} = judimaDirective
        if (this.extras?.confirm === 'true' && this.extras?.type.includes("body")) {
            onInit({
                myThis:this,
                featureFn:(devObj)=>{
                    let {group,subscriptions} = devObj
                    let {zChildren,cfr,injector,renderer2,ref,ryber,appExtras} = this
                    //  work goes here
                    Object.entries(group)
                    .forEach((x:any,i)=>{
                        let [key,val] = x

                        let lazyLoad = this.lazyLoad = Array.from(val.types['lazyLoad'] || [])


                        lazyLoad
                        .forEach((y:any,j)=>{


                            // lazy load the components
                            // console.log(zChildren[y].extras.appComponents.options?.tryAgain)
                            if(
                                zChildren[y].extras.appComponents.loaded !== "true" &&
                                 zChildren[y].extras.options.lazyLoad === "true" &&
                                 zChildren[y].extras.appComponents.options.lazyLoad.tryAgain === "true"
                            ){
                                // we may get unsubscribed so we depend on the tryAgain in the next fn
                                    // zChildren[y].extras.appComponents.loaded = "true"
                                //

                                // setup the lazyLoad observable
                                let lazyLoadComponent = from(import('../components/components.component'))
                                .pipe(
                                    // tap(()=>{
                                    //     ref.detectChanges()
                                    // }),
                                    // timeoutWith(2500,of("am I working")),
                                    // catchError((err)=>{
                                    //     console.log(err)
                                    //     return of("err")
                                    // }),


                                    delay(
                                        // deprecate place options in appComponents
                                        zChildren[y].extras.options?.component?.lazyLoadDelay ||
                                        //
                                        zChildren[y].extras.appComponents.options.lazyLoad.delay||
                                        2000
                                    ),
                                    //
                                )


                                let lazyLoadComponentSub:Subscription = lazyLoadComponent
                                .subscribe({
                                    next:(result:any)=>{

                                        let {ComponentsComponent} = result

                                        // configure the component
                                        let componentsFactory = cfr.resolveComponentFactory(ComponentsComponent)


                                        let answer  = (zChildren[y].viewContainerRef as ViewContainerRef).createComponent(componentsFactory,undefined,injector)
                                        let instance:any = answer.instance
                                        let el:any = answer.location
                                        instance.options = zChildren[y].extras.options // two-way binding
                                        //

                                        // place the component in the DOM
                                        renderer2.addClass(
                                            zChildren[y].element,
                                            instance.options?.component?.class || null
                                        )
                                        renderer2.appendChild(
                                            zChildren[y].element,
                                            el.nativeElement
                                        )
                                        ref.detectChanges()
                                        //

                                        // we are really finished
                                            // send the CO and the zSymbol to indicate the target
                                            ryber.appCO0.metadata.components.lazyLoad.current.next({
                                                zSymbol:zChildren[y].extras.appComponents.zSymbol,
                                                co:zChildren[y].extras.appComponents.co
                                            })
                                            // if we unsub too early the end dev can indicate to try again
                                            if(zChildren[y].extras.appComponents.options?.lazyLoad){
                                                zChildren[y].extras.appComponents.options.lazyLoad.tryAgain = "false"
                                            }
                                            //
                                        //
                                    },
                                })


                                val.subscriptions.push(lazyLoadComponentSub)
                                //
                            }
                            //

                            //     zChildren[y].viewContainerRef.clear()



                        })
                        subscriptions.push(...val.subscriptions)
                        //

                    })
                    //
                }
            })
        }

    }

    ngOnDestroy() {
        let {onDestroy} = judimaDirective
        onDestroy({
            myThis:this
        })

        // judima additions
        let {ryber,lazyLoad,zChildren} = this
        // reset the tryAgain for the lazyLoads on ngOndestroy
            // say for navigation or a state when the component needs to reload itself
        let destroySub = ryber.appCO0.metadata.components .ngOnDestroy
        .pipe(take(1))
        .subscribe({
            next:(result)=>{
                if(result.hook === "finished"){
                    lazyLoad
                    .forEach((x:any,i)=>{
                        zChildren[x].extras.appComponents.options.lazyLoad.tryAgain = "true"
                    })
                }

            },
        })
        //
        //



    }

}
