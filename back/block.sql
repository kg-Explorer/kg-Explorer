CREATE TABLE getblock(
    `blockIndex` INT(11) NULL,
    `data` VARCHAR(255) NULL,
    `timestamp` TIMESTAMP default current_timestamp,
    `hash` VARCHAR(255) NULL,
    `previousHash` VARCHAR(255) NULL,
    `difficulty` INT(11) NULL,
    `nonce` INT(11) NULL
);

DROP TABLE getblock;
SELECT * FROM getblock;
DESC getblock;


-- test data

INSERT INTO getblock(blockIndex, data, hash, previousHash, difficulty, nonce) VALUES('1', 'data test', 'hash test', 'previousHash test', '1', '1');


