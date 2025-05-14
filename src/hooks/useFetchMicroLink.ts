import { MicrolinkData } from "@/types/articles/microlink";

export const useFetchMicroLink = async (url: string): Promise<MicrolinkData | null> => {
  try {
    const res = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
    const json = await res.json();
    if (json.status === "success") {
      const { title, url: realUrl, image } = json.data;
      return { title, url: realUrl, image };
    }
    return null;
  } catch (err) {
    console.error(`❌ Error fetching preview for ${url}:`, err);
    return null;
  }
};
