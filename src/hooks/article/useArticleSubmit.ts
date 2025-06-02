import { doc, collection, writeBatch, serverTimestamp, arrayUnion } from "firebase/firestore";
import fireStore from "@/firebase/firestore";
import { useTagHandler } from "@/hooks/ui";
import { MicrolinkData } from "@/types/articles/microlink";

export const useArticleSubmit = ({
  uid,
  name,
  year,
  studyRoomId,
  closeModal,
  showToast,
  setToastType
}: {
  uid: string;
  name: string;
  year: number;
  studyRoomId: string;
  closeModal: () => void;

  showToast: (type: string) => void;
  setToastType: (type: string) => void;
}) => {
  const { fetchAndPrepareTags } = useTagHandler();

  const submitArticle = async ({
    articleId,
    title,
    markdown,
    link,
    tags,
    imgUrls,
    files
  }: {
    articleId?: string;
    title: string;
    markdown: string;
    link: MicrolinkData[];
    tags: string[];
    imgUrls: string[];
    files: string[];
  }): Promise<string> => {
    const batch = writeBatch(fireStore);

    const finalTagIds = await fetchAndPrepareTags(tags, batch);

    let articleRef;
    let newArticleId = articleId;

    if (articleId) {
      articleRef = doc(fireStore, "studyRooms", studyRoomId, "articles", articleId);
      batch.update(articleRef, {
        title,
        content: markdown,
        updatedAt: serverTimestamp(),
        link,
        tags: finalTagIds,
        imgUrls,
        files
      });
    } else {
      articleRef = doc(collection(fireStore, "studyRooms", studyRoomId, "articles"));
      newArticleId = articleRef.id;
      batch.set(articleRef, {
        title,
        content: markdown,
        creatorName: name,
        creatorYear: year,
        creatorId: uid,
        createdAt: serverTimestamp(),
        link,
        tags: finalTagIds,
        imgUrls,
        files
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

    return newArticleId!;
  };

  return { submitArticle };
};
