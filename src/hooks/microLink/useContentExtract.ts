export const useContentExtract = () => {
  // 공통 마크다운 링크 추출 후 구분
  const extractLinks = (markdown: string): string[] => {
    const regex = /(!?\[.*?\])\((https?:\/\/[^\s)]+)\)/g;
    const links: string[] = [];
    let match;

    while ((match = regex.exec(markdown)) !== null) {
      const isImage = match[1].startsWith("!");
      if (!isImage) {
        links.push(match[2]); // 일반 링크만 추출
      }
    }

    return links;
  };

  const extractImageUrls = (markdown: string): string[] => {
    const regex = /(!?\[.*?\])\((https?:\/\/[^\s)]+)\)/g;
    const images: string[] = [];
    let match;

    while ((match = regex.exec(markdown)) !== null) {
      const isImage = match[1].startsWith("!");
      if (isImage) {
        images.push(match[2]); // 이미지 링크만 추출
      }
    }

    return images;
  };

  return { extractLinks, extractImageUrls };
};
