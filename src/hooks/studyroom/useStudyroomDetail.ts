"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import fireStore from "@/firebase/firestore";
import { StudyRoom } from "@/types/studyRooms/studyRoom";

export function useStudyroomDetail(studyroomId: string) {
  const [studyroom, setStudyroom] = useState<StudyRoom | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!studyroomId) return;

    const fetchStudyroom = async () => {
      try {
        const ref = doc(fireStore, "studyRooms", studyroomId);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setStudyroom({ id: snap.id, ...(snap.data() as Omit<StudyRoom, "id">) });
        } else {
          setStudyroom(null);
        }
      } catch (err: any) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudyroom();
  }, [studyroomId]);

  return { studyroom, loading, error };
}
