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
import traceback
import re


# aws cognito
import boto3
from botocore import errorfactory
# import boto3.exceptions.ParamValidationError
from botocore.exceptions import ParamValidationError

# from  boto3.CognitoIdentityProvider.Client.exceptions import UsernameExistsException
import hmac, hashlib, base64
app_client_id = os.getenv('COGNITO_USER_CLIENT_ID')
sec_key = os.environ.get("COGNITO_CLIENT_SECRET")
user_pool_id =os.environ.get("COGNITO_USER_POOL_ID")

sts_client_id =os.environ.get("STS_USER_CLIENT_ID")
sts_client_secret =os.environ.get("STS_USER_CLIENT_SECRET")

session_client = boto3.client(
    'sts',
    aws_access_key_id=    sts_client_id,
    aws_secret_access_key=sts_client_secret,
    region_name=os.getenv('COGNITO_REGION_NAME')
)
session_info = session_client.get_session_token()
session_token = session_info.get("Credentials").get("SessionToken")
session_access_key_id = session_info.get("Credentials").get("AccessKeyId")
session_secret_access_key = session_info.get("Credentials").get("SecretAccessKey")

client = boto3.client(
    'cognito-idp',
    aws_access_key_id=    session_access_key_id,
    aws_secret_access_key=session_secret_access_key,
    aws_session_token=session_token,
    region_name=os.getenv('COGNITO_REGION_NAME')
)

# cognito_client = boto3.client(
#     'cognito-idp',
#     aws_access_key_id=     app_client_id,
#     aws_secret_access_key= sec_key,
#     region_name=os.getenv('COGNITO_REGION_NAME')
# )
UsernameExistsException = client.exceptions.UsernameExistsException
CodeMismatchException = client.exceptions.CodeMismatchException
InvalidParameterException = client.exceptions.InvalidParameterException
LimitExceededException = client.exceptions.LimitExceededException
NotAuthorizedException = client.exceptions.NotAuthorizedException

#



# end

class my_ibm_language_client():

    def error_handler(self,e,env):
        print("---------------------------")
        print('my custom error at {}\n'.format(env))
        print(e.__class__.__name__)
        print(traceback.print_exc())
        print("---------------------------")
        if e.__class__.__name__ == 'ParamValidationError':
            return {
                'status':401,
                'message':"Unauthenticated"
            }
        elif e.__class__.__name__ == "NotAuthorizedException":

            return {
                'status':401,
                'message':"Unauthenticated"
            }
        return {
            'status':404,
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
        self.re = re

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
        self.ParamValidationError = ParamValidationError
        #

    def gen_secret_hash(self,func):
        print("-------------------")
        print('{}\n'.format('generate secret hash'))
        def inner(username,app_client_id,sec_key):

            try:
                message = bytes(username+app_client_id,'utf-8')
                key = bytes(sec_key,'utf-8')
                secret_hash = base64.b64encode(hmac.new(key, message, digestmod=hashlib.sha256).digest()).decode()

                return func(username,app_client_id,sec_key,secret_hash)
            except ParamValidationError as e:
                return {
                    'status':401,
                    'message':"Unauthenticated"
                }
            except NotAuthorizedException as e:
                return {
                    'status':401,
                    'message':"Unauthenticated"
                }
            except LimitExceededException as e:
                return {
                    'status':500,
                    'message':"Limit Exceeded"
                }
            except InvalidParameterException as e:

                return {
                    'status':500,
                    'message':"Format the target string properly"
                }
            except CodeMismatchException as e:
                return {
                    'status':404,
                    'message':"Code Mismatch"
                }
            except UsernameExistsException as e:
                return {
                    'status':500,
                    'message':"Username Exists"
                }
            except Exception as e:
                return  self.error_handler(e,"generate secret hash")

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
        re = self.re

        env = data.get("env")
        username = data.get("user")
        password = data.get("pass")
        result = data.get("result")
        token = data.get("token")
        target = data.get("target")
        access_token = data.get('access_token')
        refresh_token = data.get('refresh_token')
        refresh_user = data.get('refresh_user')

        # aws cognito
        client = self.client
        sec_key = self.sec_key
        app_client_id = self.app_client_id
        totp = data.get('totp')
        user_pool_id =self.user_pool_id
        conf_code = data.get('conf_code')
        old_pass = data.get('old_pass')
        new_pass = data.get('new_pass')
        confirm_pass = data.get('confirm_pass')
        ParamValidationError = self.ParamValidationError
        #

        # facebook
        FaceB = data.get('FaceB')
        #

        if(env == 'createAccount'):
            print('-------------------')
            print('\n{}\n'.format('createAccount'))
            try:

                @self.gen_secret_hash
                def createAccount(a,b,c,s_h):


                    # client sign up
                    client.sign_up(
                        ClientId=app_client_id,
                        Username=username,
                        Password=password,
                        SecretHash=s_h
                    )
                    #

                    return {
                        'status':200,
                        'message':{
                            "message":"OK",
                        }
                    }
                return createAccount(username,app_client_id,sec_key)


            except BaseException as e:
                return self.error_handler(e,env)

        elif(env == 'confirmAccount'):
            print('-------------------')
            print('\n{}\n'.format('confirmAccount'))
            try:
                @self.gen_secret_hash
                def confirmAccount(a,b,c,s_h):
                    nonlocal conf_code
                    conf_code = ''.join(list(filter(lambda x: x != ' ',conf_code.split(' '))))
                    client.confirm_sign_up(
                        ClientId=os.getenv('COGNITO_USER_CLIENT_ID'),
                        Username=username,
                        ConfirmationCode=conf_code,
                        SecretHash=s_h
                    )

                    # get access token
                    response = client.initiate_auth(
                        ClientId=app_client_id,
                        AuthFlow='USER_PASSWORD_AUTH',
                        AuthParameters={
                            'USERNAME': username,
                            'PASSWORD': password,
                            'SECRET_HASH':s_h
                        },
                    )
                    access_token = response.get('AuthenticationResult').get('AccessToken')
                    refresh_token = response.get('AuthenticationResult').get('RefreshToken')
                    #



                    return {
                        'status':200,
                        "refresh_token":refresh_token,
                        'message':{
                            "message":"OK",
                            "access_token":access_token,
                        }
                    }
                return confirmAccount(username,app_client_id,sec_key)


            except BaseException as e:
                return self.error_handler(e,env)

        elif(env == 'resendCode'):
            print('-------------------')
            print('\n{}\n'.format('resendCode'))
            try:
                @self.gen_secret_hash
                def resendCode(a,b,c,s_h):
                    client.resend_confirmation_code(
                        ClientId=os.getenv('COGNITO_USER_CLIENT_ID'),
                        Username=username,
                        SecretHash=s_h
                    )
                    return {
                        'status':200,
                        'message':{
                            'message':'OK'
                        }
                    }
                return resendCode(username,app_client_id,sec_key)

            except BaseException as e:
                return self.error_handler(e,env)

        elif(env == 'QR_init'):
            print('-------------------')
            print('\n{}\n'.format('QR_init'))


            response = client.associate_software_token(
                AccessToken=access_token,
            )

            # # enable MFA
            # client.admin_set_user_mfa_preference(
            #     SoftwareTokenMfaSettings={
            #         'Enabled': True,
            #         'PreferredMfa': True
            #     },
            #     Username=username,
            #     UserPoolId=user_pool_id
            # )
            # #
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
                user_code = ''.join(list(filter(lambda x: x != ' ',totp.split(' '))))
                response = client.verify_software_token(
                    AccessToken=access_token,
                    UserCode=user_code
                )

                # get the actual username
                response =client.get_user(
                    AccessToken=access_token
                )
                refresh_user = list(filter(
                    lambda x:x.get('Name') == 'sub',
                    response.get('UserAttributes')
                ))[0].get('Value')
                #


                return {
                    'status':200,
                    "refresh_user":refresh_user,
                    'message':{
                        'message':"OK"
                    }
                }
            except ParamValidationError as e:
                return {
                    'status':401,
                    'message':"Unauthenticated"
                }
            except BaseException as e:
                return self.error_handler(e,env)

        elif(env == 'signInUserPassTOTP'):
            print('-------------------')
            print('\n{}\n'.format('signInUserPassTOTP'))
            try:
                @self.gen_secret_hash
                def signInUserPassTOTP(a,b,c,s_h):

                    response = client.initiate_auth(
                        ClientId=app_client_id,
                        AuthFlow='USER_PASSWORD_AUTH',
                        AuthParameters={
                            'USERNAME': username,
                            'PASSWORD': password,
                            'SECRET_HASH':s_h
                        },
                    )

                    pp.pprint(response)
                    access_token = response['AuthenticationResult']['AccessToken']
                    refresh_token = response['AuthenticationResult']['RefreshToken']


                    user_code = ''.join(list(filter(lambda x: x != ' ',totp.split(' '))))
                    response = client.verify_software_token(
                        # Session=session,
                        AccessToken=access_token,
                        UserCode=user_code
                    )

                    # get the actual username
                    response =client.get_user(
                        AccessToken=access_token
                    )
                    refresh_user = list(filter(
                        lambda x:x.get('Name') == 'sub',
                        response.get('UserAttributes')
                    ))[0].get('Value')
                    #


                    return {
                        'status':200,
                        "refresh_token":refresh_token,
                        "refresh_user":refresh_user,
                        'message':{
                            "message":"OK",
                            "access_token":access_token,
                        }
                    }
                return signInUserPassTOTP(username,app_client_id,sec_key)


            except BaseException as e:
                return self.error_handler(e,env)

        elif(env == 'changePass'):
            print('-------------------')
            print('\n{}\n'.format('changePass'))
            try:
                response = client.change_password(
                    PreviousPassword=old_pass,
                    ProposedPassword=new_pass,
                    AccessToken=access_token
                )
                pp.pprint(response)
                return {
                    'status':200,
                    'message':{
                        'message':'OK'
                    }
                }

            except BaseException as e:
                return self.error_handler(e,env)

        elif(env == 'deleteAcct'):
            print('-------------------')
            print('\n{}\n'.format('deleteAcct'))
            try:
                client.delete_user(
                    AccessToken=access_token
                )
                return {
                    'status':200,
                    'refresh_clear':{
                        'refresh_token':'clear',
                        'refresh_user':'clear',
                    },
                    'message':{
                        'message':'OK'
                    }
                }

            except BaseException as e:
                return self.error_handler(e,env)

        elif(env == 'refreshPage'):
            print('-------------------')
            print('\n{}\n'.format('refreshPage'))
            try:


                @self.gen_secret_hash
                def refreshPage(a,b,c,s_h):
                    # get access token
                    response = client.initiate_auth(
                        ClientId=app_client_id,
                        AuthFlow='REFRESH_TOKEN',
                        AuthParameters={
                            'REFRESH_TOKEN': refresh_token,
                            'SECRET_HASH':s_h
                        },
                    )
                    access_token = response.get('AuthenticationResult').get('AccessToken')
                    # refresh_token = response.get('AuthenticationResult').get('RefreshToken')
                    #

                    my_user = client.admin_get_user(
                        Username=refresh_user,
                        UserPoolId=user_pool_id,
                    )
                    a_t_pattern = re.compile(r'^custom:.+access_token')
                    social_access_tokens = list(filter(
                        lambda x: a_t_pattern.fullmatch(x.get('Name')) != None,
                        my_user.get('UserAttributes')
                    ))

                    return {
                        'status':200,
                        'message':{
                            'message':'OK',
                            'social_access_tokens':social_access_tokens,
                            "access_token":access_token,
                        }
                    }
                return refreshPage(refresh_user,app_client_id,sec_key)

            except BaseException as e:
                return self.error_handler(e,env)

        elif(env == 'dummy'):
            print('-------------------')
            print('\n{}\n'.format('dummy'))
            try:

                return {
                    'status':200,
                    'refresh_clear':{
                        'refresh_token':'clear',
                        'refresh_user':'clear',
                    },
                    'message':{
                        'message':'OK',
                    }
                }

            except BaseException as e:
                return self.error_handler(e,env)
        # socialLogin
        pattern = re.compile(r'add(FaceB|TW|IG|PI|TM|DS|RDIT|BLOG|TWH|PT)Acct')
        match = pattern.fullmatch(env)
        if(match !=None):
            print('-------------------')
            print('\n{}\n'.format(env))
            try:



                client.admin_update_user_attributes(
                    Username=refresh_user,
                    UserPoolId=user_pool_id,
                    UserAttributes=[
                        {
                            'Name': 'custom:FaceB_access_token',
                            'Value': FaceB.get("access_token")
                        },
                    ],
                )


                return {
                    'status':200,
                    'message':{
                        'message':'OK'
                    }
                }

            except BaseException as e:
                return self.error_handler(e,env)


        #
        elif(env == 'adminDeleteAcct'):
            print('-------------------')
            print('\n{}\n'.format('adminDeleteAcct'))
            try:
                response =client.admin_delete_user(
                    UserPoolId=user_pool_id,
                    Username=username
                )

                return {
                    'status':200,
                    'message':{
                        'message':'OK'
                    }
                }

            except BaseException as e:
                return self.error_handler(e,env)

        elif(env == 'adminSignOutUser'):
            print('-------------------')
            print('\n{}\n'.format('adminSignOutUser'))
            try:
                #  stop the refresh token
                response = client.admin_user_global_sign_out(
                    UserPoolId=user_pool_id,
                    Username=username
                )
                #

                # print(access_token)
                # stop the access token
                # client.revoke_token(
                #     Token=refresh_token,
                #     ClientId=app_client_id,
                #     ClientSecret=sec_key
                # )
                #


                return {
                    'status':200,
                    'message':{
                        'message':'OK'
                    }
                }

            except BaseException as e:
                return self.error_handler(e,env)
        return {
            "status" :500,
            "message": "Check the backend env dictionary you did set it so the backend didnt do anything"
        }










