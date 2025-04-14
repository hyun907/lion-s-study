import { getStorage } from "firebase/storage";
import { firebaseApp } from "./firebasedb";

const storage = getStorage(firebaseApp);

export default storage;
