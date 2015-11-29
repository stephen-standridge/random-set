var Tree = require('basic-tree')

class randomSet extends Tree {
    constructor( tries, spread ){
        super();
        this._maxTries = tries || 0;
        this._tried = 0;
        this._initialSpread = spread;
        this.initialize()
    }
    initialize(){
        this._spread = this.checkSpread( this._initialSpread );
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
        if( this._tried == this._maxTries ){
            this.initialize()
            this._tried = 0;
        }        
        let index = this.root.choosePossibility();
        let value = this.toNth( index ).determine();
        this._tried ++
        this.parent
        return value
    }
    determineAll(){
        if( this._tried == this._maxTries ){
            this.initialize()
            this._tried = 0;
        }        
        for( let i = 0; i< this._maxTries; i++ ){
            let index = this.root.choosePossibility();
            let value = this.toNth( index ).determine();
            this._tried ++
            this.parent
        }
        return this.actual                    
    }
    get actual(){
        return this.children.map(function(child){ 
                    return child.value 
                });
    }    
}

class Probability {
    constructor( set ){
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
        // let seed = Math.floor(Math.random() * ( this._decisions.length ));
        let value = this._decisions.splice( 0, 1 )[0];
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
            if(spread.round){
                return this.createRoundedSpread( spread );                
            }
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
            actualVariation = 0,
            adjVariation = (whole * (maxVariation /100) );


        // generate inital (even) spread and initial variations/
        for( let i = 0; i<this._maxTries; i++ ){
            let seed = Number( 
                (Math.random() * (adjVariation + adjVariation)) - adjVariation 
                .toFixed(0));
            actualVariation = Number( (part + seed).toFixed(0) );
            variations.push(actualVariation)
            newSpread.push(part)
        }

        // average out the variation so it's close to the whole number //
        actualVariation = variations.reduce(function(a, b){
            return a + b 
        })
        seed = ((adjVariation - actualVariation)-adjVariation) / this._maxTries;
        newSpread = variations.map(function(variation, index){
            return Math.abs( Number( (newSpread[index] + (variation + seed)).toFixed(0) ) )
        })

        //resolve the variation to whole numbers//
        seed = whole - newSpread.reduce(function(a, b){ return a+b});
        newSpread = newSpread.map(function(num){
            return num + (seed / this._maxTries);
        }, this);
        return newSpread
    }
    createRoundedSpread( spread ){
        let maxVariation = spread.variation,
            round = spread.round,         
            excess = spread.total % round,
            whole = spread.total - excess,
            part = this.roundNumTo(spread.total / this._maxTries, round),
            newSpread = [],
            seed = 0,
            actualVariation = 0,
            adjVariation = (whole * (maxVariation /100) ), count;

        // generate inital (even) spread and initial variations/
        for( let i = 0; i<this._maxTries; i++ ){
            let seed = this.roundNumTo( Number( 
                (Math.random() * (adjVariation + adjVariation)) - adjVariation 
                .toFixed(0)), round);
            let variation = Number( (part + seed).toFixed(0) );
            actualVariation += variation;
            newSpread.push(variation)
        }

        seed = whole - actualVariation + excess;
        let absSeed = Math.abs(seed);
   
        do{         
            for(let i = 0; i< newSpread.length; i++ ){
                if(absSeed == 0){
                    break;
                }   
                let dist = Math.min( Math.max(seed, -Math.abs(round)), Math.abs(round))
                if( dist !== 0 ){
                    if(newSpread[i] + dist > 0){
                        newSpread[i] = newSpread[i] + dist;
                    }else{
                        newSpread[i] = 0;
                    }
                }
                absSeed -= Math.abs( dist );
            }
        }while( absSeed > 0 )
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
    roundNumTo(num, to) {
        var resto = num%to;
        if (resto <= (to/2)) { 
            return num-resto;
        } else {
            return num+to-resto;
        }
    }    
}
module.exports.randomSet = randomSet
module.exports.ratio = variedRatio
