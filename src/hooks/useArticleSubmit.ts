import { doc, collection, writeBatch, serverTimestamp, arrayUnion } from "firebase/firestore";
import fireStore from "@/firebase/firestore";
import { useToastStore } from "@/store/useToastStore";
import { useTagHandler } from "./useTagHandler";
import { MicrolinkData } from "@/types/articles/microlink";

export const useArticleSubmit = ({
  uid,
  name,
  year,
  studyRoomId,
  closeModal
}: {
  uid: string;
  name: string;
  year: number;
  studyRoomId: string;
  closeModal: () => void;

  showToast: (type: string) => void;
  setToastType: (type: string) => void;
}) => {
  const { showToast } = useToastStore();
  const { fetchAndPrepareTags } = useTagHandler();

  const submitArticle = async ({
    articleId,
    title,
    markdown,
    link,
    tags,
    imgUrls
  }: {
    articleId?: string;
    title: string;
    markdown: string;
    link: MicrolinkData[];
    tags: string[];
    imgUrls: string[];
  }) => {
    const batch = writeBatch(fireStore);

    const finalTagIds = await fetchAndPrepareTags(tags, batch);

    let articleRef;
    if (articleId) {
      articleRef = doc(fireStore, "studyRooms", studyRoomId, "articles", articleId);
      batch.update(articleRef, {
        title,
        content: markdown,
        updatedAt: serverTimestamp(),
        link: link,
        tags: finalTagIds,
        imgUrls
      });
    } else {
      articleRef = doc(collection(fireStore, "studyRooms", studyRoomId, "articles"));
      batch.set(articleRef, {
        title,
        content: markdown,
        creatorName: name,
        creatorYear: year,
        creatorId: uid,
        createdAt: serverTimestamp(),
        link: link,
        tags: finalTagIds,
        imgUrls
      });
    }

    const userRef = doc(fireStore, "users", uid);
    finalTagIds.forEach(tagId => {
      batch.update(userRef, {
        tags: arrayUnion(tagId)
      });
    });

    await batch.commit();
    showToast(articleId ? "editArticle" : "addArticle");
    closeModal();
  };

  return { submitArticle };
};
