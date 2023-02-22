const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

let addresses = [
    "0X5B38DA6A701C568545DCFCB03FCB875F56BEDDC4",
    "0X5A641E5FB72A2FD9137312E7694D42996D689D99",
    "0XDCAB482177A592E424D1C8318A464FC922E8DE40",
    "0X6E21D37E07A6F7E53C7ACE372CEC63D4AE4B6BD0",
    "0X09BAAB19FC77C19898140DADD30C4685C597620B",
    "0XCC4C29997177253376528C05D3DF91CF2D69061A",
    "0xdD870fA1b7C4700F2BD7f44238821C26f7392148",
    "0x2f9C64174Afa42C87da579Cb8DffD3bb1301b6D9",
    "0x9aaB929c32B3CCe2ec0FdBbB21DdD070Fb359fb6",
    "0x15979297a8B1a4e52294c9E21D5423EddB5Da5C4"
];
const leaves = addresses.map(x => keccak256(x))
const tree = new MerkleTree(leaves, keccak256, { sortPairs: true })
const rootHash = tree.getRoot();
const buf2hex = x => '0x' + x.toString('hex')

console.log(buf2hex(tree.getRoot()))
const leaf = keccak256("0x9aaB929c32B3CCe2ec0FdBbB21DdD070Fb359fb6");
const proof = tree.getProof(leaf).map(x => buf2hex(x.data))
console.log(proof)
console.log(tree.verify(proof, leaf, rootHash));