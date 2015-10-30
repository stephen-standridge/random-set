var Tree = require('basic-tree')

class randomSet extends Tree {
    constructor( tries=0, spread=false ){
        super();
        this._maxTries = tries;
        this._spread = this.checkSpread( spread );
        this._decisions = this._spread.length;
        this.createPossibilities()    
    }
    checkSpread( spread ){
        if( Array.isArray( spread ) ){
            return spread
        }
        return this.createSpreadExNihlo();
    }
    createSpreadExNihlo(){
        var newSpread = [];
        for( let i = 0; i<this._tries; i++ ){
            newSpread.push(i)
        }
        return newSpread
    }
    createPossibilities(){
        this.width = this._decisions;
        this.root = new Probability( this )
        this.breadthTraversalInitialize( Possibility, this.root, 1 )
        this.root
    }
    determine(){
        let index = this.root.choosePossibility();
        let value = this.toNth( index ).determine();
        this.parent
    }
    get actual(){
        console.log(this.children)
        return this.children.map(function(child){ 
                    return child.value 
                });
    }    
}

class Probability {
    constructor( set ){
        this._tries = set._maxTries;
        this._decisions = set._spread;
        this._value = set._spread;
        this.initialize()
    }
    choosePossibility(){
        let seed = Math.floor(Math.random() * ( this._unactualized.length ));        
        let value = this._unactualized.splice( seed, 1 );
            return value[0];
    }
    initialize(){
        this._unactualized = [];
        for( let i = 0; i< this._decisions.length; i++ ){
            this._unactualized.push( i );
        }
    }
    chooseValue(){
        let seed = Math.floor(Math.random() * ( this._decisions.length ));
        let value = this._decisions.splice( seed, 1 )[0];
        return value
    }
    
}
class Possibility {
    constructor( probability ){
        this.value = false;
        this._probability = probability;
    }
    determine(){
        this.value = this._probability.chooseValue()
        return this.value;
    }
}

module.exports = DeterministicProbability
 