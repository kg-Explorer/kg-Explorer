CREATE TABLE wallet(
    `idx` INT(11) NOT NULL,
    `ip` INT(11) NOT NULL,
    `privatekey` VARCHAR(255) NOT NULL,
    `publickey` INT(11) NOT NULL,
);

DROP TABLE wallet;
SELECT * FROM wallet;
DESC wallet;

USE block;

-- test data

INSERT INTO wallet(blockIndex, data, timestamp) VALUES('0', '1', '0');