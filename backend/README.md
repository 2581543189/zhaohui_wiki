[toc]
## 后端系统设计文档



#### 1. 简介
&#160; &#160; &#160; &#160; 为前端端提供数据接口. 

#### 2. 数据库结构设计
##### &#160; &#160; &#160; &#160; 2.1 用户信息表(user)

| 字段名称 | 数据类型   | 说明 | 默认值 |
| :-: | :-: | :-: | :-: |
| id | bigint(128) | 唯一主键 | - |
| _timestamp | timedtamp | 时间戳 | CURRENT_TIMESTAMP |
| name | varchar(128) | 用户名 | Empty String |
| password | varchar(128) | 密码 | Empty String |
| role | int(32) | 角色 <br> 0:管理员 <br>1:普通用户 | 1 |
| avatar | varchar(1024) | 头像图片url | Empty String |

##### &#160; &#160; &#160; &#160; 建表语句

```
CREATE TABLE `user` (
  `id` bigint(128) NOT NULL AUTO_INCREMENT COMMENT '唯一主键',
  `_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '时间戳',
  `name` varchar(128) NOT NULL DEFAULT '' COMMENT '用户名',
  `password` varchar(128) NOT NULL DEFAULT '' COMMENT 'MD5 的密码值',
  `role` int(32) NOT NULL DEFAULT '1' COMMENT '角色 0:管理员,1:用户 ',
  `avatar` varchar(1024) NOT NULL DEFAULT '' COMMENT '头像图片url',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

##### &#160; &#160; &#160; &#160; 2.2 技术分类表(skill)

| 字段名称 | 数据类型   | 说明 | 默认值 |
| :-: | :-: | :-: | :-: |
| id | bigint(128) | 唯一主键 | - |
| _timestamp | timedtamp | 时间戳 | CURRENT_TIMESTAMP |
| first | varchar(128) | 大分类 | 其他 |
| second | varchar(128) | 二级分类 | 其他 |

##### &#160; &#160; &#160; &#160; 建表语句

```
CREATE TABLE `skill` (
  `id` bigint(128) NOT NULL AUTO_INCREMENT COMMENT '唯一主键',
  `_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '时间戳',
  `first` varchar(128) NOT NULL DEFAULT '其他' COMMENT '大分类',
  `second` varchar(128) NOT NULL DEFAULT '其他' COMMENT '二级分类',
  `third` varchar(128) NOT NULL DEFAULT '其他' COMMENT '三级分类',
  PRIMARY KEY (`id`),
  UNIQUE KEY `ix_unique` (`first`,`second`,`third`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8
```

##### &#160; &#160; &#160; &#160; 2.3 文章信息表(article)

| 字段名称 | 数据类型   | 说明 | 默认值 |
| :-: | :-: | :-: | :-: |
| id | bigint(128) | 唯一主键 | - |
| _timestamp | timedtamp | 时间戳 | CURRENT_TIMESTAMP |
| title | varchar(1024) | 文章标题 | Empty String |
| create_date | date | 发表日志 | 1970-01-01 |
| platform | varchar(128) | 发表平台 | 其他 |
| skill | bigint(128) | skill的主键id | 0 |
| url | varchar(1024) | 访问链接 | Empty String |

##### &#160; &#160; &#160; &#160; 建表语句

```
CREATE TABLE `article` (
  `id` bigint(128) NOT NULL AUTO_INCREMENT COMMENT '唯一主键',
  `_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '时间戳',
  `title` varchar(1024) NOT NULL DEFAULT '' COMMENT ' 文章标题',
  `create_date` date NOT NULL DEFAULT '1970-01-01' COMMENT '发表日期',
  `platform` varchar(128) NOT NULL DEFAULT '其他' COMMENT '发表平台',
  `skill` bigint(128) NOT NULL DEFAULT '0' COMMENT 'skill的主键id',
  `url` varchar(1024) NOT NULL DEFAULT '' COMMENT '访问链接',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

##### &#160; &#160; &#160; &#160; 2.4 书籍信息表(book)

| 字段名称 | 数据类型   | 说明 | 默认值 |
| :-: | :-: | :-: | :-: |
| id | bigint(128) | 唯一主键 | - |
| _timestamp | timedtamp | 时间戳 | CURRENT_TIMESTAMP |
| name | varchar(1024) | 书籍名称 | Empty String |
| author | varchar(1024) | 作者名称 | Empty String |
| skill | bigint(128) | skill的主键id | 0 |
| count | int(32) | 总页数 | 1 |
| current | int(32) | 当前阅读页数 | 1 |
| start_date | date | 开始阅读的日期 | 1970-01-01 |
| end_date | date | 阅读完成的日期 | 1970-01-01 |
| score | decimal(3,1) | 豆瓣评分 | 0.0 |
| img | varchar(1024) | 封面图片url | 0.0 |

##### &#160; &#160; &#160; &#160; 建表语句

```
CREATE TABLE `book` (
  `id` bigint(128) NOT NULL AUTO_INCREMENT COMMENT '唯一主键',
  `_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '时间戳',
  `name` varchar(1024) NOT NULL DEFAULT '' COMMENT '书籍名称',
  `author` varchar(1024) NOT NULL DEFAULT '' COMMENT '作者名称',
  `skill` bigint(128) NOT NULL DEFAULT '0' COMMENT 'skill的主键id',
  `count` int(32) NOT NULL DEFAULT '1' COMMENT '总页数',
  `current` int(32) NOT NULL DEFAULT '0' COMMENT '当前阅读页数',
  `start_date` date NOT NULL DEFAULT '1970-01-01' COMMENT '开始阅读日期',
  `end_date` date DEFAULT NULL COMMENT '结束日期',
  `score` decimal(3,1) NOT NULL DEFAULT '0.0' COMMENT '豆瓣评分',
  `img` varchar(1024) NOT NULL DEFAULT '' COMMENT '封面图片url',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

##### &#160; &#160; &#160; &#160; 2.5 读书笔记表(note)

| 字段名称 | 数据类型   | 说明 | 默认值 |
| :-: | :-: | :-: | :-: |
| id | bigint(128) | 唯一主键 | - |
| _timestamp | timedtamp | 时间戳 | CURRENT_TIMESTAMP |
| book | bigint(128) | 书籍的主键id | 0 |
| current | int(32) | 当前页数 | 0 |
| date | date | 创建日期 | 1970-01-01 |
| url | varchar(1024) | 笔记链接 | Empty String |


##### &#160; &#160; &#160; &#160; 建表语句
```
CREATE TABLE `note` (
  `id` bigint(128) NOT NULL AUTO_INCREMENT COMMENT '唯一主键',
  `_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '时间戳',
  `book` bigint(128) NOT NULL DEFAULT '0' COMMENT '书籍的唯一主键',
  `current` int(32) NOT NULL DEFAULT '0' COMMENT '当前阅读进度',
  `date` date NOT NULL DEFAULT '1970-01-01' COMMENT '笔记创建日期',
  `url` varchar(1024) NOT NULL DEFAULT '' COMMENT '笔记链接',
  PRIMARY KEY (`id`),
  KEY `ix_book` (`book`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

##### &#160; &#160; &#160; &#160; 2.7 布告栏(bulletin)

| 字段名称 | 数据类型   | 说明 | 默认值 |
| :-: | :-: | :-: | :-: |
| id | bigint(128) | 唯一主键 | - |
| _timestamp | timedtamp | 时间戳 | CURRENT_TIMESTAMP |
| date | date | 任务发布日期 | 1970-01-01 |
| level | int(32) | 任务难度 | 1 |
| sketch | varchar(1024) | 任务简述 | Empty String |
| url | varchar(1024) | 进行链接 | Empty String |

##### &#160; &#160; &#160; &#160; 建表语句

```
CREATE TABLE `bulletin` (
  `id` bigint(128) NOT NULL AUTO_INCREMENT COMMENT '唯一主键',
  `_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '时间戳',
  `date` date NOT NULL DEFAULT '1970-01-01' COMMENT '任务发布时间',
  `level` int(32) NOT NULL DEFAULT '1' COMMENT '任务难度',
  `sketch` varchar(1024) NOT NULL DEFAULT '该任务没有描述...' COMMENT '任务简述',
  `url` varchar(1024) NOT NULL DEFAULT '' COMMENT '进行任务的链接',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```
#### 3. 接口设计

未完待续...
#### 4. 构建部署
未完待续...

