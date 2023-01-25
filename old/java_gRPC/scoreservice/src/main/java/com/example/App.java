package com.example;

import com.google.protobuf.RpcCallback;
import com.google.protobuf.RpcController;
import com.google.protobuf.Service;
import com.google.protobuf.BlockingRpcChannel;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {
        Server server = ServerBuilder.forPort(port)
            .addService(new ScoreServiceImpl())
            .build()
            .start();

        BlockingRpcChannel channel = new InProcessChannelBuilder("score_service").build();
        ScoreServiceOuterClass.ScoreServiceBlockingStub stub = ScoreServiceOuterClass.ScoreServiceBlockingStub.newStub(channel);

        // Use the stub to call the sendScore and getScores methods
        stub.sendScore(score);
        Scores scores = stub.getScores(Empty.getDefaultInstance());

        // Shut down the server when the application exits
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            server.shutdown();
        }));

    }
}