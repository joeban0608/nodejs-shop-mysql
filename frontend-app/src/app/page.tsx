export default function Home() {
  return (
    <main className="w-full h-[calc(100%-56px)] flex flex-col gap-4">
      <h1 className="text-4xl font-bold">Home page</h1>
      <p>這是一個練習 nodejs + mySql + sequlize ORM 的專案</p>
      <h2 className="text-xl font-bold">專案架構：</h2>
      <ul className="list-disc pl-5">
        <li>使用 nodejs 當 server</li>
        <li>MySql + sequlize ORM 在 nodejs 內處理 DB</li>
        <li>nextjs 渲染畫面</li>
      </ul>
      <hr />
      <h2 className="text-xl font-bold">備註：</h2>
      <ul className="list-disc pl-5">
        <li>
          目前這篇的權限還沒實作，User and cart 是寫死，固定使用同一個 user +
          同一個 cart 來實現，DB 處理資料的練習
        </li>
        <li>
          ref 課程：
          <a
            className="text-blue-400 hover:text-blue-500"
            href="https://www.udemy.com/course/nodejs-the-complete-guide/?couponCode=SKILLS4SALEA"
          >
            https://www.udemy.com/course/nodejs-the-complete-guide/?couponCode=SKILLS4SALEA
          </a>
        </li>
      </ul>
    </main>
  );
}
