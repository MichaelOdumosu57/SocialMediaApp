import { Directive, ElementRef, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy, navigationType,judimaDirective } from '../customExports'
import { catchError, delay, first, take,tap } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Scene,PerspectiveCamera,WebGLRenderer,SphereGeometry,MeshBasicMaterial,MeshStandardMaterial,Mesh,AmbientLight,GridHelper,EventDispatcher,Vector3,MOUSE,TOUCH,Quaternion,Spherical,Vector2,TextureLoader}  from 'three';


let THREE = {
    Scene,

    PerspectiveCamera,
    WebGLRenderer,
    SphereGeometry,
    MeshStandardMaterial,
    Mesh,
    AmbientLight,
    GridHelper,
    EventDispatcher,
    Vector2,
    Vector3,
    MOUSE,
    TOUCH,
    Quaternion,
    Spherical,
    TextureLoader,
    MeshBasicMaterial,
    OrbitControls:null
}
orbitControls({THREE})


@Directive({
    selector: '[appThree]'
})
export class ThreeDirective {


    @Input() three: any;
    extras: any;
    appExtras:any = {
        selector:"appThree",
        name:"three" // the lowercase name of the directive
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
                    let {ryber,ref,zChildren,renderer2}= this

                    //  work goes here

                    //
                    let shape = [
                        {
                            url:mediaPrefix({media:"red_land_diffuse.jpg"}),
                            positions:[70,0,1600],
                            geometry:[36,32,32],
                        },
                        {
                            url:mediaPrefix({media:"ice_land_diffuse.jpg"}),
                            positions:[-5,0,1250],
                            geometry:[11,32,32]
                        },
                        {
                            url:mediaPrefix({media:"terra_land_diffuse.jpg"}),
                            positions:[10,0,900],
                            geometry:[8,32,32],
                        },
                        {
                            url:mediaPrefix({media:"emerald_city.jpg"}),
                            positions:[-10,-10,650],
                            geometry:[6,32,32],
                        },
                        {
                            url:mediaPrefix({media:"forest_land_diffuse.jpg"}),
                            positions:[0,0,300],
                            geometry:[8,32,32],
                        },

                    ]
                    //

                    Object.entries(group)
                    .forEach((x:any,i)=>{
                        let [keyx, valx] = x

                        let background = Array.from(valx.types['background'] || [])
                        let link = Array.from(valx.types['link'] || [])



                        background
                        .forEach((y:any,j)=>{

                            let backgroud = zChildren[y]
                            let {targetCameraValues,cameraValues} = ryber.appCO0.metadata.three
                            // three.js

                            // scene setup
                            let scene = new THREE.Scene();
                            let spaceTexture = new THREE.TextureLoader().load(
                                mediaPrefix({media:'space.jpg'}),
                                (result)=>{
                                    scene.background = result
                                },()=>{},console.log,
                            );
                            //


                            let camera =ryber.appCO0.metadata.three.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / backgroud.extras.appThree.options.camera.height , 0.1, 1000000 );
                            let renderer = new THREE.WebGLRenderer({
                                canvas:backgroud.element
                            });
                            renderer.setSize( window.innerWidth, backgroud.extras.appThree.options.camera.height );

                            shape
                            .map((y:any,j)=>{

                                let planetTexture = new THREE.TextureLoader().load(
                                    y.url,
                                    (result)=>{
                                        let geometry = new THREE.SphereGeometry(...y.geometry);
                                        let material = new THREE.MeshStandardMaterial( { map:result } );
                                        y.shape = new THREE.Mesh( geometry, material );


                                        y.shape.position.set(...y.positions)
                                        scene.add( y.shape );
                                    },()=>{},console.log,
                                );
                                return y
                            })


                            // camera.position.x = 10;
                            camera.position.copy(env.three.camera.position)


                            let ambientLight = new THREE.AmbientLight( 0xffffff, 1 );
                            let gridHelper = new THREE.GridHelper( 50, 20 );
                            scene.add( ambientLight );
                            // let controls = new THREE.OrbitControls( camera, backgroud.element );
                            // console.log(controls.target)


                            let animate = () =>{
                                requestAnimationFrame(animate)
                                renderer.setSize( window.innerWidth, backgroud.extras.appThree.options.camera.height );

                                TWEEN.update()

                                shape
                                .forEach((y:any,j)=>{
                                    if(y.shape){
                                        y.shape.rotation.x += 0.01;
                                    }

                                })


                                renderer.render( scene, camera );
                            }
                            animate()
                            //
                        })

                        link
                        .forEach((y:any,j)=>{
                            let link = zChildren[y]
                            let {camera,cameraValues} = ryber.appCO0.metadata.three

                            // navigation
                            let anchorEvent = fromEvent(link.element, 'click')
                            .subscribe({
                                next:(result:any)=>{

                                    // try to update the tween result
                                    TWEEN.removeAll()
                                    let tween = new TWEEN.Tween(camera.position)
                                    .to(
                                        cameraValues[link.extras.appThree.options.navName],
                                        1500
                                    )
                                    .onComplete(()=>{

                                        of(null)
                                        .pipe(
                                            take(1),
                                            tap(()=>{

                                                // change the path
                                                ryber.appCO0.metadata.navigation.full.navigated = "true"
                                                ryber.appCurrentNav = link.extras.appThree.options.navName
                                                //


                                                // set the highlights
                                                let linkArray = Array.from(valx.types['link'])
                                                linkArray
                                                .forEach((z:any,k)=>{
                                                    let link = zChildren[z]
                                                    if(ryber.appCurrentNav === link.extras.appThree.options.navName){
                                                        link.css["font-family"] = "Arial"
                                                    }
                                                    else {
                                                        delete link.css["font-family"]
                                                    }
                                                })
                                                ref.detectChanges()
                                                //
                                            }),
                                            catchError((err)=>{
                                                console.log(err)
                                                return of(err)
                                            })
                                        )
                                        .subscribe()
                                    })
                                    // .easing(TWEEN.Easing.Quadratic.Out)
                                    .start()
                                    //



                                },
                                error:(err:any)=>{

                                }

                            })
                            valx.subscriptions.push(anchorEvent)
                            //
                        })





                        // submit
                        // .forEach((y:any,j)=>{
                        //     // take some action
                        //     valx.subscriptions.push(of[])
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

