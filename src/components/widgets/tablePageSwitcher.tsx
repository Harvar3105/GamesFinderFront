"use client";

import React from "react";

interface TablePageSwitcherProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function TablePageSwitcher({
  currentPage,
  totalPages,
  onPageChange,
}: TablePageSwitcherProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageSelect = (page: number) => {
    onPageChange(page);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 4) {
      pages.push("...");
    }

    const startPage = Math.max(2, currentPage - 2);
    const endPage = Math.min(totalPages - 1, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 3) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-4 flex-wrap p-6">
      <button
        className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded hover:bg-blue-600 hover:text-white dark:hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors whitespace-nowrap"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        ← Previous
      </button>

      <div className="flex gap-2 items-center">
        {pageNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`dots-${index}`}
                className="text-gray-500 dark:text-gray-400 px-2 cursor-default"
              >
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              className={`px-3 py-2 min-w-10 border rounded transition-colors font-medium ${
                currentPage === page
                  ? "bg-blue-600 dark:bg-blue-700 text-white border-blue-600 dark:border-blue-700"
                  : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={() => handlePageSelect(page as number)}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded hover:bg-blue-600 hover:text-white dark:hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors whitespace-nowrap"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        Next →
      </button>

      <div className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}
