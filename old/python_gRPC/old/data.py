import grpc
import uuid

import data_pb2
import data_pb2_grpc

# Create a gRPC channel and stub
channel = grpc.insecure_channel('localhost:50051')
stub = data_pb2_grpc.ScoreboardStub(channel)

# Generate a random UUID for the user
user_id = str(uuid.uuid4())

# Send the UUID and score of the user to the server
stub.SendScore(data_pb2.UserScore(user_id=user_id, score=87))

# Retrieve a list of users and scores from the server
response = stub.GetLeaderboard(data_pb2.LeaderboardRequest())
scores = response.scores

# Print the list of users and scores
for score in scores:
    print(f"{score.user_id}: {score.score}")
