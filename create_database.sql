create database pictorial_server default character set utf8mb4 default collate utf8mb4_general_ci;

create user 'pictorial'@'localhost' identified by 'SDFgajiogr';

grant all on pictorial_server.* to 'pictorial'@'localhost';

flush privileges;