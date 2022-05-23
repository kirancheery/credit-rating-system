/*
 Navicat MySQL Data Transfer
 
 Source Server         : 本地
 Source Server Version : 80028
 Source Host           : localhost:3306
 Source Database       : credit
 
 Target Server Type    : MYSQL
 Target Server Version : 80028
 File Encoding         : 65001
 
 Date: 2022-04-26 20:46:05
 */
SET
  FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for grade
-- ----------------------------
DROP TABLE IF EXISTS `grade`;

CREATE TABLE `grade` (
  `grade_id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` int NOT NULL COMMENT '所属用户的id',
  --  顶部
  `user_name` varchar(50) NOT NULL COMMENT '客户名称',
  `balance` int NOT NULL COMMENT '现有资产余额',
  `old_grade` int NOT NULL COMMENT '原有信用等级',
  `total_assets` int NOT NULL COMMENT '资产总额',
  `total_liabilities` int NOT NULL COMMENT '负债总额',
  `owner_equity` int NOT NULL COMMENT '所有者权益',
  -- 基本信息
  `age` int NOT NULL COMMENT '年龄',
  `edu` int NOT NULL COMMENT '学历',
  `marriage` int NOT NULL COMMENT '婚姻:1已婚,0未婚',
  `health` int NOT NULL COMMENT '健康状态',
  `children` int NOT NULL COMMENT '子女',
  `unit_type` int NOT NULL COMMENT '所在单位类型',
  `position` int NOT NULL COMMENT '职业职位',
  `lately_time` int NOT NULL COMMENT '最近从业时间',
  `hold` int NOT NULL COMMENT '社会职务',
  `location` int NOT NULL COMMENT '住所',
  --  偿债能力
  `prospect` int NOT NULL COMMENT '从事职业前景',
  `social_security` int NOT NULL COMMENT '社保缴纳记录',
  `family_assets` int NOT NULL COMMENT '家庭净资产',
  `own_income` int NOT NULL COMMENT '本人收入或者家庭年收入最高',
  `family_income` int NOT NULL COMMENT '家庭人均年收入',
  --  信用记录
  `own_mate_loan` int NOT NULL COMMENT '本人及配偶有无贷款记录',
  `overdue_repayment` int NOT NULL COMMENT '有无还款付息逾期',
  `max_overdue` int NOT NULL COMMENT '最长逾期记录',
  `involved_appeal` int NOT NULL COMMENT '有无涉诉',
  `external_guarantee` int NOT NULL COMMENT '对外担保',
  --  总分
  `bask_info_score` int NOT NULL DEFAULT 0 COMMENT '基本信息总分',
  `debt_pay_score` int NOT NULL DEFAULT 0 COMMENT '偿债能力总分',
  `credit_score` int NOT NULL DEFAULT 0 COMMENT '信用记录总分',
  `all_score` int NOT NULL  DEFAULT 0 COMMENT '总分',
  `grade` int NOT NULL  DEFAULT 0 COMMENT '现有评级', 


  `status` tinyint NOT NULL DEFAULT 0 COMMENT '0:待审核 1:已审核2审核通过3:审核未通过',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`grade_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 200 COMMENT = '评级表';