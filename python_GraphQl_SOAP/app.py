from flask import Flask, jsonify
from flask_graphql import GraphQLView
from graphene import ObjectType, String, Schema
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import soap_api, json

app = Flask(__name__)
socketio = SocketIO(app)

@socketio.on('finished', namespace='/pong')
def handle_message(message):
    winner = message['winnerId']
    UUID1 = message['UUID1']
    UUID2 = message['UUID2']
    score1 = message['score1']
    score2 = message['score2']
    print('Winner is Player ' + str(winner))
    
    #{'winnerId ': 1, 'UUID1': 'f0325d70-ae15-4f45-b66e-60f3a2dde788', 'UUID2': 'e75c8b8b-55f5-416a-be63-5c183a13697f', 'score1': 5, 'score2': 0}
    #emit('pong', {'data': 'Echo: ' + message}, namespace='/pong')

class Query(ObjectType):
    login = String(username=String(required=True), password=String(required=True))

    def resolve_login(self, info, username, password):
        return soap_api.login(username,password)
            
    createuser = String(username=String(required=True), password=String(required=True))

    def resolve_createuser(self, info, username, password):
        return soap_api.create_user(username,password)

schema = Schema(query=Query)

app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True))
CORS(app, resources={r"/*": {"origins": "http://localhost:8000", "methods": "GET,POST"}})

if __name__ == '__main__':
    #app.run()
    socketio.run(app)
