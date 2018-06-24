const SHA256 = require('crypto-js/sha256');
class Block{
	constructor(index,timestamp,data,previousHash=''){
		this.index=index;
		this.timestamp=timestamp;
		this.data=data;
		this.previousHash=previousHash;
		this.hash = this.calculateHash();
	}

	calculateHash(){
		return SHA256(this.index+this.previousHash+this.timestamp+JSON.stringify(this.data)).toString();
	}
}

class Blockchain{
	constructor(){
		this.chain = [this.createGenesisBlock()];
	}

	createGenesisBlock(){
		return new Block(0,"06/24/2018","Genesis block","0")
	}
	getLatestBlock(){
		return this.chain[this.chain.length-1];
	}

	addBlock(newBlock){
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
	}

	isChainValid(){
		for( let i=1; i < this.chain.length;i++){
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i-1];
			if(currentBlock.hash !== currentBlock.calculateHash()){
				return false;
			}

			if(currentBlock.previousHash !== previousBlock.hash){
				return false;
			}
		}

		return true;
	}

}
/* Test Code
let rizCoin= new Blockchain();
rizCoin.addBlock(new Block(1,"06/24/2018","Test block "));
rizCoin.addBlock(new Block(2,"06/24/2018","Test block 2"));

console.log(JSON.stringify(rizCoin,null,4));
console.log(rizCoin.isChainValid());
*/