const ecdsa = require('elliptic');
const pool = require('../../db.js')

const ec = new ecdsa.ec('secp256k1'); 

const createPrivateKey = () => {
    const keyPair = ec.genKeyPair();
    const privateKey = keyPair.getPrivate();

    return privateKey.toString(16);
}

const initWallet = () => {
    if(fs.existsSync(privateKeyFile)) {
        console.log("지갑에 비밀키가 이미 만들어져 있음")
        return;
    }

    if(!fs.existsSync('wallet/'))   fs.mkdirSync('wallet/');
    if(!fs.existsSync(privateKeyLocation))   fs.mkdirSync(privateKeyLocation);

    const privatekey = createPrivateKey();
    fs.writeFileSync(privateKeyFile, privatekey);
}

const getPrivateKeyFromWallet = () => {
    const buffer = fs.readFileSync(privateKeyFile, 'utf-8');
    return buffer.toString();
}

const getPublicKeyFromWallet = () => {
    const privateKey = getPrivateKeyFromWallet();
    const publicKey = ec.keyFromPrivate(privateKey, 'hex');
    return publicKey.getPublic().encode('hex');
}

export { initWallet, getPublicKeyFromWallet, getPrivateKeyFromWallet };