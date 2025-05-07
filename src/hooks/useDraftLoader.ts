export const useDraftLoader = () => {
  const loadDraft = () => {
    return {
      title: localStorage.getItem("draft-title") || "",
      markdown: localStorage.getItem("draft-markdown") || "",
      link: localStorage.getItem("draft-link") || "",
      tags: localStorage.getItem("draft-tags") || ""
    };
  };

  const clearDraft = () => {
    localStorage.removeItem("draft-title");
    localStorage.removeItem("draft-markdown");
    localStorage.removeItem("draft-link");
    localStorage.removeItem("draft-tags");
    localStorage.removeItem("draft-modal-tags");
  };

  return { loadDraft, clearDraft };
};
