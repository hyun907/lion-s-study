export const useDraftLoader = () => {
  const loadDraft = () => {
    return {
      title: localStorage.getItem("draft-title") || "",
      markdown: localStorage.getItem("draft-markdown") || "",
      link: localStorage.getItem("draft-link") || "",
      tags: localStorage.getItem("draft-tags") || "",
      files: localStorage.getItem("draft-files") || "[]"
    };
  };

  const clearDraft = () => {
    localStorage.removeItem("draft-title");
    localStorage.removeItem("draft-markdown");
    localStorage.removeItem("draft-link");
    localStorage.removeItem("draft-tags");
    localStorage.removeItem("draft-modal-tags");
    localStorage.removeItem("draft-files");
  };

  return { loadDraft, clearDraft };
};
