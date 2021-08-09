# DevOps TESTS
* MAKE SURE YOU UPDATE THE PRODUCTION FILES WITH THE DEV FILES
    * directiveDev -> directive 
* judima_enviroment cant go on the window in prod mode, figure out a diffrent way to get creds or get puffing_billy to work
# CircleCI
__ISSUE__ - the orb scripts fail while building the docker image

# UNIT TESTS


## website.ts
* make sure next is only used if there is room to spare on the previous line

## component.directive.ts

* test that on lazyLoad
    * if a situation arizes where the subscribtion closes before the import promise resloves, notify the developer on how to handle the situation
    * the component gets lazyLoaded, and the process does not interfere with other component zChildren
    * test that on navigation we lazyload again if need be

# E2E Tests


## Errors
* use sentry to deal with any unexpected errors
* make sure all retryable errors are retryable

## Navigation

* make sure we move to the appropriate planet when we click on a link
    * __ISSUE__ -we dont know how to know how select with three.js
* make sure that the coorect display is set 
* __MAJOR ISSUE__ if there is not a smooth transition you may need to lazyLoad
    * we used the tween.onComplete, however the component needs to be lazyloaded
        * it may be because you listen when an element is added instead of when the zChildren are actually done
## Login Page
* if the user is not logged they will be greeted by a blank screen if they head through the app
* when clicked show mainLogin z-index 5
* as the user interacts with the login make sure that the panels appear and overlay appropriately
* update all passwords as needed
* for repeatables like userpassTOTP, make a function for each of the rxjs pipe instead of repeating yourself

### Create User
* when the end user hits creates users
    * hide mainLogin, make z-index 4
    * show create1, make z-index 5
    * make sure ty
    pe password
    * if email exists
        * prompt user to try again with a different email
    
* when the user sucesfully creates an account
    * hide create1
    * show  create4
    * if the account already exist and other errors prompt accordingly
* the user should check their email for the confirmation code
    * once sucessful 
        * make sure the refresh_token cookie is set
        * show create 2 
        * hide create 4
    * if failed re-prompt for confirmation code
* the user should scan the qrcode to the TOTP to register as a new account
then enter the TOTP to confirm MFA
    * once thats finished let the user know they have sucesfully created their account
    * remember for future sign in they need TOTP MFA
    * tell them proceed to the social media login page
    * make sure the refresh_user cookie is saved
* once they proceed away from the account login page 
    * reset account login page

    

### Sign In
* when the user clicks the sign in button
    * hide mainLogin
    * show  signIn1
* if the username ,password, and TOTP  is correct
    * hide signIn1
    * show signIn2, aka
    * let them proceed to interactt with their data for the rest of their site
* if the username | password | TOTP is incorrect
    * inform the user and try again
__ISSUE__ - if you set user prefreence for MFA it doesn't provide for refresh and access tokens, either we set this up or we dont?
    * we tried to use the Session as its an argument, but verify_token doesnt like it

### Change Password
*  when the user clicks change password
    * hide mainLogin
    * show  password1
* have the user relogin with user.pass.TOTP
    * hide password1
    * show password2
* inccorect user.pass.TOTP
    * reprompt
* user enters old,new and confirm sucessfully
    * let them know their password has been changed
* user enters old,new and confirm fail
    * let them know the issue and whether to proceed or try later
* after user changes password they can sign in with new password



### Delete User
* we kinda messed up when setting components for delete user
    * we never expected to requrie the panel to be a div and not ng-container, because of flexbox
        __TEST__ - test that as you move  through the components panels that the z-indexs are properly setup 
    lazy load fires onces because its instructed not to fire again, you'd think the module gets loaded in time however as soon as another zChild is added, we unsubscribe, once again, array of objects, for subscriptions it may not be  too late however we dont know side effects. Mainly what happens is the promise resovles but we unsub too quickly, and we dont allow to resub. in investigation we find that the promises resolves, so its wasting resources grabbing  the module. however its not grabbing the component class that hangs the UI its the loading of the component. since it desires too fire after all the elements have been added, the zChild has been and the only thing it has its its responsiveness, 
        __TEST__ - features fire after listening to a subject indicating its ready for directive features
* the delete button must not fire until the component is loaded
    * tests that setup happens once and there are no zombie subscriptions, 
        * you must make sure there is order
            * component loads
            * non component types, know about it and fire setup once
            * setup happens once with no duplicate zombies
* when user clicks delete user
    * hide mainLogin
    * show delete1
* user logs in sucessfully
    *hide delete1
    * show delete2
* user logs in fail
    * tell them to respond accordingly
* user clicks delete
    * hide delete2
    * show delete3
    * clear the refresh_user and refresh_token
* user hits back
    * hide delete2 
    * show mainLogin
    * make sure they still have their account !
    
## Social Acct
* test that I can navigate there from the menu and there are 10 buttons
* make sure the user is signed in before continuing

### Facebook
* test that if I try to login to the FB accout with a social account I am sent to the acct login page
    * optional, check if state is restored


