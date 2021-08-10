# Summary
* refer to README.md in ignore
## Features include 
* main posting page, create a post choose your platforms or messeger servcies, then upload, or schedule upload
* work with your calendar to update your schedule
* add "post (email) signature" , have your custom selection
* have a collection of posts to be randomized 
* message people on their platforms, and try to follow and make friend requests to grow the business


Only members of the project can read the README.md from the ignore folder
# Stack 

## Frontend
* Three.js  v0.130.1
* Tween.js  v18.6.4
* Angular  v11.2.13
* angularx-qrcode v11.0.0

## Backend
* Tornado v6.1
* boto3 (aws cognito idp) v1.17.107


## Testing
* Docker, (tes in docker containers from linux VM) v20.10.7

### Unit
* rspec    v3.10.0
* capybara v3.35.3

### Integration
* rspec    v3.10.0
* capybara v3.35.3

### E2E
* rspec    v3.10.0
* capybara v3.35.3

* mailslurp v12.7.1
* puffing billy v2.4.1

## Hosting
* codesandbox , frontend v.2.2.3
* heroku, backend v7.56.0


## CI/CD
* CircleCI
* Docker v20.10.7
* Virtual Box v 6.1.22
* Ubuntu VM 20.04.1


# Structure

## Linting Rules
* for each commit, we append "WORKING COMMIT" so we know the commit is free of bugs
* ruby indentation 2 lines
* ts indentation 4 lines


## Project Directory Mapping

### Frotend
#### Configurations
* we use __JudimaApp/src/envrionments__ - for dev and prod frontend configurations we includes configuations for features in the app


### Backend
*  __JudimaApp/backend/python/template.py__ is mainly a class for a route for the tornado server 
*  __JudimaApp/backend/python/tornad_server.py__ - dev backend server
* __JudimaApp/backend/python/tornado_heroku_server.py__ - prod backendserver

#### Configurations
* refer to README.md in ignore

### Login
* __JudimaApp/src/app/directive/aws-login.directive.ts__ will handle the login logic for the account login and social media login page, 
    * __JudimaApp/src/app/ryber.service.ts__ will be used for cross component subjects, to connect the related metadata as well as a contain a library for handling XHR to the backend in the ryber.aws object 
    * __JudimaApp/backend/python/template.py__ is the backed that makes sure social platform metadata is connected to the User attributes of account metadata, 

#### QRCode
* the qr code is 3rd party and can be found in __JudimaApp/src/app/components__
    

### Space Animation
* __JudimaApp/src/app/directive/three.directive.ts__ handles the three.js animation of the planets moving, it implements tween.js for a smooth experience and makes uses of the app nav logic, other features should use the directive when handling navigation as three might be our primary choice for handling navigation
* tween.js scripts found in __JudimaApp/src/assets/scripts/tween.js__

### Testing 
* in __JudimaApp/testing/TESTS.md__ we have  where we write pseudo code for our unit,e2e and integration tests later
* __JudimaApp/testing/e2e/social-e2e-circleci.rb__ - is where all of our e2e tests live, we test on docker in a ubuntu 20.04 to closely represent the circleCI env and write the code 
* in the local testing env we use a gui browser, to oberserve to  make sure the tests work properly, however in circleci we have the browsers run in headless mode. 

### CI/CD
* IN .circle is our config.yml, we make use of the company's Docker image as well as the circleci browser-build tools orb, as a general practice we packages our dependencies into the orb so we dont have to increased build times


### Issues
* say we have issues and we are looking for support with a library language or other 3rd party found here __JudimaApp/misc/issues
### Future Plans
refer to README.md in ignore

####  Posting Content
* we need to rely on aws-login to grab the credential metadata we need


## Site Navigation

* to navigate through the website, end user clicks on the links in the dropdown , the camera will move to different planets showingthe different pages of the website.

### Home Page 
* the menu appears as well as the solar system background of the website , nothing fancy here

### Account Login Page
* here the user is presented with sign in ,create account  change password and delete account options, interactive prompts should help the end user achieve their goal. Uses TOTP MFA for login into the application

### Social Media Login Page 
* here the user can login to their various social media accounts, once logged in they can interact with the platform via the app. platform metadata is stored with the AWS cognito app account

### Post Content Page 
* allows the user to choose their social platforms, and post now or schedule their post

### Dashboard
* we might change this to calendar, an overall dashboard of their account and all features we offer


# Issues 
* everything needs lazyloading, 
* make sure that we make good use of the refresh token to check if the user is logged in, and give them their resources

# TODO
* support for a firebase build option
* if we can figure out how to get puffing billy to rediect the prod backend, rewrite local and ci tests to use prod instead of dev
* work on responsiveness or platform integration

## Template updates
more mixins
# Resources


## Snippets
* to generate a directive
```ps1
npx ng generate directive directiveDev/name
```

## Codesandbox 
[codesandbox frontend](https://codesandbox.io/s/socialmediaapp-0yfhm)


## Heroku
[heroku backend](https://dashboard.heroku.com/apps/socialpost-2414/settings)


## CircleCI

[circle ci config yml](https://circleci.com/docs/2.0/configuration-reference/#environment)

[circle ci orb issue](https://discuss.circleci.com/t/issue-with-the-browser-circleci-browser-tools-1-1-3/40695/4)


[orb browser tools docs](https://circleci.com/developer/orbs/orb/circleci/browser-tools#commands-install-chromedriver)

[cimg base](https://github.com/CircleCI-Public/cimg-base)

[circle ci custom built docker images](https://circleci.com/docs/2.0/custom-images/?utm_medium=SEM&utm_source=gnb&utm_campaign=SEM-gb-DSA-Eng-uscan&utm_content=&utm_term=dynamicSearch-&gclid=EAIaIQobChMI1ZSz0fTr8QIVAa7ICh1OtAw7EAAYASAAEgI_IvD_BwE)


## AWS 
[aws user pools](https://us-east-2.console.aws.amazon.com/cognito/users/?region=us-east-2#/?_k=brvsie)

[aws cognito idp docs](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/cognito-idp.html#)

[good to store credentials in aws cognito](https://stackoverflow.com/questions/50601827/is-a-custom-attribute-in-cognito-user-pool-the-proper-place-to-store-dynamic-use)


## Docker
[install docker ubntu 20.04 vm](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04)

[gui broser from docker](https://www.youtube.com/watch?v=E-GwJwulyxE)

[windmillcode docker hub repo](https://hub.docker.com/repository/registry-1.docker.io/windmillcode/angular-tornado-capybara/tags?page=1&ordering=last_updated)

[pyenv base image](https://github.com/molinav/docker-pyenv)

[dockerfile docs](https://docs.docker.com/engine/reference/builder/)

[install rbenv linux 20.04 vm](https://linoxide.com/how-to-install-ruby-on-ubuntu-20-04/)

[install nvm in docker](https://stackoverflow.com/questions/25899912/how-to-install-nvm-in-docker)

[-eo pipefail issue](https://transang.me/best-practice-to-make-a-shell-script/) 

## Three.js
[three js docs](https://threejs.org/docs/index.html?q=geome#api/en/geometries/TorusKnotGeometry)

## Capybara
[capybara](https://rubydoc.info/github/jnicklas/capybara)

[chrome command line swithces](https://peter.sh/experiments/chromium-command-line-switches/)





### Puffing Billy
[puffing billy doc](https://www.rubydoc.info/gems/puffing-billy#contributing)













