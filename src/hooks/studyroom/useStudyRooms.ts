import { useStudyRoomStore } from "@/store/studyRoomStore";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";
import { sortArrByTime } from "@/utils/sortArrByTime";

/**
 * 스터디룸 데이터를 관리하는 커스텀 훅
 *
 * @returns {Object} 스터디룸 관련 데이터와 상태
 * @property {Array} studyRooms - 즐겨찾기 순으로 정렬된 스터디룸 목록
 * @property {boolean} isLoading - 데이터 로딩 상태
 */

export const useStudyRooms = () => {
  // 스터디룸 스토어에서 데이터와 상태 관리 함수 가져오기
  const { studyRooms, isLoading, fetchStudyRooms } = useStudyRoomStore();
  // 사용자의 즐겨찾기 상태 확인 함수 가져오기
  const { isFavorite } = useUserStore();

  // 컴포넌트 마운트 시 스터디룸 데이터 가져오기
  useEffect(() => {
    fetchStudyRooms();
  }, [fetchStudyRooms]);

  // 즐겨찾기된 스터디룸과 즐겨찾기되지 않은 스터디룸 분리
  const favoriteRooms = studyRooms.filter(room => isFavorite(room.id));
  const nonFavoriteRooms = studyRooms.filter(room => !isFavorite(room.id));

  // 각 그룹을 시간순으로 정렬 (최신순)
  const sortedFavoriteRooms = sortArrByTime(favoriteRooms, false);
  const sortedNonFavoriteRooms = sortArrByTime(nonFavoriteRooms, false);

  // 즐겨찾기된 스터디룸을 먼저 배치하고, 그 다음에 일반 스터디룸 배치
  const sortedStudyRooms = [...sortedFavoriteRooms, ...sortedNonFavoriteRooms];

  return {
    studyRooms: sortedStudyRooms,
    isLoading
  };
};
