import { HttpErrorResponse } from "@angular/common/http";
import { pipe } from "rxjs";
import { environment as env } from "../../environments/environment";
import {objectCopy,zProtoComponent,zProtoChildren, zChildren, xContain, xPosition,latchUtilities} from '../customExports'


let website:any = {}

let backgroundDev:Array<Partial<zProtoComponent>>  =[
    {
        title:"mainBackground",
        metafields:[
            {
                key:"body",
                type:"body",
                navigation:{
                    name:["menu","account","socialAcct","content","dashboard"],
                    confirm:"true",
                    type:["body"]
                },
                options:{
                    extras:{
                        appSection:{
                            confirm:"true"
                        },
                        appAttribute:{
                            confirm:"true",
                            type:["body"]
                        },
                        appThree:{
                            confirm:"true",
                            type:["body"]
                        },

                    }
                }
            },
            {
                key:"dummy",
                type:"div",
                split:9,
                height:1
            },
            {
                key:"dummy",
                type:"div",
                split:9,
                height:1
            },
            {
                key:"mainBackground a_p_p_ThreeBackgroundMain",
                type:"canvas",
                height:1000,
                split:2,

                options:{
                    extras:{
                        appThree:{
                            type:['background'],
                            options:{
                                camera:{
                                    height:750
                                }
                            }
                        }
                    },
                    judima:{
                        formatIgnore:"true"
                    }


                }
            },



        ]
    }
]
let menuDev :Array<Partial<zProtoComponent>>  = [

    {
        title:"menu",
        metafields:[
            {
                "key":"body",
                "type":"body",
                navigation:{
                    name:["menu","account","socialAcct","content","dashboard"],
                    confirm:"true",
                    type:["body"]
                },
                nest:{
                    group:[
                        {
                            name:"menu",
                            type:"regular"
                        }
                    ]
                },
                options:{
                    extras:{
                        appAttribute:{
                            confirm:"true",
                            type:["body"]
                        },
                        appThree:{
                            confirm:"true",
                            type:["body"]
                        },

                    },
                    judima:{
                        moving:{
							point:"bottom",
							target:'mainBackground',
							coordinates:{x:-50,y:0},
							type:"custom"
                        }
                    }
                }
            },
            {
                key:"title a_p_p_MenuTitle",
                type:"title",
                value:"Social Media App",
                split:9,

            },
            {
                key:"container a_p_p_MenuContainer",
                type:"div",
                split:3,
                height:600,
                nest:{
                    group:"menu",
                    name:"A1"
                },
            },
            {
                key:"subtitle a_p_p_MenuSubTitle",
                type:"sub-heading",
                value:"Post Once Upload On All Your Apps",
                nest:{
                    group:"menu",
                    name:"B1",
                    under:"A1"
                },
            },

            ...Array(5).fill(null)
            .map((x:zProtoChildren,i)=>{
                let values = ["Home","Account Login","Social Media Login","Post Content","Dashboard"]
                let navNames =  ["/menu","/account","/socialAcct","/content","/dashboard"]
                return {
                    key:"menu-item a_p_p_MenuItem",
                    type: "anchor",
                    value:values[i],
                    nest:{
                        group:"menu",
                        name:"B"+(i+2),
                        under:"A1"
                    },
                    options:{
                        css:{
                            "font-family":i === 0 ? "Arial, Helvetica, sans-serif":null
                        },
                        extras:{
                            appThree:{
                                type:["link"],
                                options:{
                                    navName:navNames[i]
                                }
                            }
                        }
                    }

                }
            })

        ]
    }
]

let accountDev :Array<Partial<zProtoComponent>>  = [
    {
        title:"account",
        metafields:[
            {
                key:"body",
                type:"body",
                navigation:{
                    name:["account"],
                    confirm:"true",
                    type:["body"]
                },
                options:{
                    extras:{
                        appAttribute:{
                            confirm:"true",
                            type:["body"]
                        },
                        appAwsLogin:{
                            confirm:"true",
                            type:["body"]
                        },
                        appComponents:{
                            type:["body"],
                            confirm:"true",
                        }
                    },
                    judima:{
                        moving:{
							point:"bottom",
							target:'mainBackground',
							coordinates:{x:50,y:70},
							type:"custom"
                        }
                    }
                }
            },
            {
                key:"loginC a_p_p_LoginContainer",
                type:"div",
                split:8,
                left:350,
                height:600,
                latch:{
                    type:"display",
                    display:{
                        type:"target",
                        name:"login"
                    },
                    zChildren:Array(4).fill(null)
                    .map((x:any,i)=>{

                        let classes = [
                            "signin a_p_p_LoginSignInButton",
                            "create a_p_p_LoginCreateButton",
                            "pass a_p_p_LoginPasswordButton",
                            "delete a_p_p_LoginDeleteButton"
                        ]
                        return {
                            bool:"b",
                            val:classes[i],
                            css:{
                                "z-index":5,
                            },
                            text:["Sign In", "Create Account", "Change Password", "Delete Account"][i],
                            logic:{
                                desktop:{
                                    width:()=>{return 320},
                                    height:()=>{return 120},
                                    top:[100,400][Math.floor(i/2)],
                                    left:[120,600][i%2],
                                },
                                mobile:{
                                    width:.2,
                                    height:.2,
                                    top:0,
                                    left:0
                                }
                            },
                            extras:{
                                appAwsLogin:{
                                    type:[
                                        ["signIn","mainLogin","mainLoginBold"],
                                        ["createAccount","mainLogin","mainLoginBold"],
                                        ["password","mainLogin","mainLoginBold"],
                                        ["delAcct","mainLogin","mainLoginBold"]
                                    ][i]
                                }
                            },
                            group:["login"]
                        }
                    })

                },
                options:{
                    css:{
                        "z-index":5,
                        opacity:0
                    },
                    extras:{
                        appAwsLogin:{
                            type:["mainLogin","mainLoginContainer"]
                        }
                    }
                }
            },

            // detete Account
                // top level zChildren are still moving relative, need aboslute positioning, not interested in latching
            {
                key:"container a_p_p_LoginDeleteOneComponent",
                type:"components",
                split:8,
                left:350,
                height:600,
                top:-600,
                options:{
                    extras:{
                        options:{
                            type:'awsLogin',
                            lazyLoad:"true",
                            container:{
                                class:'a_p_p_LoginDeleteOneContainer'
                            },
                            panels:[
                                [
                                    {
                                        type:"title",
                                        class:"a_p_p_LoginDeleteOneComponentTitle",
                                        innerText:`Please Enter Your Username and Password and the OTP from your authenticator app`,
                                        appAwsLogin:{
                                            type:["delete1","delete1Bold"],
                                        },
                                    },
                                    ...Array(3).fill(null)
                                    .map((x:any,i)=>{
                                        return {
                                            type:"input",
                                            class:"a_p_p_LoginDeleteOneComponentInput",
                                            placeholder:["Username","Password","OTP"][i],
                                            appAwsLogin:{
                                                type:["delete1","delete1Bold",["delete1User","delete1Pass","delete1TOTP"][i]]
                                            },
                                        }
                                    }),
                                    {
                                        type:"text",
                                        class:"a_p_p_LoginDeleteOneComponentTextError",
                                        style:{
                                            margin:"50px 0 0 0"
                                        },
                                        innerText:``,
                                        appAwsLogin:{
                                            type:["delete1","delete1Bold","delete1Error"],
                                        }

                                    },
                                    {
                                        type:"button",
                                        class:"a_p_p_LoginDeleteOneComponentButton",
                                        innerText:`Submit`,
                                        style:{
                                            margin:"30px 0 0 41%",
                                            height:"120px",
                                            width: "200px",
                                        },

                                        appAwsLogin:{
                                            type:["delete1","delete1Bold","delete1Submit"],
                                        }

                                    },
                                ],
                                [
                                    {
                                        type:"title",
                                        class:"a_p_p_LoginDeleteTwoComponentTitle",
                                        innerText:`Are you sure you want to delete your account?
                                        Click"Submit" to delete your account.
                                        Click"Cancel" to go back to The Main Login Page.`,
                                        appAwsLogin:{
                                            type:["delete2","delete2Bold"],
                                        },
                                        stage:{
                                            style:{
                                                "justify-content":"space-evenly"
                                            }
                                        }
                                    },

                                    ...Array(2).fill(null)
                                    .map((x:any,i)=>{
                                        let myClass = [
                                            "a_p_p_LoginDeleteTwoComponentButtonDanger",
                                            "a_p_p_LoginDeleteTwoComponentButton"
                                        ][i]

                                        let innerText = ["Delete","Cancel"][i]
                                        let type = [
                                            ["delete2","delete2Bold","delete2Submit"],
                                            ["delete2","delete2Bold","delete2Cancel"]
                                        ][i]

                                        return {
                                            type:"button",
                                            class:myClass,
                                            innerText,
                                            style:{
                                                margin:"50px 0 0 0",
                                                height:"120px",
                                                width: "200px",
                                            },

                                            appAwsLogin:{
                                                type
                                            }

                                        }
                                    })

                                ],
                                [
                                    {
                                        type:"title",
                                        class:"a_p_p_LoginDeleteThreeComponentTitle",
                                        innerText:`Account Sucessfully Deleted`,
                                        appAwsLogin:{
                                            type:["delete3","delete3Bold"],
                                        },
                                        stage:{
                                            style:{
                                                "justify-content":"space-evenly"
                                            }
                                        }
                                    },
                                ],
                            ],
                            component:{
                                style:{
                                    position:"absolute",
                                },
                            }
                        },
                        appAwsLogin:{
                            type:["delete1","delete1Bold","delete1Component"],
                        },
                        appComponents:{
                            type:["lazyLoad"],
                            duplicateIgnore:"true",
                            zSymbolNeeded:"true",
                            options:{
                                lazyLoad:{
                                    delay:1000,
                                    tryAgain:"true"
                                }
                            }
                        }
                    },
                },
            },
            //

            // create Account
            {
                key:"container a_p_p_LoginCreateOneContainer",
                type:"div",
                split:8,
                left:350,
                height:600,
                top:-600,
                options:{

                    extras:{
                        appAwsLogin:{
                            type:["create1"],
                        }
                    },
                },
                latch:{
                    type:"display",
                    display:{
                        type:"target",
                        name:"create1"
                    },
                    zChildren:[
                        {
                            bool:"h1",
                            val:"title a_p_p_LoginCreateOneTitle",
                            text:"Create Account",
                            logic:{
                                desktop:{
                                    width:.4,
                                    height:()=>{return 30},
                                    top:50,
                                    left:350
                                },
                                mobile:{
                                    width:.2,
                                    height:.2,
                                    top:0,
                                    left:0
                                }
                            },
                            extras:{
                                appAwsLogin:{
                                    type:["create1"],
                                }
                            },
                            group:["create1"]

                        },
                        // @ts-ignore
                        ...Array(3).fill(null)
                        .map((x:any,i)=>{
                            let classes = [
                                "email a_p_p_LoginCreateOneInput",
                                "password a_p_p_LoginCreateOneInput",
                                "confirmPassword a_p_p_LoginCreateOneInput"
                        ]
                            return {
                                bool:"i",
                                val:classes[i],
                                logic:{
                                    desktop:{
                                        width:.65,
                                        height:()=>{
                                            return 50
                                        },
                                        top:[150,250,350][i],
                                        left:50
                                    },
                                    mobile:{
                                        width:.2,
                                        height:.2,
                                        top:0,
                                        left:0
                                    }
                                },
                                extras:{
                                    appAwsLogin:{
                                        type:["create1","create1Input",["create1User","create1Pass","create1ConfirmPass"][i]],
                                    },
                                    appAttribute:{
                                        type:["target"],
                                        options:{
                                            attrObject:{
                                                type:["email","text","text"][i],
                                                placeholder:["Email","Password","Confirm Password"][i]
                                            }
                                        }
                                    }
                                },
                                group:["create1"]

                            }
                        }),
                        {
                            // @ts-ignore
                            bool:"p",
                            val:"passwordInfo a_p_p_LoginCreateOneText",
                            text:`Password Must be a minimun of 12 characters, At least 1 number, and 1 Uppercase and Lowercase letter`,
                            logic:{
                                desktop:{
                                    width:.25,
                                    height:()=>{
                                        return 50
                                    },
                                    top:250,
                                    left:680
                                },
                                mobile:{
                                    width:.2,
                                    height:.2,
                                    top:0,
                                    left:0
                                }
                            },
                            extras:{
                                appAwsLogin:{
                                    type:["create1","create1Input"],
                                },
                            },
                            group:["create1"]

                        },
                        {
                            // @ts-ignore
                            bool:"p",
                            val:"passwordError a_p_p_LoginCreateOneTextError",
                            logic:{
                                desktop:{
                                    width:.25,
                                    height:()=>{
                                        return 50
                                    },
                                    top:400,
                                    left:680
                                },
                                mobile:{
                                    width:.2,
                                    height:.2,
                                    top:0,
                                    left:0
                                }
                            },
                            extras:{
                                appAwsLogin:{
                                    type:["create1","create1Input","create1PassError"],
                                },
                            },
                            group:["create1"]

                        },
                        {
                            // @ts-ignore
                            bool:"b",
                            val:"createAcct a_p_p_LoginCreateOneButton",
                            text:`Create Account`,
                            logic:{
                                desktop:{
                                    width:()=>{return 300},
                                    height:()=>{return 120},
                                    top:500,
                                    left:280
                                },
                                mobile:{
                                    width:.2,
                                    height:.2,
                                    top:0,
                                    left:0
                                }
                            },
                            extras:{
                                appAwsLogin:{
                                    type:["create1","create1Button","create1Input"],
                                },
                            },
                            group:["create1"]

                        }

                    ]
                }
            },
            {
                key:"container a_p_p_LoginCreateFourContainer",
                type:"div",
                split:8,
                left:350,
                height:600,
                top:-600,
                options:{

                    extras:{
                        appAwsLogin:{
                            type:["create4"],
                        }
                    },
                },
                latch:{
                    type:"display",
                    display:{
                        type:"target",
                        name:"create4"
                    },
                    zChildren:[
                        {
                            bool:"h1",
                            val:"title a_p_p_LoginCreateFourTitle",
                            text:`Please head to your email in your account to provide the confirmation code`,
                            css:{
                                "text-align":"center"
                            },
                            logic:{
                                desktop:{
                                    width:.7,
                                    height:()=>{return 30},
                                    top:100,
                                    left:150
                                },
                                mobile:{
                                    width:.2,
                                    height:.2,
                                    top:0,
                                    left:0
                                }
                            },
                            extras:{
                                appAwsLogin:{
                                    type:["create4","create4Bold"],
                                }
                            },
                            group:["create4"]

                        },
                        {
                            bool:"i",
                            val:"input a_p_p_LoginCreateFourInput",
                            logic:{
                                desktop:{
                                    width:.7,
                                    height:()=>{return 50},
                                    top:250,
                                    left:150
                                },
                                mobile:{
                                    width:.2,
                                    height:.2,
                                    top:0,
                                    left:0
                                }
                            },
                            extras:{
                                appAwsLogin:{
                                    type:["create4","create4Bold","create4Input"],
                                },
                                appAttribute:{
                                    type:["target"],
                                    options:{
                                        attrObject:{
                                            placeholder:"Confirmation Code"
                                        }
                                    }
                                }
                            },
                            group:["create4"]

                        },
                        {
                            bool:"b",
                            val:"button a_p_p_LoginCreateFourButton",
                            text:"Submit",
                            logic:{
                                desktop:{
                                    width:()=>{return 300},
                                    height:()=>{return 120},
                                    top:400,
                                    left:150
                                },
                                mobile:{
                                    width:.2,
                                    height:.2,
                                    top:0,
                                    left:0
                                }
                            },
                            extras:{
                                appAwsLogin:{
                                    type:["create4","create4Bold","create4Submit"],
                                },
                                appAttribute:{
                                    type:["target"],
                                    options:{
                                        attrObject:{
                                            placeholder:"Confirmation Code"
                                        }
                                    }
                                }
                            },
                            group:["create4"]
                        },
                        {
                            bool:"b",
                            val:"button a_p_p_LoginCreateFourButtonResend",
                            text:"Resend Code",
                            logic:{
                                desktop:{
                                    width:()=>{return 300},
                                    height:()=>{return 120},
                                    top:400,
                                    left:550
                                },
                                mobile:{
                                    width:.2,
                                    height:.2,
                                    top:0,
                                    left:0
                                }
                            },
                            extras:{
                                appAwsLogin:{
                                    type:["create4","create4Bold","create4Resend"],
                                },
                                appAttribute:{
                                    type:["target"],
                                    options:{
                                        attrObject:{
                                            placeholder:"Confirmation Code"
                                        }
                                    }
                                }
                            },
                            group:["create4"]
                        },
                    ]
                }
            },
            {
                key:"container a_p_p_LoginCreateTwoContainer",
                type:"div",
                split:8,
                left:350,
                height:600,
                top:-600,
                options:{

                    extras:{
                        appAwsLogin:{
                            type:["create2"],
                        }
                    },
                },
                latch:{
                    type:"display",
                    display:{
                        type:"target",
                        name:"create2"
                    },
                    zChildren:[
                        {
                            bool:"p",
                            val:"title a_p_p_LoginCreateTwoTitle",
                            text:`Scan the QR Code to your authenticator app`,
                            logic:{
                                desktop:{
                                    width:.4,
                                    height:()=>{return 30},
                                    top:50,
                                    left:100
                                },
                                mobile:{
                                    width:.2,
                                    height:.2,
                                    top:0,
                                    left:0
                                }
                            },
                            extras:{
                                appAwsLogin:{
                                    type:["create2","create2Bold"],
                                }
                            },
                            group:["create2"]

                        },
                        {
                            bool:"p",
                            val:"title a_p_p_LoginCreateTwoTitle",
                            text:`Enter the one time passcode generated by the app`,
                            logic:{
                                desktop:{
                                    width:.3,
                                    height:()=>{return 30},
                                    top:50,
                                    left:550
                                },
                                mobile:{
                                    width:.2,
                                    height:.2,
                                    top:0,
                                    left:0
                                }
                            },
                            extras:{
                                appAwsLogin:{
                                    type:["create2","create2Bold"],
                                }
                            },
                            group:["create2"]

                        },
                        {
                            bool:"app-components",
                            val:"qrcode a_p_p_LoginCreateTwoQR",
                            logic:{
                                desktop:{
                                    width:()=>{return  300},
                                    height:()=>{return 300},
                                    top:150,
                                    left:100
                                },
                                mobile:{
                                    width:.2,
                                    height:.2,
                                    top:0,
                                    left:0
                                }
                            },
                            extras:{
                                appAwsLogin:{
                                    type:["create2","create2Bold","create2QR"],
                                },
                                options:{
                                    type:"qrcode",

                                }
                            },
                            group:["create2"]

                        },
                        {
                            bool:"i",
                            val:"input a_p_p_LoginCreateTwoInput",
                            text:`Enter the one time passcode generated by the app`,
                            logic:{
                                desktop:{
                                    width:.35,
                                    height:()=>{return 50},
                                    top:250,
                                    left:550
                                },
                                mobile:{
                                    width:.2,
                                    height:.2,
                                    top:0,
                                    left:0
                                }
                            },
                            extras:{
                                appAwsLogin:{
                                    type:["create2","create2Bold","create2TOTP"],
                                }
                            },
                            group:["create2"]

                        },
                        {
                            bool:"b",
                            val:"button a_p_p_LoginCreateTwoButton",
                            text:`Submit`,
                            logic:{
                                desktop:{
                                    width:()=>{return 300},
                                    height:()=>{return 120},
                                    top:400,
                                    left:550
                                },
                                mobile:{
                                    width:.2,
                                    height:.2,
                                    top:0,
                                    left:0
                                }
                            },
                            extras:{
                                appAwsLogin:{
                                    type:["create2","create2Bold","create2Submit"],
                                }
                            },
                            group:["create2"]

                        },


                    ]
                }
            },
            {
                key:"container a_p_p_LoginCreateThreeContainer",
                type:"div",
                split:8,
                left:350,
                height:600,
                top:-600,
                options:{

                    extras:{
                        appAwsLogin:{
                            type:["create3"],
                        }
                    },
                },
                latch:{
                    type:"display",
                    display:{
                        type:"target",
                        name:"create3"
                    },
                    zChildren:[
                        {
                            bool:"p",
                            val:"title a_p_p_LoginCreateThreeTitle",
                            text:`Account Sucessfully Created,
                            For Future Login Use your Password and Authenticator App,
                            You may now proceed to the Social Media Login Page `,
                            logic:{
                                desktop:{
                                    width:.8,
                                    height:()=>{return 30},
                                    top:50,
                                    left:100
                                },
                                mobile:{
                                    width:.2,
                                    height:.2,
                                    top:0,
                                    left:0
                                }
                            },
                            extras:{
                                appAwsLogin:{
                                    type:["create3","create3Bold"],
                                }
                            },
                            group:["create3"]

                        },
                    ]
                }
            },
            //

            // sign in
            {
                key:"container a_p_p_LoginSignInOneContainer",
                type:"div",
                split:8,
                left:350,
                height:600,
                top:-600,
                options:{

                    extras:{
                        appAwsLogin:{
                            type:["signIn1"],
                        }
                    },
                },
                latch:{
                    type:"display",
                    display:{
                        type:"target",
                        name:"signIn1"
                    },
                    zChildren:[
                        {
                            bool:"p",
                            val:"title a_p_p_LoginSignInOneTitle",
                            text:`Please Enter Your Username and Password and the OTP from your authenticator app`,
                            logic:{
                                desktop:{
                                    width:.8,
                                    height:()=>{return 30},
                                    top:50,
                                    left:100
                                },
                                mobile:{
                                    width:.2,
                                    height:.2,
                                    top:0,
                                    left:0
                                }
                            },
                            extras:{
                                appAwsLogin:{
                                    type:["signIn1","signIn1Bold"],
                                }
                            },
                            group:["signIn1"]

                        },
                        // @ts-ignore
                        ...Array(3).fill(null).map((x:any,i)=>{
                            return {
                                bool:"i",
                                val:"input a_p_p_LoginSignInOneInput",

                                logic:{
                                    desktop:{
                                        width:.8,
                                        height:()=>{return 50},
                                        top:[150,250,350][i],
                                        left:100
                                    },
                                    mobile:{
                                        width:.2,
                                        height:.2,
                                        top:0,
                                        left:0
                                    }
                                },
                                extras:{
                                    appAwsLogin:{
                                        type:["signIn1","signIn1Bold",["signIn1User","signIn1Pass","signIn1TOTP"][i]],
                                    },
                                    appAttribute:{
                                        type:["target"],
                                        options:{
                                            attrObject:{
                                                placeholder:["Username","Password","six-digit code"][i]
                                            }
                                        }
                                    }
                                },
                                group:["signIn1"]

                            }

                        }),
                        {
                            // @ts-ignore
                            bool:"b",
                            val:"button a_p_p_LoginSignInOneButton",
                            text:`Submit `,
                            logic:{
                                desktop:{
                                    width:()=>{return 300},
                                    height:()=>{return 120},
                                    top:450,
                                    left:300
                                },
                                mobile:{
                                    width:.2,
                                    height:.2,
                                    top:0,
                                    left:0
                                }
                            },
                            extras:{
                                appAwsLogin:{
                                    type:["signIn1","signIn1Bold","signIn1Submit"],
                                }
                            },
                            group:["signIn1"]

                        },

                    ]
                }
            },
            {
                key:"container a_p_p_LoginSignInTwoContainer",
                type:"div",
                split:8,
                left:350,
                height:600,
                top:-600,
                options:{

                    extras:{
                        appAwsLogin:{
                            type:["signIn2"],
                        }
                    },
                },
                latch:{
                    type:"display",
                    display:{
                        type:"target",
                        name:"signIn2"
                    },
                    zChildren:[
                        {
                            bool:"p",
                            val:"title a_p_p_LoginSignInTwoTitle",
                            text:`Thank you for Signing In  you may now proceed to the Social Media Login page`,
                            logic:{
                                desktop:{
                                    width:.8,
                                    height:()=>{return 30},
                                    top:50,
                                    left:100
                                },
                                mobile:{
                                    width:.2,
                                    height:.2,
                                    top:0,
                                    left:0
                                }
                            },
                            extras:{
                                appAwsLogin:{
                                    type:["signIn2","signIn2Bold"],
                                }
                            },
                            group:["signIn2"]

                        },
                    ]
                }
            },
            //

            // forgot password
            {
                key:"container a_p_p_LoginPasswordOneContainer",
                type:"div",
                split:8,
                left:350,
                height:600,
                top:-600,
                options:{

                    extras:{
                        appAwsLogin:{
                            type:["password1"],
                        }
                    },
                },
                latch:{
                    type:"display",
                    display:{
                        type:"target",
                        name:"password1"
                    },
                    zChildren:[
                        {
                            bool:"p",
                            val:"title a_p_p_LoginPasswordOneTitle",
                            text:`Please Enter Your Username and Password and the OTP from your authenticator app`,
                            logic:{
                                desktop:{
                                    width:.8,
                                    height:()=>{return 30},
                                    top:50,
                                    left:100
                                },
                                mobile:{
                                    width:.2,
                                    height:.2,
                                    top:0,
                                    left:0
                                }
                            },
                            extras:{
                                appAwsLogin:{
                                    type:["password1","password1Bold"],
                                }
                            },
                            group:["password1"]

                        },
                        // @ts-ignore
                        ...Array(3).fill(null).map((x:any,i)=>{
                            return {
                                bool:"i",
                                val:"input a_p_p_LoginPasswordOneInput",

                                logic:{
                                    desktop:{
                                        width:.8,
                                        height:()=>{return 50},
                                        top:[150,250,350][i],
                                        left:100
                                    },
                                    mobile:{
                                        width:.2,
                                        height:.2,
                                        top:0,
                                        left:0
                                    }
                                },
                                extras:{
                                    appAwsLogin:{
                                        type:["password1","password1Bold",["password1User","password1Pass","password1TOTP"][i]],
                                    },
                                    appAttribute:{
                                        type:["target"],
                                        options:{
                                            attrObject:{
                                                placeholder:["Username","Password","six-digit code"][i]
                                            }
                                        }
                                    }
                                },
                                group:["password1"]

                            }

                        }),
                        {
                            // @ts-ignore
                            bool:"b",
                            val:"button a_p_p_LoginPasswordOneButton",
                            text:`Submit `,
                            logic:{
                                desktop:{
                                    width:()=>{return 300},
                                    height:()=>{return 120},
                                    top:450,
                                    left:300
                                },
                                mobile:{
                                    width:.2,
                                    height:.2,
                                    top:0,
                                    left:0
                                }
                            },
                            extras:{
                                appAwsLogin:{
                                    type:["password1","password1Bold","password1Submit"],
                                }
                            },
                            group:["password1"]

                        },

                    ]
                }
            },
            {
                key:"container a_p_p_LoginPasswordTwoContainer",
                type:"div",
                split:8,
                left:350,
                height:600,
                top:-600,
                options:{

                    extras:{
                        appAwsLogin:{
                            type:["password2"],
                        }
                    },
                },
                latch:{
                    type:"display",
                    display:{
                        type:"target",
                        name:"password2"
                    },
                    zChildren:[
                        {
                            bool:"p",
                            val:"title a_p_p_LoginPasswordTwoTitle",
                            text:`Enter Your New Password`,
                            logic:{
                                desktop:{
                                    width:.8,
                                    height:()=>{return 30},
                                    top:50,
                                    left:100
                                },
                                mobile:{
                                    width:.2,
                                    height:.2,
                                    top:0,
                                    left:0
                                }
                            },
                            extras:{
                                appAwsLogin:{
                                    type:["password2","password2Bold"],
                                }
                            },
                            group:["password2"]

                        },
                        // @ts-ignore
                        ...Array(3).fill(null).map((x:any,i)=>{
                            return {
                                bool:"i",
                                val:"input a_p_p_LoginPasswordTwoInput",

                                logic:{
                                    desktop:{
                                        width:.8,
                                        height:()=>{return 50},
                                        top:[150,250,350][i],
                                        left:100
                                    },
                                    mobile:{
                                        width:.2,
                                        height:.2,
                                        top:0,
                                        left:0
                                    }
                                },
                                extras:{
                                    appAwsLogin:{
                                        type:["password2","password2Bold",["password2OldPass","password2NewPass","password2ConfirmPass"][i]],
                                    },
                                    appAttribute:{
                                        type:["target"],
                                        options:{
                                            attrObject:{
                                                placeholder:["Old Password","New Password","Confirm Password"][i]
                                            }
                                        }
                                    }
                                },
                                group:["password2"]

                            }

                        }),
                        {
                            // @ts-ignore
                            bool:"p",
                            val:"passwordError a_p_p_LoginPasswordTwoTextError",
                            // text:"Passwords do not match",
                            logic:{
                                desktop:{
                                    width:.25,
                                    height:()=>{
                                        return 50
                                    },
                                    top:450,
                                    left:650
                                },
                                mobile:{
                                    width:.2,
                                    height:.2,
                                    top:0,
                                    left:0
                                }
                            },
                            extras:{
                                appAwsLogin:{
                                    type:["password2","password2Bold","password2PassError"],
                                },
                            },
                            group:["password2"]

                        },
                        {
                            // @ts-ignore
                            bool:"b",
                            val:"button a_p_p_LoginPasswordTwoButton",
                            text:`Submit `,
                            logic:{
                                desktop:{
                                    width:()=>{return 300},
                                    height:()=>{return 120},
                                    top:450,
                                    left:300
                                },
                                mobile:{
                                    width:.2,
                                    height:.2,
                                    top:0,
                                    left:0
                                }
                            },
                            extras:{
                                appAwsLogin:{
                                    type:["password2","password2Bold","password2Submit"],
                                }
                            },
                            group:["password2"]

                        },

                    ]
                }
            },
            {
                key:"container a_p_p_LoginPasswordThreeContainer",
                type:"div",
                split:8,
                left:350,
                height:600,
                top:-600,
                options:{

                    extras:{
                        appAwsLogin:{
                            type:["password3"],
                        }
                    },
                },
                latch:{
                    type:"display",
                    display:{
                        type:"target",
                        name:"password3"
                    },
                    zChildren:[
                        {
                            bool:"p",
                            val:"title a_p_p_LoginPasswordThreeTitle",
                            text:`Password Updated Sucesfully`,
                            logic:{
                                desktop:{
                                    width:.8,
                                    height:()=>{return 30},
                                    top:50,
                                    left:100
                                },
                                mobile:{
                                    width:.2,
                                    height:.2,
                                    top:0,
                                    left:0
                                }
                            },
                            extras:{
                                appAwsLogin:{
                                    type:["password3","password3Bold"],
                                }
                            },
                            group:["password3"]

                        },


                    ]
                }
            },
            //
        ]
    }
]

let socialAcctDev :Array<Partial<zProtoComponent>> = [
    {
        title:"socialAcct",
        metafields:[
            {
                key:"body",
                type:"body",
                navigation:{
                    name:["socialAcct"],
                    confirm:"true",
                    type:["body"]
                },
                options:{
                    extras:{
                        appSocialLogin:{
                            confirm:"true",
                            type:["body"]
                        },
                        appComponents:{
                            type:["body"],
                            confirm:"true",
                        }
                    },
                    judima:{
                        moving:{
							point:"bottom",
							target:'mainBackground',
							coordinates:{x:50,y:70},
							type:"custom"
                        }
                    }
                }
            },
            {
                key:"socialAcct a_p_p_SocialAcctPod",
                type:"div",
                split:8,
                left:350,
                height:600,
                latch:{
                    type:"display",
                    display:{
                        type:"target",
                        name:"socialLogin"
                    },
                    zChildren:Array(10).fill(null)
                    .map((x:any,i)=>{

                        let prefixes = [
                            "FB","TW","IG","PI","TM","DS","RDIT","BLOG","TW","PT"
                        ]
                        let classes = [
                            "facebook  a_p_p_SocialAcctFBLoginButton",
                            "twitter   a_p_p_SocialAcctTWLoginButton",
                            "instagram a_p_p_SocialAcctIGLoginButton",
                            "pinterest a_p_p_SocialAcctPILoginButton",
                            "tumblr    a_p_p_SocialAcctTMLoginButton",
                            "discord   a_p_p_SocialAcctDSLoginButton",
                            "reddit    a_p_p_SocialAcctRDITLoginButton",
                            "blogger   a_p_p_SocialAcctBLOGLoginButton",
                            "twitch    a_p_p_SocialAcctTWLoginButton",
                            "patreon   a_p_p_SocialAcctPTLoginButton"
                        ]
                        let text=  ["Facebook","Twitter","Instagram","Pinterest","Tumblr","Discord","Reddit","Blogger","Twitch","Patreon"]
                        .map((x,i)=>{
                            return "Manage " +x + " Account"
                        })
                        let icons = Array(10).fill(null).map((x,i)=>{
                            return {
                                src:mediaPrefix({media:'shared/'+i+".png"})
                            }
                        })
                        let socialLogin = Array(10).fill(null).map((x,i)=>{
                            return {
                                type:prefixes
                                .map((y,j)=>{
                                    return y+"Manage"
                                })[i]
                            }
                        })
                        return {
                            bool:"app-components" ,
                            val:"loginPod a_p_p_SocialAcctLoginButtonPod",
                            css:{
                                "z-index":5,
                            },
                            logic:{
                                desktop:{
                                    width:()=>{return 300},
                                    height:()=>{return 60},
                                    top:[100,200,300,400,500].map((x,i)=>{return x- 40})[i%5],
                                    left:[280,630][Math.floor(i/5)],
                                },
                                mobile:{
                                    width:.2,
                                    height:.2,
                                    top:0,
                                    left:0
                                }
                            },
                            extras:{
                                options:{
                                    type:"socialAcctLoginButton",
                                    button:{
                                        text:text[i],
                                        class:classes[i],
                                    },
                                    icon:{
                                        src:icons[i]?.src,
                                    },
                                    component:{
                                        class:"a_p_p_SocialAcctLoginButtonView"
                                    }
                                },
                                appSocialLogin:{
                                    type:["mainLogin","mainLoginBold",socialLogin[i].type]
                                }
                            },
                            group:["socialLogin"]



                        }
                    })




                },
                options:{
                    extras:{
                        appSocialLogin:{
                            type:["mainLogin","mainLoginPod"]
                        }
                    }
                }
            },
            {
                key:"container a_p_p_SocialAcctFBLoginView",
                type:"components",
                split:8,
                left:350,
                height:600,
                top:-600,
                options:{
                    extras:{
                        options:{
                            type:"awsLogin",
                            lazyLoad:"true",
                            component:{
                                style:{
                                    "background-color":"#fff",
                                }
                            },
                            panels:[
                                [
                                    {
                                        type:"title",
                                        innerText:"Facebook",
                                        class:"a_p_p_SocialAcctFBLoginViewStageTitle",
                                        appSocialLogin:{
                                            type:["FB1","FB1Bold"],
                                        }
                                    },
                                    ...Array(2).fill(null)
                                    .map((x:any,i)=>{
                                        return {
                                            type:"input",
                                            class:"a_p_p_SocialAcctFBLoginViewStageInput",
                                            placeholder:["Username","Password"][i],
                                            appSocialLogin:{
                                                type:["FB1","FB1Bold",["FB1User","FB1Pass"][i]]
                                            },
                                        }
                                    }),
                                    {
                                        type:"button",
                                        class:`a_p_p_SocialAcctFBLoginViewStageButton
                                        a_p_p_SpecificBG1`,
                                        innerText:`Submit`,
                                        style:{
                                            margin:"30px auto 0 auto",
                                            height:"120px",
                                            width: "230px",
                                        },
                                        appSocialLogin:{
                                            type:["FB1","FB1Bold","FB1Submit"]
                                        },

                                    },
                                ]
                            ]
                        },
                        appSocialLogin:{
                            type:["FB","FBBold","FBView1"]
                        },
                        appComponents:{
                            type:["lazyLoad"],
                            duplicateIgnore:"true",
                            zSymbolNeeded:"true",
                            options:{
                                lazyLoad:{
                                    delay:1000,
                                    tryAgain:"true"
                                }
                            }
                        }
                    }
                }
            },

        ]
    },
]

let _Dev:Array<zProtoComponent>  =[
    ...backgroundDev,
    ...menuDev,
    ...accountDev,
    ...socialAcctDev
]
.map((x:any,i)=>{
	x.type_slug = "forms"
	return x
})

website.convertCMS = _Dev
export default website
