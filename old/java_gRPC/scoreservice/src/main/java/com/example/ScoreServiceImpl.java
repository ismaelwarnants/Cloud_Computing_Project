package com.example;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import com.google.protobuf.RpcCallback;
import com.google.protobuf.RpcController;
import com.google.protobuf.Service;
import com.google.protobuf.BlockingRpcChannel;

public class ScoreServiceImpl extends ScoreServiceOuterClass.ScoreService {

    private List<Score> scores = new ArrayList<>();

    @Override
    public void sendScore(RpcController controller, Score request,
                          RpcCallback<Empty> done) {
        scores.add(request);
        done.run(Empty.getDefaultInstance());
    }

    @Override
    public void getScores(RpcController controller, Empty request,
                           RpcCallback<Scores> done) {
        Collections.sort(scores, new ScoreComparator());
        Scores.Builder scoresBuilder = Scores.newBuilder();
        for (Score score : this.scores) {
            scoresBuilder.addScores(score);
        }
        done.run(scoresBuilder.build());
    }

    private class ScoreComparator implements Comparator<Score> {
        @Override
        public int compare(Score s1, Score s2) {
            return s2.getScore() - s1.getScore();
        }
    }
}