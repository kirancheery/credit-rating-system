## 个人贷款审核
## 如何运行
- 1：git clone 或者下载解压到本地

- 2：修改配置

  ```js
  进入 /src/config/index.ts
  修改typeOrm里的数据库配置
   typeOrm: {
      type: 'mysql',
      host: 'localhost', 
      port: 13306, //  替换为自己的数据库的端口：默认时3306
      username: 'root', // 替换为自己的数据库的登录账户
      password: '123456', //  替换为自己的数据库的密码
      database: 'credit', //  替换为自己的数据库的名称
      synchronize: false, // 此处可以不设置为true 设置以后，如果建立了数据库，会自动根据entity生成表
      autoLoadEntities: true,
      logging: ['error'],
    },
  
  ```

  - 3：进入自己的数据库，安装sql文件：src/sql

  - 4：进入项目根目录 使用cmd : npm install

  - 5：npm run dev 

  - 6：浏览器输入 http://localhost:3000/doc 查看swagger文档

## 使用技术

  - 1：后端框架 nestjs
  - 2：ORM：TypeOrm
  - 3：数据库：mysql5.7
  - 4：登录使用 jsonwebtoken 校验
  - 5：角色权限：nestjs的守卫功能

## 其他

  - 1：统一数据返回前端 
  - 2：统一错误处理返回
  - 3：前端鉴权：header中添加：Authorization:Bearer token.......
  - 4：角色权限：再controller中，使用了@Roles("xx","xx")的才就需要xx的权限，不写此装饰器则所有人可操作
  - 5：请求接口没限制，但是会根据角色权限限制，不满足返回：403  Forbidden resource

## 待处理需求

  - 完善接口

## 接口文档：

统一前缀： http://localhost:3000/api

限制为空：可以不填，否则就是限制里的内容

带有/{user_name} 这种{}的接口，那么前端再发送是，发送的接口地址就是/123  将{}和里面的内容替换为实际参数

## 评分管理

 ### 创建评分

- 请求方式：post

-  地址：  /grade    

| 参数解释                       | 参数名称           | 数据类型 | 默认值   | 限制             |
| ------------------------------ | ------------------ | -------- | -------- | ---------------- |
| 客户名称                       | user_name          | string   | 客户名称 | 不能超过50个字符 |
| 现有资产                       | balance            | int      | 1        | 不能为空         |
| 原有信用等级                   | old_grade          | int      | 1        | 不能为空         |
| 资产总额                       | total_assets       | int      | 1        | 不能为空         |
| 负债总额                       | total_liabilities  | int      | 1        | 不能为空         |
| 所有者权益                     | owner_equity       | int      | 1        | 不能为空         |
|                                |                    |          |          |                  |
| **基本信息**                   |                    |          |          | **可选值范围**   |
| 年龄                           | age                | int      | 1        | 1,2,3            |
| 学历                           | edu                | int      | 1        | 0,1,2,3,4        |
| 婚姻                           | marriage           | int      | 1        | 0,1,2,3,4,5      |
| 健康状态                       | health             | int      | 1        | 0,1              |
| 子女                           | children           | int      | 2        | 0 ,2, 4          |
| 所在单位类型                   | unit_type          | int      | 1        | 0,1,2,3,4,5      |
| 职业职位                       | position           | int      | 1        | 0,1,3,5          |
| 最近从业时间                   | lately_time        | int      | 1        | 0,2,3,5          |
| 有无官方或者民间担任职务       | hold               | int      | 2        | 0,2              |
| 住所                           | location           | int      | 1        | 0,1              |
|                                |                    |          |          |                  |
| **偿债能力**                   |                    |          |          |                  |
| 从事职业前景                   | prospect           | int      | 1        | 1,2,3            |
| 社保缴纳记录                   | social_security    | int      | 1        | 0,1,2,3          |
| 家庭净资产                     | family_assets      | int      | 1        | 0,1,3,5,8,10,15  |
| 本人收入或家庭成员最高个人收入 | own_income         | int      | 1        | 0,10, 8, 5, 3, 1 |
| 家庭人均收入                   | family_income      | int      | 1        | 12, 8, 5, 3, 1   |
|                                |                    |          |          |                  |
| **信用记录**                   |                    |          |          |                  |
| 本人及配偶有无贷款记录         | own_mate_loan      | int      | 3        | 0,3              |
| 有无还款付息逾期               | overdue_repayment  | int      | 5        | 5,0,3            |
| 最长逾期记录                   | max_overdue        | int      | 6        | 0.3.6            |
| 有无涉诉                       | involved_appeal    | int      | 5        | 5  , 0           |
| 对外担保                       | external_guarantee | int      | 1        | 1 0              |
|                                |                    | int      |          |                  |
| **其他信息**                   |                    |          |          |                  |
| 用户ID                         | user_id            |          |          | 不能为空         |
|                                |                    |          |          |                  |

### 删除评分

请求地址：/grade/delete

请求方式：POST

非软删除：数据库中的文件直接删除，

| 参数解释 | 参数名称 | 数据类型 | 限制     |
| -------- | -------- | -------- | -------- |
| 评分主键 | grade_id | int      | 不能为空 |
|          |          |          |          |

### 更新评分审核状态 : 

状态只能是  0:待审核   1:已审核   2审核通过,  3:审核未通过其中一个

请求地址：/grade/update

请求方式：POST

| 参数解释 | 参数名称 | 数据类型 | 限制       |
| -------- | -------- | -------- | ---------- |
| 评分主键 | grade_id | int      | 不能为空   |
| 状态     | status   | int      | 0, 1, 2, 3 |

### 查看所有评分列表

请求地址：/grade/list?pageSize=10&pageNum=1

请求方式：GET

参数：

| 参数解释       | 默认 | 参数名称 | 数据类型 | 限制 |
| -------------- | ---- | -------- | -------- | ---- |
| 一页显示多少条 | 10   | pageSize | number   |      |
| 第几页         | 1    | pageNum  | number   |      |



### 根据用户名称进行模糊查询

请求地址：/grade/findOne/?user_name=xx&pageSize=10&pageNum=1

请求方式：GET

| 参数解释       | 参数名称  | 数据类型      | 限制          |
| -------------- | --------- | ------------- | ------------- |
| 用户名称       | user_name | string        | 50个字符以内  |
| 一页显示多少条 | pageSize  | string \|int  | 默认：10 可选 |
| pageNum        | pageNum   | string \| int | 默认：1 可选  |

 

## 用户管理

### 新增管理员：

请求地址：/user

请求方式：POST



| 参数解释     | 参数名称    | 数据类型 | 限制         |
| ------------ | ----------- | -------- | ------------ |
| 管理员名称   | user_name   | string   | 50个字符以内 |
| 管理员级别   | user_type   | int      | 2.3中的一个  |
| 邮箱         | email       | string   | 邮箱         |
| 登录电话号码 | phonenumber | string   | 11位电话号码 |
| 登录密码     | password    | string   | 密码:8-16位  |

### 查找所有用户

请求地址：/user/find/user?pageSize=10&pageNum=1

请求方式：GET

以下参数为可选 默认从config、page中获取

| 参数解释     | 参数名称 | 数据类型      | 限制 |
| ------------ | -------- | ------------- | ---- |
| 第几页       | pageNo   | string \|int  |      |
| 一页显示几条 | pageSize | string \| int |      |

### 查找所有管理员

请求地址：/user/find/manager?pageSize=10&pageNum=1

请求方式：GET

以下参数为可选 默认从config、page中获取

| 参数解释     | 参数名称 | 数据类型      | 限制 |
| ------------ | -------- | ------------- | ---- |
| 第几页       | pageNo   | string \|int  |      |
| 一页显示几条 | pageSize | string \| int |      |

### 查找具体某一个用户

请求地址：/user/findOne/{user_id}

请求方式：Get

| 参数解释 | 参数名称 | 数据类型 | 限制 |
| -------- | -------- | -------- | ---- |
| id       | user_id  | int      |      |



### 删除用户

请求地址：/user/delete

请求方式：Post

| 参数解释 | 参数名称 | 数据类型 | 限制 |
| -------- | -------- | -------- | ---- |
| id       | user_id  | int      |      |



## 登录

- 请求方式：post

-  地址：  /auth/login

- 返回：正确登录后生成token返回，前端再请求头中 header中添加：Authorization:Bearer 登录成功后返回的token

  | 参数解释 | 参数名称    | 数据类型 | 限制                         |
  | -------- | ----------- | -------- | ---------------------------- |
  | 登录账户 | phonenumber | string   | 不超过11个字符  电话号码格式 |
  | 密码     | password    | string   | 8-16位                       |
  | 用户类型 | user_type   | int      | 1,2,3 之间                   |

## 用户注册

- 请求方式：POST

- 地址： /auth/register

- 注册只为用户开放，通过该接口注册都是用户的注册

  | 参数解释 | 参数名称    | 数据类型 | 限制                        |
  | -------- | ----------- | -------- | --------------------------- |
  | 登录账户 | phonenumber | string   | 不超过11个字符 电话号码格式 |
  | 密码     | password    | string   | 8-16位                      |
  | 邮箱     | email       | string   | 50 邮箱格式                 |

   

