CREATE TABLE IF NOT EXISTS logdata (
    id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    timestamp DATETIME NOT NULL DEFAULT NOW(),
    data LONGTEXT NULL DEFAULT NULL
);