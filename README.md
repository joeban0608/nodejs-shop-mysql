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

# 第十一章 Understanding Sequelize MySQL (ORM)

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

## resource:

- download mySql
  - https://dev.mysql.com/downloads/
  - macos: https://dev.mysql.com/downloads/mysql/
  - workbench: https://dev.mysql.com/downloads/workbench/
- sequelize lib: https://sequelize.org/docs/v6/getting-started/
- associate
  - [https://sequelize.org/docs/v6/core-concepts/assocs](https://sequelize.org/docs/v6/core-concepts/assocs/)
  - https://sequelize.org/docs/v6/other-topics/constraints-and-circularities/
  - https://sequelize.org/docs/v6/core-concepts/assocs/#special-methodsmixins-added-to-instances

# 第十四章 Session & Cookies

- [14-238 Configuring Cookies](https://www.notion.so/14-238-Configuring-Cookies-7a8b407560654f70ab70573b23de7406)
- [14-239 What is a Session](https://www.notion.so/14-239-What-is-a-Session-e1584250e35c410fa742b0e96d16be36?pvs=21)
- [14-240 Initializing the Session Middleware](https://www.notion.so/14-240-Initializing-the-Session-Middleware-fac9f7075c124435860af7978849103d?pvs=21)
- [14-241 Using the Session Middleware](https://www.notion.so/14-241-Using-the-Session-Middleware-1c5a6a80c96d43c1bfdf3d008626c4ef?pvs=21)
- [14-242 Using MongoDB to Store Sessions](https://www.notion.so/14-242-Using-MongoDB-to-Store-Sessions-02b1d9dfc7e44c348a346d0597f27c55?pvs=21)
- [14-244 Deleting a Cookie](https://www.notion.so/14-244-Deleting-a-Cookie-b37ac504681248d6b805db83db9a56fb?pvs=21)
- [14-246 Making “Add to Card” Work Again](https://www.notion.so/14-246-Making-Add-to-Card-Work-Again-fa1abb0477594bbc90007dbce63bbbcd?pvs=21)
- [14-247 Two Tiny Improvements](https://www.notion.so/14-247-Two-Tiny-Improvements-429452ac00464f33b8cfd0f75a204e7e?pvs=21)
- [14-248 Wrap Up](https://www.notion.so/14-248-Wrap-Up-661e06586eae49f9aa6eeffc82b1a80d?pvs=21)

## resource:

- HTTP only: https://devco.re/blog/2014/06/11/setcookie-httponly-security-issues-of-http-headers-3/
- express-session: https://www.npmjs.com/package/express-session
- sessionsavecallback：https://www.npmjs.com/package/express-session#sessionsavecallback
- 有關 express-session 的 stores 連結 https://www.npmjs.com/package/express-session#compatible-session-stores
- **Connect Session Store using Sequelize:** https://www.npmjs.com/package/connect-session-sequelize
- More on Sessions: https://www.quora.com/What-is-a-session-in-a-Web-Application
- More on Cookies: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
- Express-session Official Docs: https://github.com/expressjs/session

# 第十五章 Adding Authentication

- [15-252 what is Authentication](https://www.notion.so/15-252-what-is-Authentication-08afc98eb07742e1971295ba9f194bb9)
- [15-253 How is Authentication Implemented](https://www.notion.so/15-253-How-is-Authentication-Implemented-e93f3ebf8ddf44068ca7184ab42c756a?pvs=21)
- [15-255 Implementing an Authentication Flow](https://www.notion.so/15-255-Implementing-an-Authentication-Flow-2805c5793a234482b0786d4943c23cf2?pvs=21)
- [15-256 Encrypting Password](https://www.notion.so/15-256-Encrypting-Password-e5ff00364ba24478acc38f487ea0945d?pvs=21)
- [15-258 Adding the Signin Functionality](https://www.notion.so/15-258-Adding-the-Signin-Functionality-c569367c16e640b99291e7af620ea858?pvs=21)
- [15-260 Using Middleware Protect Routes](https://www.notion.so/15-260-Using-Middleware-Protect-Routes-531e6c8139b64b19aa1b0dc420b5ffd3?pvs=21)
- [15-271 Useful Resources & Links](https://www.notion.so/15-271-Useful-Resources-Links-0b8221036e204f8eaa0125a7c8a48c71?pvs=21)
- 網頁 | 後台 | 資料庫 攻擊： - XSS (跨站腳本攻擊) - https://developer.mozilla.org/en-US/docs/Web/Security/Types_of_attacks#cross-site_scripting_xss - 防範：具有該屬性的 cookie`HttpOnly`不能由 JavaScript 修改，例如使用[`Document.cookie`](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie);只有當它到達伺服器時才能修改。例如，保存使用者會話的 Cookie 應該設定`HttpOnly`屬性 - 讓 JavaScript 可以使用它們確實是不安全的。此預防措施有助於減輕跨網站腳本 ( [XSS](https://developer.mozilla.org/en-US/docs/Web/Security/Types_of_attacks#cross-site_scripting_xss) ) 攻擊。 - X-XSS-Protection - http protection code
  `jsx
            X-XSS-Protection: 0
            X-XSS-Protection: 1
            X-XSS-Protection: 1; mode=block
            X-XSS-Protection: 1; report=<reporting-uri>
            `

                    - https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection

        - CSRF 攻擊與防範
            - https://tech-blog.cymetrics.io/posts/jo/zerobased-cross-site-request-forgery/
                - 防範 CSRF 的重點在於打破 CSRF 攻擊流程三要素，
                    1. 增加所有敏感動作的驗證方式，例如：金流、提交個資 等…多加一道驗證碼的機制
                    2. 增加無法預測的參數，常見且有效的防範方式例如：**CSRF token (在頁面的 form 或是 custom header 裡面放一個 token 並要求 client request 要夾帶這個 token )**

## resource:

- Bcrypt Official Docs: https://github.com/dcodeIO/bcrypt.js
- More on CSRF Attacks: https://www.acunetix.com/websitesecurity/csrf-attacks/
- HTTP cookie : security | HttpOnly: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#block_access_to_your_cookies
  - XSS (跨站腳本攻擊): https://developer.mozilla.org/en-US/docs/Web/Security/Types_of_attacks#cross-site_scripting_xss
- nextjs form action: https://www.youtube.com/watch?v=CNaLOa-6X7U
  [自己專案內實作：](https://www.notion.so/b9249382625346b4b6d5e2b00192fdf1?pvs=21)
- npm bcrypt：https://www.npmjs.com/package/bcrypt
- More on CSRF Attacks: https://www.acunetix.com/websitesecurity/csrf-attacks/
