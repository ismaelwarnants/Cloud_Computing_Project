# Cloud Computing Project: pong

## Concept
Het project is een uitgebreide versie van het spel pong.


Hierbij is de basis van een pong spel in Express genomen van deze repo: https://github.com/mmaksi/multiplayer-pong


De code daarvan is gewijzigd zodat dit kan samenwerken met authenticatie, een timer heeft, het spel op andere voorwaarden gestart wordt, 
extra endpoints voor het spel te doen starten en stoppen op de juiste momenten, 
sockets toegevoegd voor met flask te communiceren en client-side javascript toegevoegd om met GraphQl te communiceren.


Flask stuurt de request over GraphQl door via SOAP naar C# om dan dezelfde weg terug te volgen om de authenticatie af te ronden.


Laravel vraagt via REST de scores die opgeslagen zijn in Flask op om daarna in een scoreboard te renderen.


Deze manier van werken is miniem gehouden om het gefocust te houden op de interactie tussen de services. 
Daarom dat het concept van een pong spel gekozen is om dit na te bouwen.

## Uitvoeren

Het project kan ook in Docker gedraaid worden en draait op dit moment in Azure (enkele kleine wijzigingen zijn daarvoor gemaakt): http://137.117.131.224/


Na deze repo te clonen kan de docker-compose stack gedraaid worden met volgend commando:
```
sudo docker-compose -p pong_cloud up --build
```
