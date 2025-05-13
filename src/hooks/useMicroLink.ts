import { useState, useEffect } from "react";

interface LinkData {
  title: string;
  url: string;
  image?: {
    url: string;
  };
}

export function useMicrolink(urls: string[]) {
  const [linkPreviews, setLinkPreviews] = useState<LinkData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLinkData = async () => {
      setLoading(true);
      const previews: LinkData[] = [];

      for (const url of urls) {
        try {
          const res = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
          const json = await res.json();
          if (json.status === "success") {
            const { title, url: realUrl, image } = json.data;
            previews.push({ title, url: realUrl, image });
          }
        } catch (err) {
          setError(`Error fetching preview for ${url}`);
          console.error(`❌ Error fetching preview for ${url}:`, err);
        }
      }

      setLinkPreviews(previews);
      setLoading(false);
    };

    if (urls.length > 0) {
      fetchLinkData();
    } else {
      setLoading(false);
    }
  }, [urls]);

  return { linkPreviews, loading, error };
}
