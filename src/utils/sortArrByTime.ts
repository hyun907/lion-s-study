// createdAt 속성을 기준으로 sort하는 함수
export function sortArrByTime<T extends { createdAt?: { toMillis: () => number } }>(
  arr: T[],
  asc: boolean = true
): T[] {
  return arr.sort((a, b) => {
    const aTime = a.createdAt?.toMillis?.() ?? 0;
    const bTime = b.createdAt?.toMillis?.() ?? 0;
    return asc ? aTime - bTime : bTime - aTime;
  });
}
