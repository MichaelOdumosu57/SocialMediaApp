import sys
if sys.platform == "win32":
    sys.path.append(sys.path[0] + "\\site-packages\\windows")
elif sys.platform =="linux":
    sys.path.append(sys.path[0] + "/site-packages/linux")
import json
import os
import uuid
import datetime
import time
import pprint
import asyncio
import json
import datetime
# import pytz
import time
pp = pprint.PrettyPrinter(indent=4, compact=True, width=1)
import random
import lorem
import jwt
import requests
from datetime import datetime,timedelta
from operator import attrgetter,itemgetter


# aws cognito
import boto3
import hmac, hashlib, base64
app_client_id = os.getenv('COGNITO_USER_CLIENT_ID')
sec_key = os.environ.get("COGNITO_CLIENT_SECRET")
user_pool_id =os.environ.get("COGNITO_USER_POOL_ID")

#
sts_client_id =os.environ.get("STS_USER_CLIENT_ID")
sts_client_secret =os.environ.get("STS_USER_CLIENT_SECRET")
session_client = boto3.client(
    'sts',
    aws_access_key_id=    sts_client_id,
    aws_secret_access_key=sts_client_secret,
    region_name=os.getenv('COGNITO_REGION_NAME')
)
session_token = session_client.get_session_token().get("Credentials").get("SessionToken")

client = boto3.client(
    'cognito-idp',
    aws_access_key_id=     app_client_id,
    aws_secret_access_key= sec_key,
    aws_session_token=session_token,
    region_name=os.getenv('COGNITO_REGION_NAME')
)
#



# end

class my_ibm_language_client():

    def error_handler(self,e,env):
        print("---------------------------")
        print('my custom error at {}\n'.format(env))
        print(e.__class__.__name__)
        print(e)
        print("---------------------------")
        return {
            'status':500,
            'message': 'an error occured check the output from the backend'
        }

    def __init__(self):
        self.datetime = datetime
        self.timedelta = timedelta
        self.time = time
        self.uuid = uuid
        self.random = random
        self.requests = requests
        self.lorem  = lorem
        self.jwt = jwt

        # login from facebook user
        self.auth_enum = {
            "Error":"Log In Again",
            "Authorized":"Authorized",
            "Invalid":"Please try again",
        }
        #

        # aws cognito
        self.attrgetter = attrgetter # look up python destructuring
        self.itemgetter = itemgetter
        self.client = client
        self.sec_key = sec_key
        self.app_client_id = app_client_id
        self.user_pool_id = user_pool_id
        self.hmac = hmac
        self.hashlib = hashlib
        self.base64 = base64
        #



    def token_required(self,func):
        print("-------------------")
        print('{}\n'.format('token required'))
        def inner(token,user,my_type="access"):

            print(self)
            pp.pprint(self.facebook_login)
            if not token :
                print('\n{}\n'.format('token missing'))
                return {
                    "status":401,
                    "message":self.auth_enum["Error"]
                }
            elif not user :
                print('\n{}\n'.format('user missing'))
                return {
                    "status":401,
                    "message":self.auth_enum["Error"]
                }
            elif not self.facebook_login.get("users").get(user):
                print('\n{}\n'.format('the backend doesnt have an auth object'))
                return {
                    "status":401,
                    "message":self.auth_enum["Error"]
                }


            secret_type = my_type +"_secret"
            target_dict = self.facebook_login.get("users")[user]

            if( target_dict.get("tries") <= 0):
                # expire the refresh key the user should login again
                print("\n{}\n".format("bad access token"))
                target_dict["refresh_secret"] = ""
                print(target_dict)
                #
                return {
                    "status":401,
                    "message":self.auth_enum["Error"]
                }
            try:
                mySecret = target_dict.get(secret_type)
                print("\n{}\n".format(target_dict))
                payload = jwt.decode(token, key=mySecret, algorithms=["HS256"])
                print(payload)
                print("Authorized")
                print("------------------")

            except jwt.InvalidTokenError as e:
                print(e)
                print('Invalid')
                target_dict["tries"] -= 1
                if(target_dict.get("tries")<= 0):
                    # expire the refresh key the user should login again
                    print("\n{}\n".format("bad access token"))
                    target_dict["refresh_secret"] = ""
                    #
                    return {
                        "status":401,
                        "message":self.auth_enum["Error"]
                    }
                return {
                    "status":403,
                    "message":self.auth_enum["Invalid"]
                }
            except BaseException as e:
                return self.error_handler(e,env="token_required")
            return func(token,user,my_type)

        return inner


    def execute(self, data):

        #setup

        jwt = self.jwt
        timedelta = self.timedelta
        datetime = self.datetime
        time = self.time
        uuid = self.uuid
        random = self.random
        lorem = self.lorem
        requests = self.requests
        hmac = self.hmac
        hashlib = self.hashlib
        base64 = self.base64



        env = data.get("env")
        username = data.get("user")
        password = data.get("pass")
        result = data.get("result")
        token = data.get("token")
        target = data.get("target")
        access_token = data.get('access_token')

        # aws cognito
        client = self.client
        sec_key = self.sec_key
        app_client_id = self.app_client_id
        totp = data.get('totp')
        user_pool_id =self.user_pool_id
        #


        if(env == 'login_0'):
            print('-------------------')
            print('\n{}\n'.format('login_0'))
            try:
                return {
                    'status':200,
                    'message':'OK'
                }

            except BaseException as e:
                return self.error_handler(e,env)

        elif(env == 'createAccount'):
            print('-------------------')
            print('\n{}\n'.format('createAccount'))
            try:
                message = bytes(username+app_client_id,'utf-8')
                key = bytes(sec_key,'utf-8')
                secret_hash = base64.b64encode(hmac.new(key, message, digestmod=hashlib.sha256).digest()).decode()


                # client sign up
                client.sign_up(
                    ClientId=app_client_id,
                    Username=username,
                    Password=password,
                    SecretHash=secret_hash
                )
                #

                # confirm sign up
                print("error occurs here")
                client.admin_confirm_sign_up(
                    UserPoolId=user_pool_id,
                    Username=username,
                )
                #

                # get access token
                response = client.initiate_auth(
                    ClientId=app_client_id,
                    AuthFlow='USER_PASSWORD_AUTH',
                    AuthParameters={
                        'USERNAME': username,
                        'PASSWORD': password,
                        'SECRET_HASH':secret_hash
                    },
                )
                access_token = response.get('AuthenticationResult').get('AccessToken')
                refresh_token = response.get('AuthenticationResult').get('RefreshToken')
                #

                #  verify their email
                # client.admin_update_user_attributes(
                #     UserPoolId=user_pool_id,
                #     Username=username,
                #     UserAttributes=[
                #         {
                #             'Name': "email_verified",
                #             'Value': "true"
                #         },
                #     ],
                # )
                client.update_user_attributes(
                    UserAttributes=[
                        {
                            'Name': "email_verified",
                            'Value': "true"
                        },
                    ],
                    AccessToken=access_token,
                )

                #



                # enable MFA
                response =client.admin_set_user_mfa_preference(
                    SoftwareTokenMfaSettings={
                        'Enabled': True,
                        'PreferredMfa': True
                    },
                    Username=username,
                    UserPoolId=user_pool_id,
                )
                pp.pprint(response)
                #





                return {
                    'status':200,
                    "refresh_token":refresh_token,
                    'message':{
                        "message":"OK",
                        "access_token":access_token,
                    }
                }
            # try:
            #     None
            except BaseException as e:
                return self.error_handler(e,env)

        elif(env == 'QR_init'):
            print('-------------------')
            print('\n{}\n'.format('QR_init'))


            response = client.associate_software_token(
                AccessToken=access_token,
                # Session=session
            )
            try:
                return {
                    'status':200,
                    'message':{
                        'QR_code':response.get("SecretCode")
                    }
                }

            except BaseException as e:
                return self.error_handler(e,env)

        elif(env == 'QR_TOTP'):
            print('-------------------')
            print('\n{}\n'.format('QR_TOTP'))
            try:

                response = client.verify_software_token(
                    AccessToken=access_token,
                    UserCode=totp
                )

                pp.pprint(response)


                return {
                    'status':200,
                    'message':{
                        'message':"OK"
                    }
                }

            except BaseException as e:
                return self.error_handler(e,env)



        return {
            "status" :500,
            "message": "Check the backend env dictionary you did set it so the backend didnt do anything"
        }




if __name__ == "__main__":

    username = 'michaelodumosu57@gmail.com'
    password = '#Abc1234asdasdasd'
    app_client_id = os.getenv('COGNITO_USER_CLIENT_ID')
    sec_key = os.environ.get("COGNITO_CLIENT_SECRET")
    message = bytes(username+app_client_id,'utf-8')
    key = bytes(sec_key,'utf-8')
    secret_hash = base64.b64encode(hmac.new(key, message, digestmod=hashlib.sha256).digest()).decode()

    client = boto3.client(
        'cognito-idp',
        aws_access_key_id=app_client_id,
        aws_secret_access_key=sec_key,
        region_name=os.getenv('COGNITO_REGION_NAME')
    )
    print(client)
    # client sign up
        # they get confirmation code when they sign up
    # response = client.sign_up(
    #     ClientId=app_client_id,
    #     Username=username,
    #     Password=password,
    #     SecretHash=secret_hash
    # )
    #

    # resend confirmation code
    # response = client.resend_confirmation_code(
    #     ClientId=os.getenv('COGNITO_USER_CLIENT_ID'),
    #     Username=username,
    #     SecretHash=secret_hash
    # )
    #

    # confirm the account
    # response = client.confirm_sign_up(
    #     ClientId=os.getenv('COGNITO_USER_CLIENT_ID'),
    #     Username=username,
    #     ConfirmationCode='794248',
    #     SecretHash=secret_hash
    # )
    #

    # get access and refresh token
    # response = client.initiate_auth(
    #     ClientId=os.getenv('COGNITO_USER_CLIENT_ID'),
    #     AuthFlow='USER_PASSWORD_AUTH',
    #     AuthParameters={
    #         'USERNAME': username,
    #         'PASSWORD': password,
    #         'SECRET_HASH':secret_hash
    #     },
    # )
    #

    # start the TOTP MFA
    response = client.initiate_auth(
        ClientId=os.getenv('COGNITO_USER_CLIENT_ID'),
        AuthFlow='USER_PASSWORD_AUTH',
        AuthParameters={
            'USERNAME': username,
            'PASSWORD': password,
            'SECRET_HASH':secret_hash
        },
    )
    access_token = response['AuthenticationResult']['AccessToken']
    # session = response["Session"]

    response = client.associate_software_token(
        AccessToken=access_token,
        # Session=session
    )

    #

    pp.pprint(response)





