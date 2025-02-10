//EX 1

function findArtistIndex(artists, name) {
    for (let i = 0; i < artists.length; i++) {
      if (artists[i].name === name) {
        return artists[i].id;
      }
    }
    return -1;
}

function findArtistIndexUpgrade(artists, name) {
    const artistMap = new Map();
    for (let artist of artists) {
        artistMap.set(artist.name, artist.id);
    }
    return artistMap.get(name) || -1;
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

function assignStagesUpgrade(artists, stages) {
    const artistMap = new Map();
    for (let artist of artists) {
        artistMap.set(artist.name, artist.id);
    }
    const genresMap = new Map()
    for (let stage of stages) {
        stage.genres.forEach(genre => {
            genresMap.set(genre, stage.name);
        });
    }

    for (let artist of artists) {
        if (genresMap.has(artist.genre)) {
            artist.stage = genresMap.get(artist.genre);
        }
    }
}


//EX 2 (contient aussi les résultats des fonctions de l'ex 1)

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

function containsDuplicateUpgrade(array) {
    const seen = new Set();
    for (let i = 0; i < array.length; i++) {
      if (seen.has(array[i])) {
        return true;
      }
      seen.add(array[i]);
    }
    return false;
}

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

function findCommonElementsUpgrade(array1, array2) {
    let commonElements = [];
    const seen = new Set();
    for (let i = 0; i < array1.length; i++) {
      seen.add(array1[i]);
    }
    for (let i = 0; i < array2.length; i++) {
      if (seen.has(array2[i]))
       commonElements.push(array2)
    }
    return commonElements;
}

function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

const cache = new Map();

function fibonacciMemo(n) {
  if (n <= 1) return n;
  if (cache.has(n)) return cache.get(n);
  const result = fibonacci(n - 1) + fibonacci(n - 2);
  cache.set(n, result);
  return result;
}

class timeComplexityTest {

    constructor()
    {
        this.testsSuites = new Map(); //<string nameSuite,Map<string funcName, Array<int time>>> 
    }

    addFunctionTime(testSuite, funcName, time)
    {
        if (!this.testsSuites.has(testSuite)) {
            this.testsSuites.set(testSuite, new Map());
        }
        if (!this.testsSuites.get(testSuite).has(funcName)) {
            this.testsSuites.get(testSuite).set(funcName, []);
        }
        this.testsSuites.get(testSuite).get(funcName).push(time);
    }

    getFunctionTimes(testSuite, funcName)
    {
        if (this.testsSuites.has(testSuite) && this.testsSuites.get(testSuite).has(funcName)) {
            return this.testsSuites.get(testSuite).get(funcName);
        }
        return [];
    }

    getMoyFunctionTimes(testSuite, funcName)
    {
        const times = this.getFunctionTimes(testSuite, funcName);
        if (times.length === 0) return 0;
        const sum = times.reduce((acc, time) => acc + time, 0);
        return sum / times.length;
    }


    clearFunctionTimes(testSuite, funcName)
    {
        if (this.testsSuites.has(testSuite)) {
            this.testsSuites.get(testSuite).set(funcName, []);
        }
    }
    
    testTimeFunc(nameSuite, func, ...args)
    {
        if (!this.testsSuites.has(nameSuite)) {
            this.testsSuites.set(nameSuite, new Map());
        }
        if (!this.testsSuites.get(nameSuite).has(func.name)) {
            this.testsSuites.get(nameSuite).set(func.name, []);
        }

        let start = performance.now();
        let r = func(...args);
        let end = performance.now();
    
        this.testsSuites.get(nameSuite).get(func.name).push(end-start);
    }

    runTests(nameSuite, func, nbIterations,  ...args)
    {
        for (let i = 0; i < nbIterations; ++i)
        {
            this.testTimeFunc(nameSuite, func, ...args);
        }
        return this.getMoyFunctionTimes(nameSuite, func.name);
    }

}

const timeComplexityTestInstance = new timeComplexityTest();

const testArray = Array.from({ length: 100 }, () => Math.floor(Math.random() * 100));
const testArray2 = Array.from({ length: 100 }, () => Math.floor(Math.random() * 100));
let result;

console.log("Test complexité duplication")

result = timeComplexityTestInstance.runTests("Duplication", containsDuplicate, 1000, testArray)
console.log("v1: " + result + "ms")
result = timeComplexityTestInstance.runTests("Duplication", containsDuplicateUpgrade, 1000, testArray)
console.log("v2: " + result + "ms")


console.log("Test complexité éléments communs")

result = timeComplexityTestInstance.runTests("CommonElements", findCommonElements, 1000, testArray, testArray2)
console.log("v1: " + result + "ms")
result = timeComplexityTestInstance.runTests("CommonElements", findCommonElementsUpgrade, 1000, testArray, testArray2)
console.log("v2: " + result + "ms")

console.log("Test complexité Fibonacci")

result = timeComplexityTestInstance.runTests("Fibonacci", fibonacci, 1000, 20)
console.log("v1: " + result + "ms")
result = timeComplexityTestInstance.runTests("Fibonacci", fibonacciMemo, 1000, 20)
console.log("v2: " + result + "ms")

console.log("Test complexité findArtistIndex")

const artists = [
    { id: 1, name: "Artist1", genre: "Rock" },
    { id: 2, name: "Artist2", genre: "Pop" },
    { id: 3, name: "Artist3", genre: "Jazz" }
];

result = timeComplexityTestInstance.runTests("FindArtistIndex", findArtistIndex, 1000, artists, "Artist2")
console.log("v1: " + result + "ms")
result = timeComplexityTestInstance.runTests("FindArtistIndex", findArtistIndexUpgrade, 1000, artists, "Artist2")
console.log("v2: " + result + "ms")

console.log("Test complexité assignStages")

const stages = [
    { id: 1, name: "MainStage", genres: ["Rock"] },
    { id: 2, name: "PopStage", genres: ["Pop", "Jazz"] }
];

result = timeComplexityTestInstance.runTests("AssignStages", assignStages, 1000, artists, stages)
console.log("v1: " + result + "ms")
result = timeComplexityTestInstance.runTests("AssignStages", assignStagesUpgrade, 1000, artists, stages)
console.log("v2: " + result + "ms")

//Les tests concluent que les deux versions que j'ai proposé ne sont pas plus optimisées.
//Elles devraient bénéficier de la mémoisation pour mieux marcher, sinon ce que j'ai fais ne sert à rien.