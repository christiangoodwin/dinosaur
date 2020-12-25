// Create Dino Constructor
    function Base(species, weight, height, diet, fact) {
        this.species = species
        this.height = height
        this.weight = weight
        this.fact = fact
        this.diet = diet
        this.image = "images/" + species.toLowerCase() + ".png";
    }

    function Dino(species, height, weight, diet, fact){
        Base.call(this, species, height, weight, diet, fact)
    }
    Dino.prototype = Object.create(Base.prototype);
    Dino.prototype.constructor = Dino;

    function Human(name, height, weight, diet){
        Base.call(this, name, height, weight, diet)
    }
    Human.prototype = Object.create(Base.prototype);
    Human.prototype.constructor = Human;
 
    // Create Dino Objects
    let dinos = []
    fetch("dino.json")
    .then(response => response.json())
    .then(json => dinos = json.Dinos.map(dino => new Dino(dino.species, dino.weight, dino.height, dino.diet, dino.fact)));



    // Create Human Object
    function Human(name, height, weight, diet){
        this.name = name
        this.height = height
        this.weight = weight
        this.diet = diet
    };
    // Use IIFE to get human data from form
    function getHuman(){
        return (function(){
            this.name = document.getElementById("name").value
            this.feet = document.getElementById("feet").value
            this.inches = document.getElementById("inches").value
            this.weight = document.getElementById("weight").value
            this.diet = document.getElementById("diet").value
            return new Human(name, feet * 12 + parseInt(inches), weight, diet)
        })();
    }
    


    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 
    
    Base.prototype.compareHeight = function(height){
        let humanHeight = parseInt(height);
        let dinoHeight = parseInt(this.weight);
        let i = 0;
        if (dinoHeight > humanHeight){
            while(dinoHeight > humanHeight){
                i++
                humanHeight += humanHeight;
            }
            return `The ${this.species} is approximately ${i} times taller than you.`
        }
        else{
            return this.fact
            }
        }
        
    
    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
    Base.prototype.compareWeight = function(weight){
        let humanWeight = parseInt(weight);
        let dinoWeight = parseInt(this.weight);
        let i = 0;
        if(humanWeight < dinoWeight){
            while(dinoWeight > humanWeight) {
                humanWeight = humanWeight + parseInt(weight);
                i++
        }
            return `The ${this.species} weighed approximately ${i} times your weight.`
    }
        else{
            while(dinoWeight < humanWeight) {
                dinoWeight = dinoWeight + parseInt(weight);
                i++
            }
            return `You weigh a lot more than a ${this.species}...`
        }
}
    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
    Base.prototype.compareDiet = function(diet){
        if(this.diet === diet.toLowerCase()){
            return `You and the ${this.species} are both ${diet}s.`
        }
        else{
            return this.fact
        }
    }


    // Generate Tiles for each Dino in Array
        
        // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic
let form = document.querySelector(".dino-compare");
let grid = document.getElementById("grid");


let button = document.getElementById("btn");

button.addEventListener("click", function(){

    const human = getHuman();

    let counter = 0
    //generate tiles
    for(let index in dinos){
        counter += 1;
        dino = dinos[index];
        let funcArray = [
        dino.compareWeight(human.weight),
        dino.compareHeight(human.height),
        dino.compareDiet(human.diet),
        dino.fact
        ]
        //
        let decider = funcArray[Math.floor(Math.random(funcArray) * 4)];
        //
        
       let tile = document.createElement("div");
       grid.appendChild(tile);
       let dinoName = document.createElement("h3");
       let img = document.createElement("img");
       let fact = document.createElement("p");

       tile.classList.add("grid-item");

       //placing human tile in center:
       if(counter == 4){
           fact.textContent = decider;
           tile.appendChild(fact);
           dinoName.textContent = dino.species;
           tile.appendChild(dinoName);
           img.setAttribute("src", dino.image);
           tile.appendChild(img);

           //human tile
           let humanTile = document.createElement("div");
           grid.appendChild(humanTile);
           let humanImg = document.createElement("img");
           let humanName = document.createElement("h3");
           humanName.textContent = human.name;
           humanImg.setAttribute("src", "images/human.png");
           humanTile.classList.add("grid-item");
           humanTile.appendChild(humanName)
           humanTile.appendChild(humanImg);
           
       } else{
        fact.textContent = decider;
        tile.appendChild(fact);
        dinoName.textContent = dino.species;
        tile.appendChild(dinoName);
        img.setAttribute("src", dino.image);
        tile.appendChild(img);
       }

    }
    //hide UI
    form.style.display = "none";
})