
-- blocks SQL
CREATE TABLE blocks(
    `blockIndex` INT(11) NOT NULL,
    `data` VARCHAR(255) NOT NULL,
    `timestamp` INT(11) NOT NULL,
    `hash` VARCHAR(255) NOT NULL,
    `previousHash` VARCHAR(255) NOT NULL,
    `difficulty` INT(11) NOT NULL,
    `nonce` INT(11) NOT NULL,
    `miner` VARCHAR(255) NOT NULL
);
SELECT * FROM blocks;
DESC blocks;


-- wallet SQL

CREATE TABLE wallet(
    `idx` INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `publicKey` VARCHAR(255) NOT NULL,
    `privateKey` VARCHAR(255) NOT NULL,
    `walletAmount` INT(11) NOT NULL
);

SELECT * FROM wallet;
DESC wallet;


-- tx table

CREATE TABLE tx(
    `txFrom` VARCHAR(255) NOT NULL,
    `txTo` VARCHAR(255) NOT NULL,
    `txAmount` INT(11) NOT NULL,
    `txTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

SELECT * FROM tx;

DESC tx






