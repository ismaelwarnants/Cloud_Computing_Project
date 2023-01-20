import grpc

import your_proto_file_pb2
import your_proto_file_pb2_grpc

def send_score(score):
    channel = grpc.insecure_channel('localhost:8080')
    score_service = your_proto_file_pb2_grpc.ScoreServiceStub(channel)
    score_request = your_proto_file_pb2.Score(name=score['name'], uuid=score['uuid'], score=score['score'])
    score_service.SendScore(score_request)
    
def get_scores():
    channel = grpc.insecure_channel('localhost:8080')
    score_service = your_proto_file_pb2_grpc.ScoreServiceStub(channel)
    scores = score_service.GetScores(your_proto_file_pb2.Empty())
    return scores
