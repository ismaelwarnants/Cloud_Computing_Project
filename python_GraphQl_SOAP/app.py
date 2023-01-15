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
