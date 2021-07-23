
import { Component, OnInit, Input, ViewContainerRef,ViewChild } from '@angular/core';
import { flatDeep, ryberUpdate, zChildren } from '../customExports';
import { RyberService } from '../ryber.service';
import { Table } from 'primeng/table';
import {environment  as env} from '../../environments/environment'
import { exhaustMap } from 'rxjs/operators';
import {from} from 'rxjs';



@Component({
    selector: 'app-components',
    templateUrl: './components.component.html',
    // changeDetection:ChangeDetectionStrategy.OnPush
})
export class ComponentsComponent implements OnInit {

    @Input() options:any
    @ViewChild('pTable') table: Table;

    constructor(
        public ryber: RyberService,
        private vcf:ViewContainerRef,
        // private ref: ChangeDetectorRef until we can figure out why it doesnt fire
    ) { }

    ngOnInit(): void {

        let {options} = this
        let styleDefaults =  {position:"static"}
        // bad check we need to know if its container is nested
            // for now use clasees
        if(options.style === undefined){
            options.style = styleDefaults
        }
        else{
            Object.assign(options.style,styleDefaults)
        }

        //




        // dev additions
        if(options.type === "awsLogin"){
            let items = flatDeep(options.panels,Infinity)
            items
            .forEach((x:any,i)=>{
                !x.style ? x.style = {} : null
                // dummy ngModel
                    // were not going to import a whole library for one problem
                if(x.type === "input"){
                    x.blur = (e:Event)=>{
                        x.value = (e.target as HTMLInputElement).value
                    }
                }
                //
            })
            let panelsRef = options.panels.map((x:any,i)=>{
                return x[0]
            })

            // panels need their own resources
                // would have provided but found out too late we need a parent div
            panelsRef
            .forEach((x:any,i)=>{
                !x.stage? x.stage = {style:{}} : (!x.stage.style? x.stage.style = {} : null)
            })
            //
        }
        //




    }




    profileCard ={

        defaultPic:(devObj)=>{
            let {options} = this
            try {
                options.pic.src = options?.alt || mediaPrefix({
                    media:'components/' + ['user.png','uae.png'][Math.round(Math.random())]
                })
            }
            catch (error) {
                options.pic = {
                    src:options?.alt || mediaPrefix({
                        media:'components/' + ['user.png','uae.png'][Math.round(Math.random())]
                    })
                }
            }
        }
    }

    dropDown = {
        onChange:(event)=>{
            let {ryber,options}= this
            let childFn = options.options
            .filter((x:any,i)=>{
                return x.name ===  event.value.name
            })[0].onChange || options.items.container.onChange

            if(childFn){
                childFn({ryber,option:event.value})
            }
        }
    }


    primengTable ={
        filter:{
            field:"Group",
            value:"Defualt"
        },
        filterBy:(event)=>{
            this.primengTable.filter.field = event.target.innerText
            this.options.search.buttons
            .forEach((x:any,i)=>{
                if(x.name === event.target.innerText){
                    x.class = " a_p_p_DashboardSelectSearchButton"
                }
                else{
                    x.class = "a_p_p_DashboardSearchButton"
                }
            })
        },
        filterValue:(event)=>{
            this.primengTable.filter.value = event.target.value
        },
        filterSubmit:(event)=>{
            let {table} = this
            let {field,value} = this.primengTable.filter
            table.filter(value,field,'equals')
        },
        filterReset:(event)=>{
            let {table} = this
            table.reset()
        },
        textExpander:(event,value)=>{
            if(value === ""){
                return
            }
            let {options,ryber} = this
            let {expander,textExpander,co} = options
            let {zChildren} = ryber[co].metadata
            ;[...expander,...textExpander]
            .forEach((x:any,i)=>{
                zChildren[x].css.display = zChildren[x].css.display === "block" ? "none":"block"
            })


            zChildren[textExpander].innerText.item = value
        },
        photoExpander:(event,url)=>{
            if(url === ""){
                return
            }
            let {options,ryber} = this
            let {expander,photoExpander,co} = options
            let {zChildren} = ryber[co].metadata

            ;[...expander,...photoExpander]
            .forEach((x:any,i)=>{
                zChildren[x].css.display = zChildren[x].css.display === "block" ? "none":"block"
            })
            // zChildren[photoExpander[0]].extras.appAttribute.options.attrObject.src = url
            ryber[co].metadata.attribute.current.next({
                attrObject:{
                    src:url
                },
                symbol:photoExpander[0]
            })
            console.log(zChildren[photoExpander].extras.appAttribute)
        },
        value:[]
    }




    // devAdditions

    //

}
