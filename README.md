[![testify_demoqa](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/u67ihc&style=for-the-badge&logo=cypress)](https://dashboard.cypress.io/projects/u67ihc/runs)

### Testify_demoqa
Ce Repository héberge un scénario de test E2E automatisé sur la page http://shop.demoqa.com/ à titre de démonstration.

---

**Feature :**
`[E2E_1] As a visitor I want to browse the website in order to buy a product`

**Scenario :**
`[S001] Visitor makes a valid order`
```
    Given A visitor on the homepage
    When He chooses a product
    And Sets product options
    And Adds to cart
    And Proceeds to checkout
    And Confirms order with valid info
    Then He should be able to order product
    And Receives a confirmation email
```

---

### Langage, framework :
Le scénario de test est codé en JAVASCRIPT à l'aide du framework CYPRESS.
Une surcouche programmatique en GHERKIN est utilisée avec CUCUMBER PREPROCESSOR

___

### Pré-requis / Dépendences :

| Dépendance                    	| Version 	|
|-------------------------------	|---------	|
| cypress                       	| `7.1.0` 	|
| cypress-cucumber-preprocessor 	| `4.1.0` 	|
| faker                         	| `5.5.3` 	|

---

### How to :
```
git clone https://github.com/sylvain-viole/testify_demoqa.git
cd testify_demoqa
npm install
```
Puis 
- `npm run cy:open` : pour lancer Cypress 
- `npm run cy:run`: pour lancer un run headless

---

### INTEGRATIONS / ACTIONS
- Un run de test est lancé à chaque `push` sur la branche main.
- Un dashboard de test est disponible à cette adresse : https://dashboard.cypress.io/projects/u67ihc/runs
- Un serveur discord notifie des actions sur le repo : https://discord.gg/7JAFuAzZ

---

### Organisation des fichiers :

![Capture d’écran 2021-04-26 à 11 09 02](https://user-images.githubusercontent.com/71819292/116058164-d7696c80-a67f-11eb-8528-7d42a977eb1f.png)

- `orderProduct.feature` : Description gherkins du scénario
- `[S001]validOrder.js`: Step definitions du scénario
- `pom/`: Contient les locators et méthodes de chaque page visitée
- `Product.js`: Classe de mock du produit manipulé par l'utilisateur (objet hydraté lors de la navigation)
- `User.js` : Classe de mock d'un utilisateur (utilise `faker`)

---

### In scope :
Le comportement et les vérifications effectuées sont les suivantes :
- Naviguer sur l’url http://shop.demoqa.com/
- Choisir n’importe quel article et le sélectionner.
- Choisir une option couleur (Color) et une option taille (Size)
- Cliquer sur le bouton «ADDTO CART»
- Un message de succès doit s’afficher:“article_name” has been added to your cart
- Cliquer ensuite sur le bouton «View cart»
- L’article doit se rajouter dans le panier, et le total de prix doit s’afficher dans le panier en haut.
- Cliquer sur le bouton «Proceed to checkout»
- Un formulaire de payement doit s’afficher
- Remplir tous les champs obligatoires du formulaire à savoir le nom, le prénom, le pays, l’adresse, le numéro de téléphone, l’adresse mail, et cocher la case «I HAVE READ AND AGREE TO THE WEBSITETERMS AND CONDITIONS»
- Cliquer ensuite sur le bouton «PLACE ORDER»
- Un message de succès doit s’afficher avec les détails de la commande d’achat.

**En plus des assertions décrites ci-dessus, le script vérifie systématiquement** :
- la présence et la visiblité des éléments jugés essentiels de chaque page
- l'url de chaque page visitée
- l'état des éléments avant et après interaction
- l'état du CART au fil de la navigation
- le body.result de la requète XHR d'envoi de la commande en fin de parcours
- la réception du mail de confirmation de commande

### Out scope :
- Tous les comportements non-valides sur ce parcours
- Tous les autres parcours
- Les performances

---

### Analyse et limitations :
- Faible déterminisme des locators : Du fait de la structure du code HTML les locators sont basés essentiellement sur des CLASSES ce qui rend le script d'automatisation vulnérable au changement.


- L'utilisation stricte du GHERKIN pour un parcours E2E limite la granularité des étapes de test, et réduit ainsi la lisiblité en cas d'échec.
