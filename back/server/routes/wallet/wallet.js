const ecdsa = require('elliptic');
const ec = new ecdsa.ec('secp256k1'); 

const createPrivateKey = () => {
    const keyPair = ec.genKeyPair();
    const privateKey = keyPair.getPrivate().toString(16);

    return privateKey;
}

const createPublicKey = () => {
    const privateKey = createPrivateKey();
    const publicKey = ec.keyFromPrivate(privateKey, 'hex').getPublic().encode('hex');
    return {privateKey, publicKey};
}

module.exports = { createPublicKey };