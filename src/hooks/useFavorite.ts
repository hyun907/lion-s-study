import { useUserStore } from "@/store/useUserStore";

export const useFavorite = (studyId: string) => {
  const { toggleFavorite, isFavorite } = useUserStore();

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(studyId);
  };

  return {
    isFavorite: isFavorite(studyId),
    handleToggleFavorite
  };
};
