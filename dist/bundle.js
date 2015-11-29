/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Tree = __webpack_require__(2);

	var randomSet = (function (_Tree) {
	    _inherits(randomSet, _Tree);

	    function randomSet(tries, spread) {
	        _classCallCheck(this, randomSet);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(randomSet).call(this));

	        _this._maxTries = tries || 0;
	        _this._tried = 0;
	        _this._initialSpread = spread;
	        _this.initialize();
	        return _this;
	    }

	    _createClass(randomSet, [{
	        key: 'initialize',
	        value: function initialize() {
	            this._spread = this.checkSpread(this._initialSpread);
	            this._decisions = this._spread.length;
	            this.createPossibilities();
	        }
	    }, {
	        key: 'checkSpread',
	        value: function checkSpread(spread) {
	            spread = spread || false;
	            if (Array.isArray(spread)) {
	                return spread;
	            }
	            return this.createSpreadExNihlo();
	        }
	    }, {
	        key: 'createSpreadExNihlo',
	        value: function createSpreadExNihlo() {
	            var newSpread = [];
	            for (var i = 0; i < this._maxTries; i++) {
	                newSpread.push(i);
	            }
	            return newSpread;
	        }
	    }, {
	        key: 'createPossibilities',
	        value: function createPossibilities() {
	            this.width = this._decisions;
	            this.root = new Probability(this);
	            this.breadthTraversalInitialize(Possibility, this.root, 1);
	            this.root;
	        }
	    }, {
	        key: 'determine',
	        value: function determine() {
	            if (this._tried == this._maxTries) {
	                this.initialize();
	                this._tried = 0;
	            }
	            var index = this.root.choosePossibility();
	            var value = this.toNth(index).determine();
	            this._tried++;
	            this.parent;
	            return value;
	        }
	    }, {
	        key: 'determineAll',
	        value: function determineAll() {
	            if (this._tried == this._maxTries) {
	                this.initialize();
	                this._tried = 0;
	            }
	            for (var i = 0; i < this._maxTries; i++) {
	                var index = this.root.choosePossibility();
	                var value = this.toNth(index).determine();
	                this._tried++;
	                this.parent;
	            }
	            return this.actual;
	        }
	    }, {
	        key: 'actual',
	        get: function get() {
	            return this.children.map(function (child) {
	                return child.value;
	            });
	        }
	    }]);

	    return randomSet;
	})(Tree);

	var Probability = (function () {
	    function Probability(set) {
	        _classCallCheck(this, Probability);

	        this._decisions = set._spread;
	        this._value = set._spread;
	        this.initialize();
	    }

	    _createClass(Probability, [{
	        key: 'choosePossibility',
	        value: function choosePossibility() {
	            var seed = Math.floor(Math.random() * this._unactualized.length);
	            var value = this._unactualized.splice(seed, 1);
	            return value[0];
	        }
	    }, {
	        key: 'initialize',
	        value: function initialize() {
	            this._unactualized = [];
	            for (var i = 0; i < this._decisions.length; i++) {
	                this._unactualized.push(i);
	            }
	        }
	    }, {
	        key: 'chooseValue',
	        value: function chooseValue() {
	            // let seed = Math.floor(Math.random() * ( this._decisions.length ));
	            var value = this._decisions.splice(0, 1)[0];
	            return value;
	        }
	    }]);

	    return Probability;
	})();

	var Possibility = (function () {
	    function Possibility(probability) {
	        _classCallCheck(this, Possibility);

	        this.value = false;
	        this._probability = probability;
	    }

	    _createClass(Possibility, [{
	        key: 'determine',
	        value: function determine() {
	            this.value = this._probability.chooseValue();
	            return this.value;
	        }
	    }]);

	    return Possibility;
	})();

	var variedRatio = (function (_randomSet) {
	    _inherits(variedRatio, _randomSet);

	    function variedRatio(parts, spread) {
	        _classCallCheck(this, variedRatio);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(variedRatio).call(this, parts, spread));
	    }

	    _createClass(variedRatio, [{
	        key: 'checkSpread',
	        value: function checkSpread(spread) {
	            spread = spread || {};
	            if (spread.total && !isNaN(Number(spread.total)) && spread.variation) {
	                if (spread.round) {
	                    return this.createRoundedSpread(spread);
	                }
	                return this.createVariedSpread(spread);
	            } else if (!isNaN(Number(spread))) {
	                return this.createUniformSpread(spread);
	            } else {
	                return this.createSpreadExNihlo(spread);
	            }
	        }
	    }, {
	        key: 'createVariedSpread',
	        value: function createVariedSpread(spread) {

	            var maxVariation = spread.variation,
	                whole = spread.total,
	                part = spread.total / this._maxTries,
	                newSpread = [],
	                variations = [],
	                seed = 0,
	                actualVariation = 0,
	                adjVariation = whole * (maxVariation / 100);

	            // generate inital (even) spread and initial variations/
	            for (var i = 0; i < this._maxTries; i++) {
	                var _seed = Number(Math.random() * (adjVariation + adjVariation) - adjVariation.toFixed(0));
	                actualVariation = Number((part + _seed).toFixed(0));
	                variations.push(actualVariation);
	                newSpread.push(part);
	            }

	            // average out the variation so it's close to the whole number //
	            actualVariation = variations.reduce(function (a, b) {
	                return a + b;
	            });
	            seed = (adjVariation - actualVariation - adjVariation) / this._maxTries;
	            newSpread = variations.map(function (variation, index) {
	                return Math.abs(Number((newSpread[index] + (variation + seed)).toFixed(0)));
	            });

	            //resolve the variation to whole numbers//
	            seed = whole - newSpread.reduce(function (a, b) {
	                return a + b;
	            });
	            newSpread = newSpread.map(function (num) {
	                return num + seed / this._maxTries;
	            }, this);
	            return newSpread;
	        }
	    }, {
	        key: 'createRoundedSpread',
	        value: function createRoundedSpread(spread) {
	            var maxVariation = spread.variation,
	                round = spread.round,
	                excess = spread.total % round,
	                whole = spread.total - excess,
	                part = this.roundNumTo(spread.total / this._maxTries, round),
	                newSpread = [],
	                seed = 0,
	                actualVariation = 0,
	                adjVariation = whole * (maxVariation / 100),
	                count = undefined;

	            // generate inital (even) spread and initial variations/
	            for (var i = 0; i < this._maxTries; i++) {
	                var _seed2 = this.roundNumTo(Number(Math.random() * (adjVariation + adjVariation) - adjVariation.toFixed(0)), round);
	                var variation = Number((part + _seed2).toFixed(0));
	                actualVariation += variation;
	                newSpread.push(variation);
	            }

	            seed = whole - actualVariation + excess;
	            var absSeed = Math.abs(seed);

	            do {
	                for (var i = 0; i < newSpread.length; i++) {
	                    if (absSeed == 0) {
	                        break;
	                    }
	                    var dist = Math.min(Math.max(seed, -Math.abs(round)), Math.abs(round));
	                    if (dist !== 0) {
	                        if (newSpread[i] + dist > 0) {
	                            newSpread[i] = newSpread[i] + dist;
	                        } else {
	                            newSpread[i] = 0;
	                        }
	                    }
	                    absSeed -= Math.abs(dist);
	                }
	            } while (absSeed > 0);
	            return newSpread;
	        }
	    }, {
	        key: 'createUniformSpread',
	        value: function createUniformSpread(num) {
	            var part = num / this._maxTries,
	                newSpread = [];
	            for (var i = 0; i < this._maxTries; i++) {
	                newSpread.push(part);
	            }
	            return newSpread;
	        }
	    }, {
	        key: 'createSpreadExNihlo',
	        value: function createSpreadExNihlo() {
	            var part = 100 / this._maxTries,
	                newSpread = [],
	                difference = 0;
	            for (var i = 0; i < this._maxTries; i++) {
	                newSpread.push(Number(part.toFixed(0)));
	            }
	            difference = 100 - newSpread.reduce(function (a, b) {
	                return a + b;
	            });
	            for (var i = 0; i < difference; i++) {
	                newSpread[i] = newSpread[i] - 1;
	            }
	            return newSpread;
	        }
	    }, {
	        key: 'roundNumTo',
	        value: function roundNumTo(num, to) {
	            var resto = num % to;
	            if (resto <= to / 2) {
	                return num - resto;
	            } else {
	                return num + to - resto;
	            }
	        }
	    }]);

	    return variedRatio;
	})(randomSet);

	module.exports.randomSet = randomSet;
	module.exports.ratio = variedRatio;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	class Tree extends Array {
		constructor(branchCount, depth){
			super()
			this._branchCount = branchCount;
			this._depth = depth;
			this._level = 0;
			this._node = 0;
			this._cache = [];
		}
		set width( arg ){
			this._branchCount = arg;
		}
		get maxNodes(){
			return this.nodesAtIndexed( this._depth + 1 ) / this.adjCount;
		}
		get adjCount(){
			return this._branchCount - 1
		}
		get firstChildNode(){
			return this._node * this._branchCount
		}
		get firstChildIndex(){
			return this.locate( this._level + 1, this.firstChildNode )
		}
		get lastChildNode(){
			return this._node * this._branchCount + this.adjCount;
		}	
		get lastChildIndex(){
			return this.locate( this._level + 1, this.lastChildNode )
		}	
		set node( value ){
			let level=this._level, 
					node=this._node,
					index = this.locate( level, node );
					this.deepen(index + 1)
			this[this.locate( level, node ) ] = value
			// this.trim()
		}	
		get node(){
			let level=this._level, 
					node=this._node,
					index = this.locate( level, node );
			return this[ this.locate( level, node ) ]
		}

		get root(){
			this._level = 0;
			this._node = 0;
			return this.node
		}
		set root( value ){
			this._level = 0;
			this._node = 0;
			this.node = value;
			return this.node
		}
		get parent(){
			this.toParent()
			return this.node
		}
		set parent( arg ){
			this.toParent()
			this.node = arg;
		}
		get children(){
			let children = this.slice( this.firstChildIndex, this.lastChildIndex + 1 );
					return children
		}
		set children( vals ){
			vals.length = this._branchCount;
			this.deepen( this.lastChildIndex + 1 )	
			vals.map(function( item, index ){
				this[this.firstChildIndex+index] = item
			}, this)
			// this.trim()
			return this.children
		}	
		reRoot(){
			while(this._level > 1){
				this.toParent()
			}
			let newTree = this.breadthTraversalGet();
			this.length = 0;
			for(var i = 0; i< newTree.length; i++){
				this.push(newTree[i])
			}
			this.parent
			return
		}
		deepen( index ){
			if(this.length < index ){
				this.length = index;
			}		
		}
		trim(){
			if( this._depth == undefined ){
				return;
			}
			if( this._level > this._depth - 1 ){
				this.reRoot()
			}
		}	
		nodesAt( level ){
			level = level || this._level
			return Math.pow( this._branchCount, level )
		}
		nodesAtIndexed( level ){
			level = level || this._level;
			return this.nodesAt( level ) - 1 
		}	
		rootNodeAt( level ){
			level = level || this._level
			return this.nodesAtIndexed( level ) / this.adjCount
		}
		locate( level, node ){
			return node + this.nodesAtIndexed( level ) / this.adjCount 
		}
		toFirst(){
			this._level ++;
			this._node = this.firstChildNode;
		}	
		toLast(){
			this._level ++;
			this._node = this.lastChildNode; 
		}
		toNth( index ){
			this._level ++
			this._node = this.firstChildNode + index;
			return this.node
		}
		toParent(){
			this._level --;
			this._node = Math.floor( this._node / this._branchCount );
		}
		goTo( node, level ){
			this._level = level || this._level;
			this._node = node || this._node;
			return this.node
		}
		depthTraversalCall( callback ){
			callback( this.node )									
			for( let i = 0; i< this._branchCount; i++ ){
				this.toNth(i)
				if( this.node !== undefined ){
					this.depthTraversalCall(callback)
				}
				this.parent
			}
		}
		depthTraversalSet( value ){
			for( let i = 0; i< this._branchCount; i++ ){
				this.toNth(i)
				if( this.node !== undefined ){
					if( typeof value == 'function'){
						this.node = value()
					} else {
						this.node = value
					}
					this.depthTraversalSet(value)
				}
				this.parent
			}
		}
		depthTraversalGet(){
			let returned = [];
			returned.push(this.node)						
			for( let i = 0; i< this._branchCount; i++ ){
				this.toNth(i)
				if( this.node !== undefined ){
					returned = returned.concat( this.depthTraversalGet() )
				}
				this.parent
			}
			return returned;
		}	
		breadthTraversalCall( callback, level ){
			level = level || this._level;
			for( let i = 0, j = this.nodesAt(); i< j; i++ ){
				this.toNth( i )
				callback( this.node );
			}
			if( this.length > this.lastChildIndex + 1 ){
				this._level ++;
				this.breadthTraversal();
			}
		}
		breadthTraversalSet( value, level ){
			this._level = level || this._level
			for( let i = 0, j = this.nodesAt(); i< j; i++ ){
				this.goTo( i, this._level )
					if( typeof value == 'function'){
						this.node = value()
					} else {
						this.node = value
					}
			}
		}	
		breadthTraversalGet(){
			let returned = [], queue = [];
			queue.push({ n: this._node, l: this._level})
			while( queue.length > 0 ){
				let address = queue.shift()
				this.goTo(address.n, address.l)
				for( let j = 0; j< this._branchCount; j++ ){
					this.toNth(j)
					if(this.node !== undefined ){
						queue.push({n: this._node, l: this._level})
					}
					this.parent
				}
				returned.push(this.node)
			}
			return returned
		}
		breadthTraversalInitialize( func, val, level ){
			this._level = level || this._level
			for( let i = 0, j = this.nodesAt(); i< j; i++ ){
				this.goTo( i, this._level )
					this.node = new func( val )
			}
		}	


	}
	module.exports = Tree

/***/ }
/******/ ]);