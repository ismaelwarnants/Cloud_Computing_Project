import requests
import xmltodict

# SOAP request URL
url = "http://localhost:5231/authenticate.asmx?wsdl"

def login(userName, password):
    payload = """<?xml version=\"1.0\" encoding=\"utf-8\"?>
                <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
                    <Body>
                        <Login xmlns="http://tempuri.org/">
                            <userName>"""+userName+"""</userName>
                            <password>"""+password+"""</password>
                        </Login>
                    </Body>
                </Envelope>"""
    
    headers = {
        'Content-Type': 'text/xml; charset=utf-8'
    }
    
    response = requests.request("POST", url, headers=headers, data=payload)

    '''print(response.text)
    print(response)'''
    
    root = xmltodict.parse(response.text)
    #print(root)
    if('LoginResult' in root['s:Envelope']['s:Body']['LoginResponse']):
        #print(root['s:Envelope']['s:Body']['LoginResponse']['LoginResult'])
        return root['s:Envelope']['s:Body']['LoginResponse']['LoginResult']
    else:
        print("Invalid username or password")
        return "0"
        
def create_user(userName, password):
    payload = """<?xml version=\"1.0\" encoding=\"utf-8\"?>
                <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
                    <Body>
                        <CreateUser xmlns="http://tempuri.org/">
                            <userName>"""+userName+"""</userName>
                            <password>"""+password+"""</password>
                        </CreateUser>
                    </Body>
                </Envelope>"""

    headers = {
        'Content-Type': 'text/xml; charset=utf-8'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    '''print(response.text)
    print(response)'''
    
    root = xmltodict.parse(response.text)
    #print(root)
    if('CreateUserResult' in root['s:Envelope']['s:Body']['CreateUserResponse']):
        #print(root['s:Envelope']['s:Body']['CreateUserResponse']['CreateUserResult'])
        return root['s:Envelope']['s:Body']['CreateUserResponse']['CreateUserResult']
    else:
        print("User already exists")
        return "0"

