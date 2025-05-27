import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getAllCategories } from "@/components/ui/ProductData";

interface FiltersState {
  // Filtres sélectionnés
  selectedCategories: string[];
  selectedRegions: string[];
  selectedRatings: number[];
  priceRange: [number, number];

  // Actions
  setSelectedCategories: (categories: string[]) => void;
  toggleCategory: (category: string) => void;
  setSelectedRegions: (regions: string[]) => void;
  toggleRegion: (region: string) => void;
  setSelectedRatings: (ratings: number[]) => void;
  toggleRating: (rating: number) => void;
  setPriceRange: (range: [number, number]) => void;
  resetFilters: () => void;
}

export const useFiltersStore = create<FiltersState>()(
  persist(
    (set) => ({
      selectedCategories: [],
      selectedRegions: [],
      selectedRatings: [],
      priceRange: [0, 100],

      setSelectedCategories: (categories) =>
        set({ selectedCategories: categories }),
      toggleCategory: (category) =>
        set((state) => ({
          selectedCategories: state.selectedCategories.includes(category)
            ? state.selectedCategories.filter((c) => c !== category)
            : [...state.selectedCategories, category],
        })),

      setSelectedRegions: (regions) => set({ selectedRegions: regions }),
      toggleRegion: (region) =>
        set((state) => ({
          selectedRegions: state.selectedRegions.includes(region)
            ? state.selectedRegions.filter((r) => r !== region)
            : [...state.selectedRegions, region],
        })),

      setSelectedRatings: (ratings) => set({ selectedRatings: ratings }),
      toggleRating: (rating) =>
        set((state) => ({
          selectedRatings: state.selectedRatings.includes(rating)
            ? state.selectedRatings.filter((r) => r !== rating)
            : [...state.selectedRatings, rating],
        })),

      setPriceRange: (range) => set({ priceRange: range }),

      resetFilters: () =>
        set({
          selectedCategories: [],
          selectedRegions: [],
          selectedRatings: [],
          priceRange: [0, 100],
        }),
    }),
    {
      name: "filters-storage",
    }
  )
);
