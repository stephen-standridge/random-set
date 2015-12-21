import {List, Map, fromJS, is} from 'immutable';
import {expect} from 'chai';
import {set, ratio} from '../dist/bundle';

describe('set', ()=>{
	var test, control;
	describe('new set', ()=>{
		it('should create an object with an array of decisions from a max number', ()=>{
			test = new set({attempts: 3})
			control = fromJS({
	          attempts: 3,
	          chosen: [],
	          possibilities: [ 0, 1, 2 ],          
	          choices: [ 0, 1, 2 ],
	          originals: []
	        })
			expect( is(test._spread, control) ).to.equal(true)
		})		
	})
	it('should create an object with an array of decisions from a max and attempt number', ()=>{
		test = new set({attempts: 3, set: ['test0','test1','test2','test3','test4','test5']})
		control = fromJS({
          attempts: 3,
          possibilities: [ 0, 1, 2, 3, 4, 5],          
          chosen: [],
          originals: ['test0','test1','test2','test3','test4','test5'],
          choices: ['test0','test1','test2','test3','test4','test5']
        });
		expect( is(test._spread, control) ).to.equal(true)
	})	
	it('should be able to be constructed around a tree', ()=>{
		test = new set({attempts: 3, set: [0,1,2,3,4,5]})
		control = fromJS([[],0,1,2,3,4,5]);
		expect( is(test.flatten(), control) ).to.equal(true)
	})
	describe('#to', ()=>{
		it('should be able to determine a possibility at index', ()=>{
			test = new set({attempts: 3, set: ['test0','test1','test2','test3','test4','test5']})
			test.to(0);
			control = fromJS([['test0'],false,'test1','test2','test3','test4','test5']);
			expect( is(test.flatten(), control) ).to.equal(true)
		})
	})	
	describe('#determine', ()=>{
		it('should randomly determine a choice', ()=>{
			test = new set({attempts: 3, set: ['test0','test1','test2','test3','test4','test5']})
			test.determine();
			expect(test.attempted).to.equal(1)
			expect(test._spread.get('chosen').size).to.equal(1)
			expect(test._spread.get('choices').filterNot((i)=>{ return i == false }).size).to.equal(5)
		})
	})		
	describe('#determineAll', ()=>{
		it('should randomly determine all choices', ()=>{
			test = new set({attempts: 3, set: ['test0','test1','test2','test3','test4','test5']})
			test.determineAll();
			expect(test.attempted).to.equal(3)
			expect(test._spread.get('chosen').size).to.equal(3)
			expect(test._spread.get('choices').filterNot((i)=>{ return i == false }).size).to.equal(3)
		})
	})			
})
describe('ratio', ()=>{
	var test, control;
	it('should create an object with an array of decisions from a value', ()=>{
		test = new ratio({attempts: 4, total: 100 })
		control = fromJS({
          attempts: 4,
          chosen: [],
          total: 100,
          roundTo: false,
          variation: false,
          possibilities: [ 0, 1, 2, 3 ],          
          choices: [ 25, 25, 25, 25 ],
          type: 'uniform'
      });
		expect( is(test._spread, control) ).to.equal(true)
	})	
	it('should create a set of rounded, varied choices', ()=>{
		test = new ratio({attempts: 4, total: 300, round: 15, variation: 25 })
		expect(test._spread.get('roundTo')).to.equal(15)
		expect(test._spread.get('variation')).to.equal(25)
		expect(test._spread.get('type')).to.equal('varied')
		expect(test._spread.get('choices').size).to.equal(4)
		expect(test._spread.get('choices').size).to.equal(4)
		expect(test._spread.get('choices').filter((item)=>{return item % 15 === 0}).size).to.equal(4)
		expect(test._spread.get('choices').reduce((a,b)=>{ return a + b})).to.equal(300)
	})		
})