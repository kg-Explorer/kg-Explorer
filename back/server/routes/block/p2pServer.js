import WebSocket from 'ws';
import { WebSocketServer } from 'ws';
import { getBlocks, getLatestBlock, addBlock, replaceBlockchain } from './block.js';

const MessageType = {
    QUERY_LATEST : 0,
    QUERY_ALL : 1,
    RESPONSE_BLOCKCHAIN : 2,
}

const sockets = []; 
const getPeers = () => {
    return sockets;
}

const initP2PServer = (p2pPort) => {
    const server = new WebSocketServer({port:p2pPort});
    server.on('connection', (ws, request) => {
        console.log("req " + request.headers);
        initConnection(ws);
    }) 
    console.log('listening P2PServer Port : ', p2pPort);
}

const initConnection = (ws) => {
    sockets.push(ws);
    initMessgaeHandler(ws);
    write(ws, queryAllMessage());
}

const connectionToPeer = (newPeer) => {
    const ws = new WebSocket(newPeer);
    ws.on('open', () => { 
        initConnection(ws); 
        console.log('Connect peer : ', newPeer); 
        return true; 
    })
    ws.on('error', () => { 
        console.log('Fail to Connection peer : ', ws.remoteAddres); 
        return false; 
    })
}

const initMessgaeHandler = (ws) => {
    ws.on('message', (data) => {
        const message = JSON.parse(data);
        switch(message.type) {
            case MessageType.QUERY_LATEST:          
                ws.send(JSON.stringify(responseLatestMessage()))
                break;
            case MessageType.QUERY_ALL:             
                write(ws, responseAllMessage());
                break;
            case MessageType.RESPONSE_BLOCKCHAIN:    
                console.log(ws._socket.remoteAddress, ' : ', message.data);
                handleBlockchainResponse(message.data);
                break;
        }
    })
}

const handleBlockchainResponse = (receiveBlockchain) => {
    receiveBlockchain = JSON.parse(receiveBlockchain);
    const latestNewBlock = receiveBlockchain[receiveBlockchain.length - 1];
    const latestMyBlock = getLatestBlock();
    console.log("상대꺼 ", latestNewBlock);
    console.log("내꺼 ",latestMyBlock);

    if(latestNewBlock.index > latestMyBlock.index) {
        if(latestNewBlock.previousHash === latestMyBlock.hash) {
            if(addBlock(latestNewBlock, latestMyBlock)) {
                console.log("누군가 채굴했나보네?");
                broadcasting(responseLatestMessage());
            }
        }
        else if (receiveBlockchain.length === 1) {
            console.log("전체 원장 좀 줘볼래?");
            broadcasting(queryAllMessage());
        }
        replaceBlockchain(receiveBlockchain);
    } else {
        console.log("내 원장 최신화 끝!!!")
    }
}

const queryLatestMessage = () => { 
    return ({ 
        "type" : MessageType.QUERY_LATEST,
        "data" : null
    })
}

const queryAllMessage = () => { 
    return ({ 
        "type" : MessageType.QUERY_ALL,
        "data" : null
    })
}

const responseLatestMessage = () => { 
    return ({ 
        "type" : MessageType.RESPONSE_BLOCKCHAIN,
        "data" : JSON.stringify([getLatestBlock()]) 
    })
}

const responseAllMessage = () => { 
    return ({ 
        "type" : MessageType.RESPONSE_BLOCKCHAIN,
        "data" : JSON.stringify(getBlocks())
    })
}

const write = (ws, message) => {
    console.log(message);
    ws.send(JSON.stringify(message)); 
}

const broadcasting = (message) => {
    sockets.forEach((socket) => {
        write(socket, message);
    })
}


export { initP2PServer, connectionToPeer, getPeers, broadcasting }