create database sleep_log_server default character set utf8mb4 default collate utf8mb4_general_ci;

create user 'sleep_logger'@'localhost' identified by 'SDFgajiogr';

grant all on sleep_log_server.* to 'sleep_logger'@'localhost';

flush privileges;