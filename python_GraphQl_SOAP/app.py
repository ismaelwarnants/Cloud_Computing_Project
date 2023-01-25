from flask import Flask, jsonify
from flask_graphql import GraphQLView
from graphene import ObjectType, String, Schema
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import soap_api, json

app = Flask(__name__)
socketio = SocketIO(app)

# REST
@app.route('/pong/scoreboard', methods=['GET'])
def scoreboard():
    scores = [
        {'player1': {'name': 'player1', 'score': 5}, 'player2': {'name': 'player2', 'score': 8}},
        {'player1': {'name': 'player3', 'score': 3}, 'player2': {'name': 'player4', 'score': 7}},
        {'player1': {'name': 'player5', 'score': 6}, 'player2': {'name': 'player6', 'score': 9}}
    ]

    return jsonify({'scores': scores})

# Websocket
@socketio.on('finished', namespace='/pong')
def handle_message(message):
    winner = message['winnerId']
    UUID1 = message['UUID1']
    UUID2 = message['UUID2']
    score1 = message['score1']
    score2 = message['score2']
    print('Winner is Player ' + str(winner))
    #Send to laravel
    
    #emit('pong', {'data': 'Echo: ' + message}, namespace='/pong')

# GraphQl
class Query(ObjectType):
    login = String(username=String(required=True), password=String(required=True))

    def resolve_login(self, info, username, password):
        return soap_api.login(username,password)
            
    createuser = String(username=String(required=True), password=String(required=True))

    def resolve_createuser(self, info, username, password):
        return soap_api.create_user(username,password)

schema = Schema(query=Query)

app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True))
CORS(app, resources={r"/*": {"origins": "*", "methods": "GET,POST,PUT"}})

if __name__ == '__main__':
    #app.run()
    socketio.run(app)
