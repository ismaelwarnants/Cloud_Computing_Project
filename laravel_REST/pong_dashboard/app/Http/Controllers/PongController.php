<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class PongController extends Controller {
    public function dashboard()
    {
        $client = new Client();
        try {
            $response = $client->get('http://127.0.0.1:5000/pong/scoreboard');
            if($response->getStatusCode() == 200 && $response->hasHeader('content-type') && $response->getHeader('content-type')[0] === 'application/json') {
                $data = json_decode($response->getBody()->getContents(), true);
                $scores = $data['scores'];
            } else {
                throw new \Exception("Invalid data format. Expected JSON data");
            }
        } catch (\GuzzleHttp\Exception\ClientException $e) {
            // handle exception when the request to the endpoint failed, such as when the server is down or the endpoint is not reachable.
        } catch (\Exception $e) {
            // handle exception when the response from the endpoint is not in the expected format.
            return view('pong.dashboard', [
                'error' => $e->getMessage()
            ]);
        }

        // Pass scores to view
        return view('pong.dashboard', [
            'scores' => $scores,
        ]);
    }
}
 
