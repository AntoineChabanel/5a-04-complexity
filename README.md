# Rendu
Antoine CHABANEL groupe B1

# Examen - Complexité Algorithmique

- Cette partie de l'examen est à rendre sous forme de repository git. Peu importe la plateforme utilisée mais pensez bien à mettre votre repo en public.
- Mettez votre nom, prénom et groupe dans le README.
- Puis envoyez moi le lien sur Discord avec votre nom, prénom et groupe.

## Optimisation d’Algorithmes dans un Cas Concret

Générez la data nécessaire pour tester les algorithmes suivants et écrivez les optimisations que vous avez imaginées.

### Recherche d’un Artiste

L’algorithme suivant permet de retrouver un artiste dans une liste triée alphabétiquement.

```js
interface Artist {
  id: string;
  name: string;
}

function findArtistIndex(artists, name) {
  for (let i = 0; i < artists.length; i++) {
    if (artists[i].name === name) {
      return artists[i].id;
    }
  }
  return -1;
}
```

### Attribution des Scènes aux Artistes

Chaque artiste doit être assigné à une scène en fonction de son genre musical. Le code suivant attribue les artistes un par un en comparant chaque genre à une liste prédéfinie de scènes possibles.

Précision : un genre de musique n'est présent que sur une scène.

```js
interface Artist {
  id: string;
  name: string;
  genre: string;
  stage: string;
}

interface Stage {
  id: string;
  name: string;
  genres: Array<string>;
}

function assignStages(artists, stages) {
  for (let stage of stages) {
    for (let artist of artists) {
      if (stage.genres.includes(artist.genre)) {
        artist.stage = stage.id;
        break;
      }
    }
  }
}
```

## Outils de test et rapports

Vous allez réaliser un outil qui vous permettra de comparer différentes versions d'un algorithme.

Cet outils doit permettre de :

- Créer une suite de tests et de la nommer.
- Ajouter plusieurs versions d'un algorithme.
- Configurer le nombre de fois que chaque version de l'algorithme sera exécutée.
- Transmettre les mêmes paramètres à chaque version de l'algorithme.
- Afficher la performance moyenne (en millisecondes) de chaque version de l'algorithme.
- Affiche la version la plus rapide et la plus lente.

Testez votre outils avec les algorithmes suivants :

```js
function containsDuplicate(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] === array[j]) {
        return true;
      }
    }
  }
  return false;
}
```

```js
function findCommonElements(array1, array2) {
  let commonElements = [];
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      if (array1[i] === array2[j]) {
        commonElements.push(array1[i]);
      }
    }
  }
  return commonElements;
}
```

```js
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```
