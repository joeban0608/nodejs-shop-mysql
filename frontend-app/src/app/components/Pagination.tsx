import Link from "next/link";
import React from "react";
type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  routerUrl: string;
};
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  routerUrl,
}: PaginationProps) => {
  const isPreviewBtnDisabled = currentPage === 1;
  const isNextBtnDisabled = currentPage === totalPages;

  return (
    <section className="p-4 w-full flex justify-center">
      <div className="join">
        <button
          className={
            "join-item btn" +
            `${isPreviewBtnDisabled ? " btn-disabled opacity-95" : ""}`
          }
          style={isPreviewBtnDisabled ? { background: "white" } : {}}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isPreviewBtnDisabled}
        >
          «
        </button>

        {/* 渲染總共有幾頁的 Link */}
        {Array.from({ length: totalPages }, (_, index) => {
          const number = index + 1;
          return (
            <Link
              href={`/${routerUrl}?page=${number}`}
              key={number}
              onClick={() => onPageChange(number)}
              className={
                "join-item btn" +
                `${currentPage === number ? " btn-active" : ""}`
              }
            >
              {number}
            </Link>
          );
        })}

        <button
          className={
            "join-item btn" +
            `${isNextBtnDisabled ? " btn-disabled opacity-95" : ""}`
          }
          style={isNextBtnDisabled ? { background: "white" } : {}}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isNextBtnDisabled}
        >
          »
        </button>
      </div>
    </section>
  );
};

export default Pagination;
