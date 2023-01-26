from flask import Flask, jsonify
from flask_graphql import GraphQLView
from graphene import ObjectType, String, Schema
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import soap_api, json

app = Flask(__name__)
socketio = SocketIO(app)

scores = []

users = {}

# REST
@app.route('/pong/scoreboard', methods=['GET'])
def scoreboard():
    return jsonify({'scores': scores})


def add_score(UUID1,score1,UUID2,score2):
    scores.append({'player1': {'name': find_user(UUID1), 'score': score1}, 'player2': {'name': find_user(UUID2), 'score': score2}})
    
def store_user(username, uuid_i):
    uuid = uuid_i
    users[uuid] = username
    return uuid

def find_user(uuid):
    if uuid in users:
        return users[uuid]
    return None

# Websocket
@socketio.on('finished', namespace='/pong')
def handle_message(message):
    winner = message['winnerId']
    UUID1 = message['UUID1']
    UUID2 = message['UUID2']
    score1 = message['score1']
    score2 = message['score2']
    print('Winner is Player ' + str(winner))
    add_score(UUID1,score1,UUID2,score2)
    # Eventueel iets terug sturen naar Express:
    #emit('pong', {'data': 'Echo: ' + message}, namespace='/pong')

# GraphQl
class Query(ObjectType):
    login = String(username=String(required=True), password=String(required=True))

    def resolve_login(self, info, username, password):
        return soap_api.login(username,password)
            
    createuser = String(username=String(required=True), password=String(required=True))

    def resolve_createuser(self, info, username, password):
        uuid = soap_api.create_user(username,password)
        if(len(uuid) == 36):
            store_user(username,uuid)
        return uuid

schema = Schema(query=Query)

app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True))
CORS(app, resources={r"/*": {"origins": "*", "methods": "GET,POST,PUT"}})

if __name__ == '__main__':
    #app.run()
    socketio.run(app)
