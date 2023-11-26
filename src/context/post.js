// Zustand
import { create } from "zustand";

const usePostStore = create((set) => ({
  postBody: null,
  updateBody: (body) => set({ postBody: body }),
}));

export default usePostStore;
