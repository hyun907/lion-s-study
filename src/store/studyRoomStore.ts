import { create } from "zustand";
import { collection, getDocs } from "firebase/firestore";
import fireStore from "@/firebase/firestore";
import { StudyRoom } from "@/types/studyRooms/studyRoom";

interface StudyRoomState {
  studyRooms: StudyRoom[];
  isLoading: boolean;
  error: Error | null;
  fetchStudyRooms: () => Promise<void>;
}

export const useStudyRoomStore = create<StudyRoomState>(set => ({
  studyRooms: [],
  isLoading: true,
  error: null,
  fetchStudyRooms: async () => {
    set({ isLoading: true, error: null });
    try {
      const querySnapshot = await getDocs(collection(fireStore, "studyRooms"));
      const rooms = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as StudyRoom[];
      set({ studyRooms: rooms, isLoading: false });
    } catch (error) {
      set({ error: error as Error, isLoading: false });
    }
  }
}));
