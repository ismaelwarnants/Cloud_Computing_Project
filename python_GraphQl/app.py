'''from typing import Dict
from flask import Flask, jsonify, request
from graphene import ObjectType, String, Schema, Field, Int, Boolean
from graphql import graphql_sync
from flask_cors import CORS
import json

class Query(ObjectType):
    pass

class LoginStatus(ObjectType):
    success = Boolean()
    message = String()

class AuthMutation(ObjectType):
    login = Field(LoginStatus, username=String(required=True), password=String(required=True))

    def mutate(self, info, username, password):
        return login(username, password)

def login(username, password):
    # check if the received username and password match the expected
    # username and password
    print("Login did something")
    if username == "admin" and password == "password":
        return LoginStatus(success=True, message="Login successful")
    else:
        return LoginStatus(success=False, message="Invalid username or password")

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:8000", "methods": "GET,POST"}})

schema = Schema(query=Query, mutation=AuthMutation)

@app.route('/graphql', methods=['POST'])
def graphql_route():
    data = json.loads(request.data)
    result = graphql_sync(schema.graphql_schema, data['query'], variable_values=data.get('variables'), context_value={"login": login})
    return jsonify(result.data)

if __name__ == '__main__':
    app.run()'''


from flask import Flask, jsonify
from flask_graphql import GraphQLView
from graphene import ObjectType, String, Schema
from flask_cors import CORS
import soap_api

app = Flask(__name__)

class Query(ObjectType):
    login = String(username=String(required=True), password=String(required=True))

    def resolve_login(self, info, username, password):
        return soap_api.login(username,password)
        '''if username == "test" and password == "test":
            return "YESSSSSSSSSSSS"
        else:
            return "0"'''
            
    createuser = String(username=String(required=True), password=String(required=True))

    def resolve_createuser(self, info, username, password):
        return soap_api.create_user(username,password)
        '''if username == "test" and password == "test":
            return "YESSSSSSSSSSSS"
        else:
            return "0"'''

schema = Schema(query=Query)

app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True))
CORS(app, resources={r"/*": {"origins": "http://localhost:8000", "methods": "GET,POST"}})

if __name__ == '__main__':
    app.run()
