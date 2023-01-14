import soap_api

userName = 'ismael'
password = 'password'

print(soap_api.create_user(userName,password))
print(soap_api.login(userName,password))