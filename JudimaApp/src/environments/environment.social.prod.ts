

export const environment:any = {
    production: true,
    url: 'Judima',


    cookie:{
        // permission:"allow",
        // confirm:"false"
    },

    component: {

        form: {
            panelView:-1, //should be a number use a positive number to view it
            lifecycleHooks: false,
            zChildView:-1,
			zChild:[-1],
			topLevelZChild:[-1],
            drag:[-1],
        },
        app: {
            lifecycleHooks:false
        }
    },
    directive:{
        deltaNode:{
            lifecycleHooks:false
        },
        latch:{
            lifecycleHooks:false
        },
		login:{
			lifecycleHooks:false
		}
    },

    testingAcct:{
		confirm:"false", //true for hubspot false for drive
		capybara: { // remove this if not doing unit or e2e tests impt
			main:"true",
			url:"gdp",
		}
    },
    sentry:{
        env:"gdp_development",
        defaultIntegrations:true,
        tracingOrigins:["localhost",/^\//]
    },
	navigation:{
		startURL:"/menu",
        type:"full" //[SPA,full],
	},
    sectionDefault:{
        type:"custom" //[stack,custom]
    },
    //

	// dev additions
    dev:{
        // delete account
        deleteSignIn:{
            dummy:false
        },
        deleteConfirm:{
            dummy:false
        },
        //

        // create account
        createAccount:{
            dummy:false
        },
        confCode:{
            dummy:false
        },
        totpCreateAccount:{
            dummy:false
        },

        // signIn
        totpSignIn:{
            dummy:false
        },
        //

        // password
        passSignIn:{
            dummy:false
        },
        passChange:{
            dummy:false
        }
        //
    },
	backend:{
		url:"https://my-backend.herokuapp.com/",
	},
    three:{
        camera:{
            position:{
                x:0,
                y:0,
                z:1700
            }
        }
    }
	//




};

