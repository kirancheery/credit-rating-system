DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `user_id` bigint NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `user_name` varchar(30) NOT NULL COMMENT '用户账号',
  `user_type` int DEFAULT 1 NOT NULL COMMENT '用户类型:3 超管2 普通管理员 1普通用户',
  `email` varchar(50) DEFAULT "123@qq.com" COMMENT '用户邮箱',
  `phonenumber` varchar(11) NOT NULL COMMENT '手机号码',
  `password` varchar(100) NOT NULL COMMENT '密码',
  `del_flag` char(1) DEFAULT '0' COMMENT '删除标志:0代表存在 2代表删除',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`user_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 100 COMMENT = '用户信息表';

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO
  `user`
VALUES
  (
    1,
    'admin',
    2,
    'admin@163.com',
    '18312341232',
    'VAg5d6ct59yYtwWHBlHq3Q==',
    '0',
    '2022-04-22 11:02:24',
    null
  );

INSERT INTO
  `user`
VALUES
  (
    2,
    'super',
    3,
    'admin@qq.com',
    '18312341231',
    'VAg5d6ct59yYtwWHBlHq3Q==',
    '0',
    '2022-04-22 11:02:24',
    '2022-05-02 20:53:22'
  );

INSERT INTO
  `user`
VALUES
  (
    3,
    '名称',
    1,
    '1234@qq.com',
    '18312341234',
    'VAg5d6ct59yYtwWHBlHq3Q==',
    '0',
    '2022-04-30 19:31:34',
    '2022-04-30 19:31:34'
  );

INSERT INTO
  `user`
VALUES
  (
    4,
    'test',
    3,
    '1234@qq.com',
    '1831231111',
    'VAg5d6ct59yYtwWHBlHq3Q==',
    '0',
    '2022-05-02 19:01:43',
    '2022-05-02 19:01:43'
  );