"use client";

import React, { useState, useCallback } from "react";
import { GamesFiltersObject } from "@/domain/types/gamesFilters";
import { ESortOption } from "@/domain/enums/eSortOption";
import { EVendor } from "@/domain/enums/eVendor";

interface GamesFiltersWidgetProps {
  onFiltersSubmit: (filters: GamesFiltersObject) => void;
  currentFilters?: GamesFiltersObject;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getInitialVendorFilters = (availability?: any): Record<EVendor, boolean> => {
  return {
    [EVendor.Steam]: availability?.steam ?? false,
    [EVendor.InstantGaming]: availability?.instantGaming ?? false,
    [EVendor.G2A]: false,
  };
};

export default function GamesFiltersWidget({
  onFiltersSubmit,
  currentFilters,
}: GamesFiltersWidgetProps) {
  const [searchQuery, setSearchQuery] = useState(currentFilters?.query || "");
  const [vendorFilters, setVendorFilters] = useState<Record<EVendor, boolean>>(
    getInitialVendorFilters(currentFilters?.filters?.availability),
  );
  const [minPrice, setMinPrice] = useState<number | "">(
    currentFilters?.filters?.priceRange?.min ?? "",
  );
  const [maxPrice, setMaxPrice] = useState<number | "">(
    currentFilters?.filters?.priceRange?.max ?? "",
  );
  const [sortOption, setSortOption] = useState<ESortOption>(
    currentFilters?.sort ?? ESortOption.None,
  );
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const buildFiltersObject = useCallback(() => {
    const filtersObject: GamesFiltersObject = {};

    if (searchQuery) {
      filtersObject.query = searchQuery;
    }

    const hasVendorFilters = Object.values(vendorFilters).some((v) => v);
    const hasPriceFilter = minPrice !== "" || maxPrice !== "";

    if (hasVendorFilters || hasPriceFilter) {
      filtersObject.filters = {};

      if (hasVendorFilters) {
        filtersObject.filters.availability = {
          steam: vendorFilters[EVendor.Steam] || undefined,
          instantGaming: vendorFilters[EVendor.InstantGaming] || undefined,
        };
      }

      if (hasPriceFilter) {
        filtersObject.filters.priceRange = {
          min: minPrice !== "" ? Number(minPrice) : undefined,
          max: maxPrice !== "" ? Number(maxPrice) : undefined,
        };
      }
    }

    if (sortOption !== ESortOption.None) {
      filtersObject.sort = sortOption;
    }

    return filtersObject;
  }, [searchQuery, vendorFilters, minPrice, maxPrice, sortOption]);

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    onFiltersSubmit(buildFiltersObject());
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleVendorChange = (vendor: EVendor) => {
    setVendorFilters((prev) => ({
      ...prev,
      [vendor]: !prev[vendor],
    }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as ESortOption);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setVendorFilters({
      [EVendor.Steam]: false,
      [EVendor.InstantGaming]: false,
      [EVendor.G2A]: false,
    });
    setMinPrice("");
    setMaxPrice("");
    setSortOption(ESortOption.None);
  };

  const hasActiveFilters =
    searchQuery ||
    Object.values(vendorFilters).some((v) => v) ||
    minPrice !== "" ||
    maxPrice !== "" ||
    sortOption !== ESortOption.None;

  return (
    <div className="w-full bg-white dark:bg-gray-900 rounded-lg p-4 space-y-3 border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search games..."
          value={searchQuery}
          onChange={handleSearchQueryChange}
          onKeyDown={handleSearchKeyPress}
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors"
        >
          Search
        </button>
      </div>

      <select
        title="sorting"
        value={sortOption}
        onChange={handleSortChange}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      >
        <option value={ESortOption.None}>Sort by...</option>
        <option value={ESortOption.AscendingPrice}>Price ↑</option>
        <option value={ESortOption.DescendingPrice}>Price ↓</option>
      </select>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
        <button
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium text-gray-900 dark:text-white"
        >
          <span>
            More filters {hasActiveFilters && <span className="ml-2 text-blue-600">●</span>}
          </span>
          <span className={`transition-transform ${isFiltersOpen ? "rotate-180" : ""}`}>▼</span>
        </button>

        {isFiltersOpen && (
          <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-3 border border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Available at:
              </p>
              <div className="space-y-2">
                {Object.values(EVendor).map((vendor) => (
                  <label key={vendor} className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="checkbox"
                      checked={vendorFilters[vendor]}
                      onChange={() => handleVendorChange(vendor)}
                      className="w-4 h-4 accent-blue-600 cursor-pointer"
                    />
                    <span className="text-gray-700 dark:text-gray-300">{vendor}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-300 dark:border-gray-600 pt-3">
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Price range:
              </p>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value === "" ? "" : Number(e.target.value))}
                  className="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-500 dark:text-gray-400 text-xs">—</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
                  className="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {hasActiveFilters && (
        <button
          onClick={handleResetFilters}
          className="w-full px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
