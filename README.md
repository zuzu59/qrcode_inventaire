# qrcode_inventaire
Juste une petite appli pour lire un qrcode avec son smartphone et aller chercher l'information dans une DB Nocodb via API REST

zf240424.1417, zf240504.1546

**Documentation en cours de rédaction et sujette encore à pas mal de corrections et d'amélioration !**

## Buts
Lire le qrcode collé sur un objet avec son smartphone et afficher les informations d'une DB Nocodb via API REST à son sujet.

Cela permet de pouvoir contrôler directement sur le terrain la *situation* de l'objet *scanné*.


## Problématiques
Vu que l'on se trouve sur le terrain et non dans un bureau, il faut que le système soit le plus simple possible. C'est pourquoi on utilise une application *mobile WEB* sur un smartphone, car l'interface NocoDB n'a pas de lecteur de qrcode !

Il faut aussi que tout soit très *standardisé*, *ouvert* et *simple* au niveau gestion. Aussi bien au niveau de la BD (*backend* API REST) que le système sur le smartphone (*frontend* *mobile web app*), afin que l'on puisse faire évoluer la solution au cours du temps sans devoir tout remettre en cause le choix du début.


## Moyens
### Backend
On utilise la solution *no code* ou *low code* de NocoDB. 

https://nocodb.com/

Cette solution est *open* et très simple à gérer. De plus elle a un superbe interface API REST très efficace. Elle peut soit être utilisée en version *CLOUD* gratuite (sufisant pour ce projet) soit en version *auto hébergée* dans un container Docker.


### Fronted
On utilise la solution d'une petite application *mobile web app* en HTML5 auto hébergée sur un petit serveur WEB en python FLASK au lieu d'une solution *propriétaire* style *Retool*. Cela permet d'être hyper réactif au niveau développement et très simple à maintenir, car c'est du *sur mesure* et cela peut *tourner* sur n'importe quel smartphone !


## Installation
### Installation (configuration) du serveur du backend
Afin d'être le plus simple possible et dynamique sans devoir à chaque fois modifier le code sur le frontend, on va créer une *view* sur NocoDB avec le **premier** champ **Index**, c'est dans ce champ qu'il y aura le numéro du qrcode scanné.
Après, on mets tous les champs que l'on désire avoir affichés sur l'écran du smartphone.

Après on fait sur NocoDB toujours, un *search* avec un des numéros du champ Index afin d'avoir une requête API NocoDB déjà toute faite.

Puis, sur la view que l'on vient de créer, on va dans l'onglet *Details* puis *API* pour voir  la requête CURL du style:

````
curl --request GET \
  --url 'https://<serveur NocoDB>/api/v2/tables/m8mwhjo08d8tm72/records?offset=0&limit=25&where=(Index%2Ceq%2C<l'index de l'objet cherché>)&viewId=vwze386pg0uaq45k' \
  --header 'xc-auth: <le token provisoire>'
````

C'est ce bout d'url:

````
api/v2/tables/m8mwhjo08d8tm72/records?offset=0&limit=25&where=(Index%2Ceq%2C<numéro (Index) de l'objet cherché>)&viewId=vwze386pg0uaq45k
````

 qu'il faudra copier dans le code app.js

````
const apiUrl = 'https://' + server + '/' + 'api/v2/tables/m8mwhjo08d8tm72/records?viewId=vwze386pg0uaq45k&where=%28Index%2Ceq%2Cxxxx%29&limit=25&shuffle=0&offset=0';
````

et remplacer le numéro Index par 'xxxx' dans le code.

Ainsi, si on ajoute ou enlève des champs à la view, automatiquement le résultat sera affiché sur l'écran du smartphone quand on scanne un qrcode.



### Installation du serveur du fronted
Faire le git clone du projet, puis installer les libs python et créer le certificat ssl pour le petit serveur WEB du projet, comme indiqué dans le code server.py


## Utilisation
On lance le serveur WEB avec la commande:

````
./start.sh
````

Enfin on y accède par une URL de ce type:

````
https://<adrs ip de ce serveur>:8443/?server=<adrs ip du serveur NocoDB>&token=<token xcToken>
````

Il suffit alors de scanner le qrcode avec l'appareil photo de son smartphone et les infos de l'objet qui a l'index égale au qrcode scanné est affiché sur l'écran du smartphone.

**ATTENTION**, le **token** est le token **xcToken** et non le token **xcAuth** que l'on doit créer dans l'onglet à gauche *Team&Settings* / *API Token* sur NocoDB !


## Sources
https://nocodb.com/

https://lowcode101.com/nocodb-simple-inventory-management-system-with-qr-code-generator/

https://retool.com/

https://www.sitepoint.com/create-qr-code-reader-mobile-website/

https://github.com/mebjas/html5-qrcode

https://axios-http.com/

https://realpython.com/flask-project/




.
