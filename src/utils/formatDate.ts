// 파이어베이스 타임스탬프를 YY.MM.DD로 변환하는 함수
export const formatDate = (timestamp: any) => {
  if (!timestamp) return "";
  const date = new Date(timestamp.seconds * 1000);
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}.${month}.${day}`;
};
