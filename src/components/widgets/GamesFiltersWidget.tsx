"use client";

import React, { useState, useCallback } from "react";
import { GamesFiltersObject } from "@/domain/types/GamesFilters";
import { ESortOption } from "@/domain/enums/ESortOption";

interface GamesFiltersWidgetProps {
  onFiltersChange: (filters: GamesFiltersObject) => void;
}

export default function GamesFiltersWidget({ onFiltersChange }: GamesFiltersWidgetProps) {
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchByName, setSearchByName] = useState(true);
  const [searchByDescription, setSearchByDescription] = useState(false);
  const [searchByVendorId, setSearchByVendorId] = useState(false);

  // Filter state
  const [steamAvailable, setSteamAvailable] = useState(false);
  const [instantGamingAvailable, setInstantGamingAvailable] = useState(false);
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  // Sort state
  const [sortOption, setSortOption] = useState<ESortOption>(ESortOption.None);

  const buildFiltersObject = useCallback(() => {
    const filtersObject: GamesFiltersObject = {};

    // Build search params
    if (searchQuery || searchByName || searchByDescription || searchByVendorId) {
      filtersObject.search = {
        query: searchQuery || undefined,
        searchByName: searchByName || undefined,
        searchByDescription: searchByDescription || undefined,
        searchByVendorId: searchByVendorId || undefined,
      };
    }

    // Build filters
    if (steamAvailable || instantGamingAvailable || minPrice !== "" || maxPrice !== "") {
      filtersObject.filters = {};

      if (steamAvailable || instantGamingAvailable) {
        filtersObject.filters.availability = {
          steam: steamAvailable || undefined,
          instantGaming: instantGamingAvailable || undefined,
        };
      }

      if (minPrice !== "" || maxPrice !== "") {
        filtersObject.filters.priceRange = {
          min: minPrice !== "" ? Number(minPrice) : undefined,
          max: maxPrice !== "" ? Number(maxPrice) : undefined,
        };
      }
    }

    // Add sort
    if (sortOption !== ESortOption.None) {
      filtersObject.sort = sortOption;
    }

    return filtersObject;
  }, [
    searchQuery,
    searchByName,
    searchByDescription,
    searchByVendorId,
    steamAvailable,
    instantGamingAvailable,
    minPrice,
    maxPrice,
    sortOption,
  ]);

  // Notify parent of changes
  React.useEffect(() => {
    onFiltersChange(buildFiltersObject());
  }, [buildFiltersObject, onFiltersChange]);

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as ESortOption);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSearchByName(true);
    setSearchByDescription(false);
    setSearchByVendorId(false);
    setSteamAvailable(false);
    setInstantGamingAvailable(false);
    setMinPrice("");
    setMaxPrice("");
    setSortOption(ESortOption.None);
  };

  return (
    <div className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Search and filter</h2>

      <div className="space-y-6">
        {/* Search Section */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Search</h3>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter search request..."
              value={searchQuery}
              onChange={handleSearchQueryChange}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={searchByName}
                onChange={(e) => setSearchByName(e.target.checked)}
                className="w-4 h-4 accent-blue-600 cursor-pointer"
              />
              <span className="text-gray-700 dark:text-gray-300">By name</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={searchByDescription}
                onChange={(e) => setSearchByDescription(e.target.checked)}
                className="w-4 h-4 accent-blue-600 cursor-pointer"
              />
              <span className="text-gray-700 dark:text-gray-300">By description</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={searchByVendorId}
                onChange={(e) => setSearchByVendorId(e.target.checked)}
                className="w-4 h-4 accent-blue-600 cursor-pointer"
              />
              <span className="text-gray-700 dark:text-gray-300">By venodrs id</span>
            </label>
          </div>
        </div>

        {/* Filters Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4">
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Filtering</h3>

          {/* Availability Filter */}
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Available</p>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={steamAvailable}
                  onChange={(e) => setSteamAvailable(e.target.checked)}
                  className="w-4 h-4 accent-blue-600 cursor-pointer"
                />
                <span className="text-gray-700 dark:text-gray-300 text-sm">In Steam</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={instantGamingAvailable}
                  onChange={(e) => setInstantGamingAvailable(e.target.checked)}
                  className="w-4 h-4 accent-blue-600 cursor-pointer"
                />
                <span className="text-gray-700 dark:text-gray-300 text-sm">In IG</span>
              </label>
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price range</p>
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <span className="text-gray-500 dark:text-gray-400">—</span>
              <div className="flex-1">
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sort Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">Sorting</h3>

          <select
            value={sortOption}
            onChange={handleSortChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={ESortOption.None}>No sort</option>
            <option value={ESortOption.SteamPriceAsc}>Steam: price asc</option>
            <option value={ESortOption.SteamPriceDesc}>Steam: price desc</option>
            <option value={ESortOption.InstantGamingPriceAsc}>InstantGaming: price asc</option>
            <option value={ESortOption.InstantGamingPriceDesc}>InstantGaming: price desc</option>
          </select>
        </div>

        {/* Reset Button */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <button
            onClick={handleResetFilters}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium text-sm"
          >
            Clear filters
          </button>
        </div>
      </div>
    </div>
  );
}
