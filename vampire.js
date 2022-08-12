const common = require("mocha/lib/interfaces/common");

class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    //need something to swap this with creator
    //somehow need to get creators creator if there is one
    let currentVampire = this;
    let numberOfVampires = 0;

    while(currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires ++;
    }
    return numberOfVampires
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal ? true : false;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let currentVampire = this;
    let otherVampire = vampire;
    let currentVampireFromAncestor = currentVampire.numberOfVampiresFromOriginal;
    let otherVampireFromAncestor = otherVampire.numberOfVampiresFromOriginal;

    //console.log(currentVampire)

   if(currentVampire.name === 'root') {
    return currentVampire;
   }
   if(otherVampire.name === 'root') {
    return otherVampire;
   }

    //so loop through the ammount of ancestors we need for this vampire for each one loop through the ammount needed for other vampire 


    for(let i = 0; i < currentVampireFromAncestor; i++) {
      if(currentVampire.creator.name === otherVampire.creator.name) {
        return currentVampire.creator;
      }
      
     
      currentVampire = currentVampire.creator;
      otherVampire = otherVampire.creator;
    }

    for(let j = 0; j < otherVampireFromAncestor; j++) {
      //check if current

      if(currentVampire.creator.name === otherVampire.creator.name) {
        return currentVampire.creator;
      }
      
      
      currentVampire = currentVampire.creator;
      otherVampire = otherVampire.creator;
    }
  }
}

module.exports = Vampire;

