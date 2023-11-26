// Zustand
import { create } from "zustand";

// Firebase
import auth from "@firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

const useAuthStore = create((set) => ({
  user: null,
  register: async (email, password, name) =>
    await createUserWithEmailAndPassword(auth, email, password),
  login: async (email, password) =>
    await signInWithEmailAndPassword(auth, email, password),
  logout: () => signOut(auth),
  updateUser: (user) => set({ user: user }),
  updateName: async (name) => {
    const newUser = { ...auth.currentUser };
    newUser.displayName = name;
    await updateProfile(auth.currentUser, {
      displayName: name,
    });
    set({ user: newUser });
  },
}));

export default useAuthStore;
