# nodejs-shop-mysql

## 這是一個練習 Node.js + MySQL + Sequelize ORM + nextjs 的專案

## 專案架構

- 使用 Node.js 當 Server
- MySQL + Sequelize ORM 在 Node.js 內處理 DB
- Next.js 渲染畫面

## 備註

- 目前這篇的權限還沒實作，User and Cart 是寫死，固定使用同一個 User + 同一個 Cart 來實現，DB 處理資料的練習
- 參考課程: [Node.js - The Complete Guide (incl. MVC, REST APIs, GraphQL)](https://www.udemy.com/course/nodejs-the-complete-guide/?couponCode=SKILLS4SALEA)

---

# 11-151 what is Sequelize classes info:
- [11-151 What is Sequelize](https://prod-files-secure.s3.us-west-2.amazonaws.com/92560234-a90a-4344-8092-7edf736a18ec/235025b5-b5c7-4c6e-b80e-8cc5fa49a97b/orm.jpeg)
- [11-152 Connecting to the Database](https://www.notion.so/11-152-Connecting-to-the-Database-ee5126e6068f40e394dbf0ed4d5cbbcc?pvs=21)
- [11-153 Defining a Model](https://www.notion.so/11-153-Defining-a-Model-2d39ad3a7fbd497992fa4d184f2a2240?pvs=21)
- [11-154 Syncing JS Definitions to the db](https://www.notion.so/11-154-Syncing-JS-Definitions-to-the-db-20a30dc6f2af4878b4d96a764d6d61a1?pvs=21)
- [11-155 Inserting Data & Creating a Product](https://www.notion.so/11-155-Inserting-Data-Creating-a-Product-6cf65de65fd547d5baca6c94a93f2fd6?pvs=21)
- [11-157 Retrieving Data & Finding Products](https://www.notion.so/11-157-Retrieving-Data-Finding-Products-d37abce62b8f40cb99cf3b69f75b1431?pvs=21)
- [11-158 Getting a Single Product with the “where” Conditon](https://www.notion.so/11-158-Getting-a-Single-Product-with-the-where-Conditon-0181488b031943219b59675d83e086ef?pvs=21)
- [11-160 Updating Products](https://www.notion.so/11-160-Updating-Products-211e994690c94be5bc687da92f014acb?pvs=21)
- [11-161 Deleting Products](https://www.notion.so/11-161-Deleting-Products-5a0c7e54d0ce4776a33b4891187352e3?pvs=21)
- [11-162 Creating a User Model](https://www.notion.so/11-162-Creating-a-User-Model-1bf1f167e3fe451a9a31b74929dbd26c?pvs=21)
- [11-163 Adding a One-To-Many Relationship](https://www.notion.so/11-163-Adding-a-One-To-Many-Relationship-55ba57332e7242f19564be064ced8980?pvs=21)
- [11-164 Creating & Manging a Dummy User](https://www.notion.so/11-164-Creating-Manging-a-Dummy-User-13a032c6ebc54ae5b1d054ce1a8ac634?pvs=21)
- [11-165 Using Magic Association Methods](https://www.notion.so/11-165-Using-Magic-Association-Methods-3d7a08c32df3479f91662d020489e88a?pvs=21)
- [11-166 Fetching Related Products](https://www.notion.so/11-166-Fetching-Related-Products-cb5f1326bcf345db857563271985aff4?pvs=21)
- [11-167 One-To-Many & Many-To-Many Relations](https://www.notion.so/11-167-One-To-Many-Many-To-Many-Relations-e230c4750a4a44359b927001f864c158?pvs=21)
- [11-168 Creating & Fetching a Cart](https://www.notion.so/11-168-Creating-Fetching-a-Cart-c03fc41f0a974f668095d679c7b3372e?pvs=21)
- [11-169 Adding New Products to the Cart / 11-170 Adding Existing Products & Retrieving Cart Items](https://www.notion.so/11-169-Adding-New-Products-to-the-Cart-11-170-Adding-Existing-Products-Retrieving-Cart-Items-8509ffb29cc94948adc3f78e53e13131?pvs=21)
- [11-171 Deleting Related Items & Deleting Cart Products](https://www.notion.so/11-171-Deleting-Related-Items-Deleting-Cart-Products-75b1156384df4c6e8145ff763c60aab0?pvs=21)
- [11-172 Adding an Order Model](https://www.notion.so/11-172-Adding-an-Order-Model-125618f2940946c0a22db08c1c471f9b?pvs=21)
- [11-173 Storing CartItems as OrderItems / 174 Resetting the Cart & Fetching and Outputting Orders](https://www.notion.so/11-173-Storing-CartItems-as-OrderItems-174-Resetting-the-Cart-Fetching-and-Outputting-Orders-3aea6a2c5f7041b2880d7248e01aef31?pvs=21)
- [11-174 Resetting the Cart & Fetching and Outputting Orders](https://www.notion.so/11-174-Resetting-the-Cart-Fetching-and-Outputting-Orders-3d158db4b28a44de8b96cbd39ec2529d?pvs=21)
- [改寫成 nodejs api routes + nextjs 作品：](https://www.notion.so/b78829c1a2374f2cbf6855ae8ce55835?pvs=21)

---

resource:

- download mySql
  - https://dev.mysql.com/downloads/
  - macos: https://dev.mysql.com/downloads/mysql/
  - workbench: https://dev.mysql.com/downloads/workbench/
- sequelize lib: https://sequelize.org/docs/v6/getting-started/
- associate
  - [https://sequelize.org/docs/v6/core-concepts/assocs](https://sequelize.org/docs/v6/core-concepts/assocs/)
  - https://sequelize.org/docs/v6/other-topics/constraints-and-circularities/
  - https://sequelize.org/docs/v6/core-concepts/assocs/#special-methodsmixins-added-to-instances
