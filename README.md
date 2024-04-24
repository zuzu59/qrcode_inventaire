# qrcode_inventaire
Juste une petite appli pour lire un qrcode avec son smartphone et aller chercher l'information dans une DB Nocodb via API REST

zf240424.1417


## Buts
Lire le qrcode collé sur un objet avec son smartphone et afficher les informations d'une DB Nocodb via API REST à son sujet.

Cela permet de pouvoir contrôler directement sur le terrain la *situation* de l'objet *scanné*.


## Problématiques
Vu que l'on se trouve sur le terrain et non dans un bureau, il faut que le système soit le plus simple possible. C'est pourquoi on utilise une application *mobile WEB* sur un smartphone.

Il faut aussi que tout soit très *standardisé*, *ouvert* et *simple* au niveau gestion. Aussi bien au niveau de la BD (*backend* API REST) que le système sur le smartphone (*frontend* *mobile web app*), afin que l'on puisse faire évoluer la solution au cours du temps sans devoir tout remettre en cause le choix du début.


## Moyens

### Backend
On utilise la solution *no code* ou *low code* de NocoDB. 

https://nocodb.com/

Cette solution est *open* et très simple à gérer. De plus elle a un superbe interface API REST très efficace. Elle peut soit être utilisée en version *CLOUD* gratuite (sufisant pour ce projet) soit en version *auto hébergée* dans un container Docker.

### Fronted
On utilise la solution d'une petite application *mobile web app* en HTML5 auto hébergée sur un petit serveur WEB en python FLASK au lieu d'une solution *propriétaire* style *Retool*. Cela permet d'être hyper réactif au niveau développement et très simple à maintenir, car c'est du *sur mesure* et cela peut *tourner* sur n'importe quel smartphone !


### Utilisation
*Encore en cours de rédaction, mais de la documentation se trouve déjà dans les codes !*

#### Backend


#### Frontend


#### Sur le smartphone
````
https://192.168.0.138:8443/index.html?token=<token_nocodb>

https://192.168.0.138:8443/?token=<token_nocodb>

https://192.168.0.138:8443/toto.html?token=<token_nocodb>
````


## Sources
https://nocodb.com/

https://lowcode101.com/nocodb-simple-inventory-management-system-with-qr-code-generator/

https://retool.com/

https://www.sitepoint.com/create-qr-code-reader-mobile-website/

https://github.com/mebjas/html5-qrcode

https://axios-http.com/

https://realpython.com/flask-project/




.
