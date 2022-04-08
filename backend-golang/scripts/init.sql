use wiki_2022;
CREATE TABLE IF NOT EXISTS `user`
(
    `id`           bigint(128)   NOT NULL AUTO_INCREMENT COMMENT '唯一主键',
    `gmt_create`   timestamp     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `gmt_modified` timestamp     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `name`         varchar(128)  NOT NULL DEFAULT '' COMMENT '用户名',
    `password`     varchar(128)  NOT NULL DEFAULT '' COMMENT 'MD5 的密码值',
    `role`         int(32)       NOT NULL DEFAULT '1' COMMENT '角色 0:管理员,1:用户 ',
    `avatar`       varchar(1024) NOT NULL DEFAULT '' COMMENT '头像图片url',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
;

CREATE TABLE IF NOT EXISTS `article`
(
    `id`             bigint(128)   NOT NULL AUTO_INCREMENT COMMENT '唯一主键',
    `gmt_create`     timestamp     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `gmt_modified`   timestamp     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `title`          varchar(1024) NOT NULL DEFAULT '' COMMENT ' 文章标题',
    `platform`       varchar(128)  NOT NULL DEFAULT '其他' COMMENT '发表平台',
    `classification` bigint(128)   NOT NULL DEFAULT '0' COMMENT 'classification 的主键id',
    `url`            varchar(1024) NOT NULL DEFAULT '' COMMENT '访问链接',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
;

CREATE TABLE IF NOT EXISTS `book`
(
    `id`             bigint(128)   NOT NULL AUTO_INCREMENT COMMENT '唯一主键',
    `gmt_create`     timestamp     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `gmt_end`        timestamp     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '结束时间',
    `gmt_modified`   timestamp     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `name`           varchar(1024) NOT NULL DEFAULT '' COMMENT '书籍名称',
    `author`         varchar(1024) NOT NULL DEFAULT '' COMMENT '作者名称',
    `classification` bigint(128)   NOT NULL DEFAULT '0' COMMENT 'classification 的主键id',
    `count`          int(32)       NOT NULL DEFAULT '1' COMMENT '总页数',
    `current`        int(32)       NOT NULL DEFAULT '0' COMMENT '当前阅读页数',
    `score`          decimal(3, 1) NOT NULL DEFAULT '0.0' COMMENT '豆瓣评分',
    `img`            varchar(1024) NOT NULL DEFAULT '' COMMENT '封面图片url',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
;

CREATE TABLE IF NOT EXISTS `message`
(
    `id`           bigint(32)    NOT NULL AUTO_INCREMENT COMMENT '主键',
    `gmt_create`   timestamp     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `gmt_modified` timestamp     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `name`         varchar(128)  NOT NULL DEFAULT '' COMMENT '名称',
    `avatar`       varchar(1024) NOT NULL DEFAULT '' COMMENT '头像url',
    `content`      varchar(1024) NOT NULL DEFAULT '' COMMENT '内容',
    `topic`        int(32)       NOT NULL DEFAULT '0' COMMENT '讨论的主题',
    `index`        int(32)       NOT NULL DEFAULT '0' COMMENT '主题下的index',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8 COMMENT ='留言板'
;

CREATE TABLE IF NOT EXISTS `note`
(
    `id`           bigint(128)   NOT NULL AUTO_INCREMENT COMMENT '唯一主键',
    `gmt_create`   timestamp     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `gmt_modified` timestamp     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `book`         bigint(128)   NOT NULL DEFAULT '0' COMMENT '书籍的唯一主键',
    `total`        int(32)       NOT NULL DEFAULT '0' COMMENT '总页数',
    `current`      int(32)       NOT NULL DEFAULT '0' COMMENT '当前阅读进度',
    `url`          varchar(1024) NOT NULL DEFAULT '' COMMENT '笔记链接',
    PRIMARY KEY (`id`),
    KEY `ix_book` (`book`) USING BTREE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
;

CREATE TABLE IF NOT EXISTS `classification`
(
    `id`           bigint(128)  NOT NULL AUTO_INCREMENT COMMENT '唯一主键',
    `gmt_create`   timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `gmt_modified` timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `type`         varchar(128) NOT NULL DEFAULT 'SKILL' COMMENT '类型,取值有:SKILL,LEETCODE,LEETCODE_EXP,BOOK_MARK,ENGLISH',
    `first`        varchar(128) NOT NULL DEFAULT '其他' COMMENT '大分类',
    `second`       varchar(128) NOT NULL DEFAULT '其他' COMMENT '二级分类',
    `third`        varchar(128) NOT NULL DEFAULT '其他' COMMENT '三级分类',
    PRIMARY KEY (`id`),
    UNIQUE KEY `ix_unique` (`type`, `first`, `second`, `third`) USING BTREE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
;


CREATE TABLE IF NOT EXISTS `event`
(
    `id`            bigint(128)  NOT NULL AUTO_INCREMENT COMMENT '唯一主键',
    `gmt_create`    timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `gmt_modified`  timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `type`          varchar(128) NOT NULL DEFAULT '' COMMENT '类型',
    `desc`          text COMMENT '描述',
    `trigger_table` varchar(128) NOT NULL DEFAULT '' COMMENT '触发新鲜事的变更表表名',
    `trigger_id`    bigint(128)  NOT NULL DEFAULT '0' COMMENT '触发新鲜事的变更表的数据id',
    `extend`        text COMMENT '扩展字段',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
;

CREATE TABLE IF NOT EXISTS `leetcode`
(
    `id`             bigint(128)   NOT NULL AUTO_INCREMENT COMMENT '唯一主键',
    `gmt_create`     timestamp     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `gmt_modified`   timestamp     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `name`           varchar(1024) NOT NULL DEFAULT '' COMMENT '题目名称',
    `difficulty`     int(32)       NOT NULL DEFAULT '0' COMMENT '0:简单,1:中等,2:困难',
    `frequency`      int(32)       NOT NULL DEFAULT '0' COMMENT '次数',
    `url`            varchar(1024) NOT NULL DEFAULT '' COMMENT '题目链接',
    `status`         int(32)       NOT NULL DEFAULT '0' COMMENT '状态:0 有效 ,1 屏蔽',
    `classification` bigint(128)   NOT NULL DEFAULT '0' COMMENT 'classification 的主键id',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
;

CREATE TABLE IF NOT EXISTS `leetcode_experience`
(
    `id`             bigint(128) NOT NULL AUTO_INCREMENT COMMENT '唯一主键',
    `gmt_create`     timestamp   NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `gmt_modified`   timestamp   NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `classification` bigint(128) NOT NULL DEFAULT '0' COMMENT 'classification 的主键id',
    `leetcode_id`    bigint(128) NOT NULL DEFAULT '0' COMMENT '题目id',
    `desc`           text COMMENT '描述',
    `index`          int(32)     NOT NULL DEFAULT '0' COMMENT '顺序',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
;

CREATE TABLE IF NOT EXISTS `bookmark`
(
    `id`             bigint(128)   NOT NULL AUTO_INCREMENT COMMENT '唯一主键',
    `gmt_create`     timestamp     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `gmt_modified`   timestamp     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `classification` bigint(128)   NOT NULL DEFAULT '0' COMMENT 'classification 的主键id',
    `title`          varchar(1024) NOT NULL DEFAULT '' COMMENT '文章标题',
    `desc`           text COMMENT '描述',
    `url`            varchar(1024) NOT NULL DEFAULT '' COMMENT '访问链接',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
;

CREATE TABLE IF NOT EXISTS `keyword`
(
    `id`           bigint(128)   NOT NULL AUTO_INCREMENT COMMENT '唯一主键',
    `gmt_create`   timestamp     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `gmt_modified` timestamp     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `name`         varchar(1024) NOT NULL DEFAULT '' COMMENT '名称',
    `desc`         text COMMENT '描述',
    `url`          varchar(1024) NOT NULL DEFAULT '' COMMENT '访问链接',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
;

CREATE TABLE IF NOT EXISTS `foreign_article`
(
    `id`           bigint(128)   NOT NULL AUTO_INCREMENT COMMENT '唯一主键',
    `gmt_create`   timestamp     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `gmt_modified` timestamp     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `name`         varchar(1024) NOT NULL DEFAULT '' COMMENT '名称',
    `desc`         text COMMENT '描述',
    `url`          varchar(1024) NOT NULL DEFAULT '' COMMENT '访问链接',
    `new_words`    int(32)       NOT NULL DEFAULT '0' COMMENT '生词数量',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
;

CREATE TABLE IF NOT EXISTS `foreign_word`
(
    `id`              bigint(128)   NOT NULL AUTO_INCREMENT COMMENT '唯一主键',
    `gmt_create`      timestamp     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `gmt_modified`    timestamp     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `foreign_article` bigint(128)   NOT NULL DEFAULT '0' COMMENT '文章id',
    `word`            varchar(1024) NOT NULL DEFAULT '' COMMENT '词语',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
;

CREATE TABLE IF NOT EXISTS `motto`
(
    `id`           bigint(128) NOT NULL AUTO_INCREMENT COMMENT '唯一主键',
    `gmt_create`   timestamp   NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `gmt_modified` timestamp   NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `content`      text COMMENT '内容',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
;
