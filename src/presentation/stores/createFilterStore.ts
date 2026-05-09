import { create } from 'zustand';

type FilterState<TFilters> = {
  filters: TFilters;
};

type FilterActions<TFilters> = {
  setFilter: <K extends keyof TFilters>(key: K, value: TFilters[K]) => void;
  setFilters: (filters: Partial<TFilters>) => void;
  resetFilters: (initialFilters: TFilters) => void;
};

export const createFilterStore = <TFilters>(initialFilters: TFilters) => {
  type FilterStore = FilterState<TFilters> & FilterActions<TFilters>;

  return create<FilterStore>((set) => ({
    filters: initialFilters,

    setFilter: <K extends keyof TFilters>(key: K, value: TFilters[K]) => {
      set((state) => ({
        filters: { ...state.filters, [key]: value },
      }));
    },

    setFilters: (filters: Partial<TFilters>) => {
      set((state) => ({
        filters: { ...state.filters, ...filters },
      }));
    },

    resetFilters: (initialFilters: TFilters) => {
      set({ filters: initialFilters });
    },
  }));
};
