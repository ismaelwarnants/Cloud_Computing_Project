<!-- resources/views/pong/dashboard.blade.php -->
<html>
    <head>
        <style>
            table {
                width: 50%;
                margin: 0 auto;
                border-collapse: collapse;
                table-layout: fixed;
                word-wrap: break-word;
            }

            th, td {
                border: 1px solid #dddddd;
                padding: 8px;
                text-align: left;
            }

            th {
                background-color: #f2f2f2;
            }


        </style>
    </head>
    <body>
        @if(isset($error))
            <p>{{ $error }}</p>
        @else
            <table>
                <tr>
                    <th>Player 1</th>
                    <th>Score</th>
                    <th>Player 2</th>
                    <th>Score</th>
                </tr>
                @foreach($scores as $score)
                    <tr>
                        <td>{{ $score['player1']['name'] }}</td>
                        <td>{{ $score['player1']['score'] }}</td>
                        <td>{{ $score['player2']['name'] }}</td>
                        <td>{{ $score['player2']['score'] }}</td>
                    </tr>
                @endforeach
            </table>
        @endif
    </body>
</html>
