'use strict'
var Tree = require('basic-tree')

// what if tries is larger than spread //
// build deterministic probability // 
class randomSet extends Tree {
    constructor( tries, spread ){
        super();
        this._maxTries = tries || 0;
        this._initialSpread = spread;
        this._spread = this.checkSpread( spread );
        this._decisions = this._spread.length;
        this.createPossibilities()    
    }
    checkSpread( spread ){
        spread = spread || false;
        if( Array.isArray( spread ) ){
            return spread
        }
        return this.createSpreadExNihlo();
    }
    createSpreadExNihlo(){
        var newSpread = [];
        for( let i = 0; i<this._maxTries; i++ ){
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
        return value
    }
    get actual(){
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
class variedRatio extends randomSet{
    constructor( parts, spread ){
        super( parts, spread );
    }
    checkSpread( spread ){
        spread = spread || {};
        if( spread.total && !isNaN( Number(spread.total) ) && spread.variation ){
            return this.createVariedSpread( spread );
        } else if ( !isNaN( Number( spread )) ){
            return this.createUniformSpread( spread );
        } else {
            return this.createSpreadExNihlo( spread );
        }
    }
    createVariedSpread( spread ){


        let maxVariation = spread.variation,
            whole = spread.total,
            part = spread.total / this._maxTries,
            newSpread = [],
            variations = [],
            seed = 0,
            actualVariation = 0;


        // generate inital (even) spread and initial variations/
        for( let i = 0; i<this._maxTries; i++ ){
            let seed = Number( 
                (Math.random() * (maxVariation + maxVariation)) - maxVariation 
                .toFixed(0));
            actualVariation = Number( (part + seed).toFixed(0) );
            variations.push(actualVariation)
            newSpread.push(part)
        }

        // average out the variation so it's close to the whole number //
        actualVariation = variations.reduce(function(a, b){
            return a + b 
        })
        seed = ((maxVariation - actualVariation)-maxVariation) / this._maxTries;
        newSpread = variations.map(function(variation, index){
            return Number( (newSpread[index] + (variation + seed)).toFixed(0) )
        })

        //resolve the variation to whole numbers//
        seed = whole - newSpread.reduce(function(a, b){ return a+b});
        newSpread[0] = newSpread[0] + seed;

        return newSpread
    }
    createUniformSpread( num ){
        let part = num / this._maxTries,
            newSpread = [];
        for( let i = 0; i< this._maxTries; i++ ){
            newSpread.push(part)
        }
        return newSpread
    }
    createSpreadExNihlo( ){
        let part = 100 / this._maxTries,
            newSpread = [],
            difference = 0;
        for( let i = 0; i< this._maxTries; i++ ){
            newSpread.push( Number( part.toFixed(0) ) )
        }
        difference = 100 - newSpread.reduce(function(a,b){return a+b})
        for(let i = 0; i< difference; i++ ){
            newSpread[i] = newSpread[i] - 1;
        }
        return newSpread
    }
}
module.exports.randomSet = randomSet
module.exports.ratio = variedRatio
