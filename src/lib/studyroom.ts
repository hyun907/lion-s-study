import { getDoc, doc, collection } from "firebase/firestore";
import fireStore from "@/firebase/firestore";

// 서버 전용 함수
// 유효한 studyroom인지 확인하기 위함
export async function isValidStudyroomId(id: string): Promise<boolean> {
  const docRef = doc(collection(fireStore, "studyRooms"), id);
  const snap = await getDoc(docRef);
  return snap.exists();
}
