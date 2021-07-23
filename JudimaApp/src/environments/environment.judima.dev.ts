

export const environment:any = {
    production: false,
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
			zChild:[1],
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
			lifecycleHooks:true
		}
    },


    testingAcct:{
		confirm:"true", //true for hubspot false for drive
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
		startURL:"/login",
        type:"full" //[SPA,full],
	},
    //

	// dev additions
	backend:{
		url:"http://127.0.0.1:3005",
        // storageURL:"http://127.0.0.1:10000/devstoreaccount1/",
        storageURL:"https://storageacctdemo624.blob.core.windows.net/",
        storageContainerURL:"https://storageacctdemo624.blob.core.windows.net/azure"


	}
	//




};

