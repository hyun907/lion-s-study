"use client";

import fireStore from "@/firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

import AddBtn from "./AddBtn";
import StudyBtn from "./StudyBtn";

import { formatDate } from "@/utils/formatDate";
import { StudyRoom } from "@/types/studyRooms/studyRoom";

import styles from "./StudySection.module.css";

export default function StudySection() {
  const [studyRooms, setStudyRooms] = useState<StudyRoom[]>([]);

  useEffect(() => {
    const fetchStudyRooms = async () => {
      try {
        const querySnapshot = await getDocs(collection(fireStore, "studyRooms"));
        const rooms = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as StudyRoom[];
        setStudyRooms(rooms);
      } catch (error) {
        console.error("Error fetching study rooms:", error);
      }
    };

    fetchStudyRooms();
  }, []);

  return (
    <div className={styles.studySection}>
      <AddBtn />
      {studyRooms.map(room => (
        <StudyBtn
          key={room.id}
          title={room.title}
          creatorName={room.creatorName}
          creatorYear={room.creatorYear}
          updatedAt={formatDate(room.updatedAt)}
        />
      ))}
    </div>
  );
}
