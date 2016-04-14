 /*========================================================= Shanlinbao数据库*/

/*================================= 建立表空间及对应dba*/
 -- create user
 GRANT USAGE ON *.* TO 'luolai151205'@'localhost' IDENTIFIED BY 'luolai151205' WITH GRANT OPTION;
 -- create database
 CREATE DATABASE luolai151205 CHARACTER SET  utf8  COLLATE utf8_general_ci;
 -- grant user 权限1,权限2,select,insert,update,delete,create,drop,index,alter,grant,references,reload,shutdown,process,file等14个权限
 GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,DROP,LOCK TABLES ON luolai151205.*  TO 'luolai151205'@'localhost' IDENTIFIED BY 'luolai151205';

 /*================================= 建立表、表主外键、多表关联等T-SQL*/
 -- 改变当前数据库
 USE luolai151205;

/*
用户表
*/
create table user (
id INT NOT NULL auto_increment COMMENT 'ID标识',
player1openid VARCHAR(256) NOT NULL COMMENT '人物1微信用户标示',
player1headimgurl VARCHAR(256) NOT NULL COMMENT '人物1微信用户头像',
player1nickname VARCHAR(256) NOT NULL COMMENT '人物1微信用户昵称',
player1sex VARCHAR(4) NOT NULL COMMENT '人物1选择性别',
player1props VARCHAR(3) COMMENT '人物1选择道具',
player1isready INT COMMENT '人物1是否已准备完毕',
player1shaketime INT COMMENT '人物1摇一摇次数',
player1adate varchar(19) COMMENT '人物1注册时间',
player2openid VARCHAR(256) COMMENT '人物2微信用户标示',
player2headimgurl VARCHAR(256) COMMENT '人物2微信用户头像',
player2nickname VARCHAR(256) COMMENT '人物2微信用户昵称',
player2bed VARCHAR(3) COMMENT '人物2选择床品',
player2isready INT COMMENT '人物2是否已准备完毕',
player2shaketime INT COMMENT '人物2摇一摇次数',
player2adate varchar(19) COMMENT '人物2注册时间',
score INT COMMENT '互动时长(秒)',
primary key (id) -- 主键
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*
用户表复合主键索引
*/
create index idx_user on user
(
   player1openid,
   player2openid,
   score
);


/*
行为记录表
*/
create table tracking (
id INT(19) NOT NULL auto_increment COMMENT 'ID标识',
ip VARCHAR(128) NOT NULL COMMENT 'IP地址',
platform VARCHAR(8) NOT NULL COMMENT '访问平台类型',
type VARCHAR(128) NOT NULL COMMENT '行为类型(Share to TimeLine, Go Web Button)',
url VARCHAR(256) NOT NULL COMMENT '页面URL',
odate varchar(16) NOT NULL COMMENT '行为操作时间',
primary key (id) -- 主键
) ENGINE=InnoDB DEFAULT CHARSET=utf8;