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
            // Catch the client exception
        } catch (\Exception $e) {
            return view('pong.dashboard', [
                'error' => $e->getMessage()
            ]);
        }

        return view('pong.dashboard', [
            'scores' => $scores,
        ]);
    }
}
 
