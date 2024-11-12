import { create } from "zustand";

interface GalleryQuery {
  skillId?: number;
  disciplineId?: number;
  sortOrder?: string;
  searchText?: string;
}

interface GalleryQueryStore {
  galleryQuery: GalleryQuery;
  setSkillId: (skillId: number) => void;
  setDisciplineId: (disciplineId: number) => void;
  setSearchText: (searchText: string) => void;
  setSortOrder: (sortOrder: string) => void;
}

const useGalleryQueryStore = create<GalleryQueryStore>((set) => ({
  galleryQuery: {},
  setSkillId: (skillId) =>
    set((store) => ({ galleryQuery: { ...store.galleryQuery, skillId } })),
  setDisciplineId: (disciplineId) =>
    set((store) => ({ galleryQuery: { ...store.galleryQuery, disciplineId } })),
  setSearchText: (searchText) => set(() => ({ galleryQuery: { searchText } })),
  setSortOrder: (sortOrder) =>
    set((store) => ({ galleryQuery: { ...store.galleryQuery, sortOrder } })),
}));

export default useGalleryQueryStore;
