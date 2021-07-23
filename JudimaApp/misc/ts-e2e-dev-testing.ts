// you place these in the final bloack after app ngAfterViewInit,
    // say you dont want to setup e2e automation while you develop

// @ts-nocheck
// create account test code
let wait$ = of([]).pipe(delay(500))
concat(
    wait$.pipe(tap(()=>{
        eventDispatcher({
            element:document.querySelectorAll(".a_p_p_MenuItem")[1],
            event:'click'
        })
    })),
    wait$.pipe(tap(()=>{
        let createButton = document.querySelectorAll(".a_p_p_LoginCreateButton")[0]
        eventDispatcher({
            element:createButton,
            event:'click'
        })
    })),
    wait$.pipe(tap(()=>{

        let createButton = document.querySelectorAll(".a_p_p_LoginCreateOneButton")[0]
        eventDispatcher({
            element:createButton,
            event:'click'
        })
    }))
)
.subscribe()
//


//  test create acct
let wait$ = of([]).pipe(delay(1000))
concat(
    wait$.pipe(tap(()=>{

        eventDispatcher({
            element:document.querySelectorAll(".a_p_p_MenuItem")[1],
            event:'click'
        })
    })),
    wait$.pipe(tap(()=>{
        let createButton = document.querySelectorAll(".a_p_p_LoginCreateButton")[0]
        eventDispatcher({
            element:createButton,
            event:'click'
        })
        ;(document.querySelector(".f_o_r_m_email") as HTMLInputElement).value = "michaelodumosu57@gmail.com"
        ;(document.querySelector(".f_o_r_m_password") as HTMLInputElement).value = "Turkey123456"
        ;(document.querySelector(".f_o_r_m_confirmPassword") as HTMLInputElement).value = "Turkey123456"
    })),
    wait$.pipe(tap(()=>{

        let createButton = document.querySelectorAll(".a_p_p_LoginCreateOneButton")[0]
        eventDispatcher({
            element:createButton,
            event:'click'
        })
    }))
)
.subscribe()
//

// sign In
let wait$ = of([]).pipe(delay(1000))
concat(
    wait$.pipe(tap(()=>{

        eventDispatcher({
            element:document.querySelectorAll(".a_p_p_MenuItem")[1],
            event:'click'
        })
    })),
    wait$.pipe(tap(()=>{
        let createButton = document.querySelectorAll(".a_p_p_LoginSignInButton")[0]
        eventDispatcher({
            element:createButton,
            event:'click'
        })
        Array.from(
            document.querySelectorAll(".a_p_p_LoginSignInOneInput")
        )
        .forEach((x:any,i)=>{
            x.value = ["michaelodumosu57@gmail.com","Turkey123456",""][i]
        })
        let submitButton = document.querySelectorAll(".a_p_p_LoginSignInOneButton")[0]
        eventDispatcher({
            element:submitButton,
            event:'click'
        })

    })),

)
.subscribe()
//

//change password
let wait$ = of([]).pipe(delay(2000))
concat(
    wait$.pipe(
        delay(2000),
        tap(()=>{
            eventDispatcher({
                element:document.querySelectorAll(".a_p_p_MenuItem")[1],
                event:'click'
            })
        })
    ),
    wait$.pipe(
        delay(2000),
        tap(()=>{
            let createButton = document.querySelectorAll(".a_p_p_LoginPasswordButton")[0]
            Array.from(
                document.querySelectorAll(".a_p_p_LoginPasswordOneInput")
            )
            .forEach((x:any,i)=>{
                x.value = ["michaelodumosu57@gmail.com","Turkey123456",""][i]
            })
            eventDispatcher({
                element:createButton,
                event:'click'
            })
        })
    ),
    wait$.pipe(
        tap(()=>{
            let submitButton = document.querySelectorAll(".a_p_p_LoginPasswordOneButton")[0]
            eventDispatcher({
                element:submitButton,
                event:'click'
            })
            Array.from(
                document.querySelectorAll(".a_p_p_LoginPasswordTwoInput")
            )
            .forEach((x:any,i)=>{
                x.value = ["Turkey123456","123456Turkey","123456Turkey"][i]
            })
        })
    ),
    wait$.pipe(
        delay(1000),
        tap(()=>{
               ryber.appCO0.metadata.awsLogin.access_token = "eyJraWQiOiJUV3hleThZRGlrSExJR09pM0hHXC9XMDhzOWV6S1RnTVB5YXV3c3gxM2N2az0iLCJhbGciOiJSUzI1NiJ9.eyJvcmlnaW5fanRpIjoiZWRiZDhkMWEtYmVlMS00MGZkLWFkNzktZTgyNGFiMDdmNDA4Iiwic3ViIjoiODI2MmJiMTktZTY4YS00ZDBmLWJjOGEtMzRiYjAxMGI5YzYxIiwiZXZlbnRfaWQiOiIzMGQ5ZWQzMC1iNTU1LTQyMzktYTk1MC0zN2YwYjliMjM2MjAiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjI2MDE1NzUyLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl9Ta0pySTU5ZG4iLCJleHAiOjE2MjYwMTkzNTIsImlhdCI6MTYyNjAxNTc1MiwianRpIjoiMDE2NTAyODQtZGExOS00ODk3LTkyZDItN2JlZGEzYmI3ODQ4IiwiY2xpZW50X2lkIjoiM3JkMmQ0cmZuNGJldDNobnBtN2lkMmlnOWEiLCJ1c2VybmFtZSI6IjgyNjJiYjE5LWU2OGEtNGQwZi1iYzhhLTM0YmIwMTBiOWM2MSJ9.Yie3LeQ-EwBNprQCmvbvH-2Mr_vDFOHQwPdmwGtdt4Ceu7fYXBHdHr-cSBDN1jMykHbPZnWt5LiVHfW6AsOFZPI_xD6l5bV01nfVkK16EE6ZKQlt3lHTfO-IdM02fjfbp5ZepBdBRGCCqA0KvqOEH4_r2BzWK3Nqn1zXTthE4LToYVgtZf9Wt4k84SG8SJUUZphtDBMvTYLkprAZYRMxWVNTytJeWOxb18Dfddz3j0-j2tyYZz8lWum03DzpnyVWpglXkNA0-uFz2SwKSVcuVoIEm-rK6D49O5cv_vBLD6Ieq4y1ga1aGqcCZJPNrUgFkA7eeauDYjd6v6ERgffbrQ"
            let submitButton = document.querySelectorAll(".a_p_p_LoginPasswordTwoButton")[0]
            eventDispatcher({
                element:submitButton,
                event:'click'
            })
        })
    )

)
.subscribe()
//

// delete account
let wait$ = of([]).pipe(delay(2000))
concat(
    wait$.pipe(
        delay(2000),
        tap(()=>{
            eventDispatcher({
                element:document.querySelectorAll(".a_p_p_MenuItem")[1],
                event:'click'
            })
        })
    ),
    wait$.pipe(
        delay(2000),
        tap(()=>{
            let createButton = document.querySelectorAll(".a_p_p_LoginDeleteButton")[0]
            eventDispatcher({
                element:createButton,
                event:'click'
            })
            Array.from(
                document.querySelectorAll(".a_p_p_LoginDeleteOneComponentInput")
            )
            .forEach((x:any,i)=>{
                x.value = ["michaelodumosu57@gmail.com","123456Turkey",""][i]
                wait$.pipe(
                    take(1),
                    tap(()=>{
                        eventDispatcher({
                            element:x,
                            event:'blur'
                        })
                    })
                )
                .subscribe()
            })

        })
    ),
    wait$.pipe(
        tap(()=>{
            let submitButton = document.querySelectorAll(".a_p_p_LoginDeleteOneComponentButton")[0]
            eventDispatcher({
                element:submitButton,
                event:'click'
            })

        })
    ),
    iif(
        // @ts-ignore
        ()=>{return "deleteMe" === "no"},
        wait$.pipe(
            delay(1000),
            tap(()=>{
                ryber.appCO0.metadata.awsLogin.access_token = "eyJraWQiOiJUV3hleThZRGlrSExJR09pM0hHXC9XMDhzOWV6S1RnTVB5YXV3c3gxM2N2az0iLCJhbGciOiJSUzI1NiJ9.eyJvcmlnaW5fanRpIjoiYmYxMzViYmYtMzEzOC00MjBlLTljMDEtMWZmZDkzMTQzNmU4Iiwic3ViIjoiODI2MmJiMTktZTY4YS00ZDBmLWJjOGEtMzRiYjAxMGI5YzYxIiwiZXZlbnRfaWQiOiJjMjU4OWMzYy1jMWE0LTRjNjYtODI5Ny02MWM1NTExMzJhNzEiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjI2MTA2OTAwLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl9Ta0pySTU5ZG4iLCJleHAiOjE2MjYxMTA1MDAsImlhdCI6MTYyNjEwNjkwMCwianRpIjoiYWNhODAwOTAtZTJlNC00MDA4LWFlNzktOGNhY2I5OWY4NTk5IiwiY2xpZW50X2lkIjoiM3JkMmQ0cmZuNGJldDNobnBtN2lkMmlnOWEiLCJ1c2VybmFtZSI6IjgyNjJiYjE5LWU2OGEtNGQwZi1iYzhhLTM0YmIwMTBiOWM2MSJ9.UvxJMMsYWXt2mr5aQS03zB46BptVJMWPGamEapTnfIQxP-H8BCFzQBV26QPECEqbBSaZvKLmuXhx7mICaAR_3YGycrSDLmD0XK7vDu2TE09i6VsDywSyYZzZxFpTX7o5AuDkKtk342kGet17R-rn6c5-r9qJtFSgdZUC5-0qigiytUycTNPwMXD6i0J33K4suTRvhlwzvwHEPuQ89MDGSYWP5tpPHnh7V9P2nPo5-oKBoAqAGZqLyBPM1wEsx30Wm_Mbf9NG9fbEX0xPfdAVhue24Z4ba19NSm0mzaW9UgZMD_YKlBLG1aAUgSSyZl1LdqZWViW21Y1QYm5Im7x-Ag"
                let deleteButton = document.querySelectorAll(".a_p_p_LoginDeleteTwoComponentButtonDanger")[0]
                eventDispatcher({
                    element:deleteButton,
                    event:'click'
                })
            })
        ),
        wait$.pipe(
            delay(1000),
            tap(()=>{
                let cancelButton = document.querySelectorAll(".a_p_p_LoginDeleteTwoComponentButton")[0]
                eventDispatcher({
                    element:cancelButton,
                    event:'click'
                })
            })
        )
    )

)
.pipe(
    // tap(console.log)
)
.subscribe()
//


//  back and forth the page state is preserved
let wait$ = of([]).pipe(delay(2000))
concat(
    wait$.pipe(
        delay(2000),
        tap(()=>{
            eventDispatcher({
                element:document.querySelectorAll(".a_p_p_MenuItem")[1],
                event:'click'
            })
        })
    ),
    concat(
    wait$.pipe(
        delay(2000),
        tap(()=>{
            eventDispatcher({
                element:document.querySelectorAll(".a_p_p_MenuItem")[0],
                event:'click'
            })
        })
    ),
    wait$.pipe(
        delay(2000),
        tap(()=>{
            eventDispatcher({
                element:document.querySelectorAll(".a_p_p_MenuItem")[1],
                event:'click'
            })
        })
    ),
    )
    .pipe()


)
.pipe(
    // tap(console.log)
)
.subscribe()
