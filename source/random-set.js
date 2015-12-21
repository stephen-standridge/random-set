import {Map, List} from 'immutable';
import Tree from 'basic-tree';

class randomSet extends Tree {
  constructor(args={}){
    if(!args.attempts && !args.set && !args.total ){
      throw new Error('no construction data provided')
    }
    let setSize = args.set && args.set.constructor == Array ? args.set.length : false;
    let max = setSize ? setSize : args.attempts;
    super({ config: {branches: max, depth: 1} });
    this._max = max;
    this._spread = Map()
    this._spread = this.setDefaults( this._spread, args )
    this._spread = this.makeChoices( this._spread )
  }
  get attempted(){
    return this._spread.get('chosen').size
  }
  get attempts(){
    return this._spread.get('attempts')
  }
  get max(){
    return this._max
  }
  get chosen(){
    return this._spread.get('chosen')
  }
  setDefaults( spread, args  ){
    spread = spread.set('attempts', args.attempts)
    spread = spread.set('originals', List(args.set) )
    return spread;    
  }
  makeChoices( spread ){
    let originals = this.makeListFrom( spread );
    this.root = List();
    this.children = originals;

    spread = spread.set('possibilities', this.createListExNihlo( this.max ))
    spread = this.reflect( spread )
    return spread
  }
  reflect( spread ){
    spread = spread.set( 'chosen', this.root );
    spread = spread.set( 'choices', this.childrenList ) 
    return spread  
  }
  makeListFrom( spread ){
    if( spread.get('originals').size ){
        return spread.get('originals')
    }
    return this.createListExNihlo( spread.get('attempts') );
  }
  createListExNihlo( length ){
    var newSpread = List();
    for( let i = 0; i< length ; i++ ){
        newSpread = newSpread.push(i)
    }
    return newSpread
  }
  determine(){
    let seed = Math.floor(Math.random() * this._spread.get('possibilities').size ), val;
    if( this.attempted == this.attempts ){
      this._spread = this.makeChoices(this._spread)
    } 
    val = this.to( this._spread.getIn(['possibilities', seed]) )
    this._spread = this.reflect( this._spread )
    return val
  }
  removePossibility(spread, index){
    spread = spread.update('possibilities', (item)=>{
      return item.filterNot((i)=>{
        return i === index
      })
    })
    return spread;
  }
  toRoot( value ){
    let chosen = this.root;
    chosen = chosen.push(value);
    this.root = chosen
    return this.root
  }
  to( index ){
    this.toNth( index );
    let value = this.node;
    this._spread = this.removePossibility(this._spread, index)
    this.node = false;
    this.toRoot(value);
    return value
  }
  determineAll(){
    if( this.attempted + this.attempts > this.attempts ){
      this._spread = this.makeChoices(this._spread)
    }        
    for( let i = 0; i< this.attempts; i++ ){
      this.determine();
    }
    return this.root.toJS()                   
  } 
}
class variedRatio extends randomSet{
  setDefaults( spread, args ){
    spread = spread.merge({
      'attempts': args.attempts,
      'total': args.total,
      'variation': args.variation || false,
      'roundTo': args.round || false
    })
    let type = spread.get('variation') ? 'varied' : 'uniform';
    spread = spread.set('type', type)
    return spread;    
  }  
  makeListFrom( spread ){
    switch(spread.get('type')){
      case 'varied':
        spread = this.createRoundedList( spread ); 
        break      
      case 'uniform':
        spread = this.createUniformList( spread );
        break    
    }
    return spread
  }
  createRoundedList( spread ){
    let maxVariation = spread.get('variation'),
        round = spread.get('roundTo') || 15,         
        excess = spread.get('total') % round,
        whole = spread.get('total') - excess,
        part = this.roundNumTo(spread.get('total') / this.attempts, round),
        newSpread = List(),
        seed = 0,
        actualVariation = 0,
        adjVariation = (whole * (maxVariation /100) ), count;
    // generate inital (even) spread and initial variations/
    for( let i = 0; i<this.attempts; i++ ){
        let seed = this.roundNumTo( Number( 
            (Math.random() * (adjVariation + adjVariation)) - adjVariation 
            .toFixed(0)), round);
        let variation = Number( (part + seed).toFixed(0) );
        actualVariation += variation;
        newSpread = newSpread.push(variation)
    }
    seed = whole - actualVariation + excess;
    let absSeed = Math.abs(seed);

    do{ 
      let dist = Math.min( Math.max(seed, -Math.abs(round)), Math.abs(round));
      newSpread = newSpread.map((item, index)=>{
        if(absSeed == 0){
          return item 
        }   
        if( dist !== 0 ){
          if(item + dist > 0){
            absSeed -= Math.abs( dist );            
            return item + dist;
          }else{
            return 0;
          }
        }
      })
    }while( absSeed > 0 )
    return newSpread
  }    
  createUniformList( spread ){
    let part = spread.get('total') / this.attempts,
        newSpread = List();
    for( let i = 0; i< this.attempts; i++ ){
      newSpread = newSpread.push(part)
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
  createSpreadExNihlo( ){
    let part = 100 / this.attempts,
        newSpread = [],
        difference = 0;
    for( let i = 0; i< this.attempts; i++ ){
        newSpread.push( Number( part.toFixed(0) ) )
    }
    difference = 100 - newSpread.reduce(function(a,b){return a+b})
    for(let i = 0; i< difference; i++ ){
        newSpread[i] = newSpread[i] - 1;
    }
    return newSpread
  } 
}

export const set = randomSet
export const ratio = variedRatio
