
-- blocks SQL
DROP TABLE blocks;


CREATE TABLE blocks(
    `blockIndex` INT(11) NOT NULL,
    `data` VARCHAR(255) NOT NULL,
    `timestamp` INT(11) NOT NULL,
    `hash` VARCHAR(255) NOT NULL,
    `previousHash` VARCHAR(255) NOT NULL,
    `difficulty` INT(11) NOT NULL,
    `nonce` INT(11) NOT NULL
);
SELECT * FROM blocks;
DESC blocks;
USE blockchain;


INSERT INTO blocks(blockIndex, data, timestamp, hash, previousHash, difficulty, nonce) VALUES('0', "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks", '1652259600', 'e8a80e694c0e1e18fc170a00acb10dad2e2fa7e992e7085980e5609c313bfa45', '0', '1', '0');




-- wallet SQL
DROP TABLE wallet;

CREATE TABLE wallet(
    `idx` INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `publicKey` VARCHAR(255) NOT NULL,
    `privateKey` VARCHAR(255) NOT NULL
);

SELECT * FROM wallet;
DESC wallet;




