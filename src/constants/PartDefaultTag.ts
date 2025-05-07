export interface TagItem {
  name: string;
  color: string;
}

export interface PartTagGroup {
  [part: string]: TagItem[];
}

export const PartDefaultTags: PartTagGroup = {
  기획: [
    { name: "기획", color: "#ffdd00" },
    { name: "와이어프레임", color: "#542250" }
  ],
  디자인: [
    { name: "Figma", color: "#f24e1e" },
    { name: "UX/UI", color: "#ff8c00" }
  ],
  프론트엔드: [
    { name: "JavaScript", color: "#f7df1e" },
    { name: "TypeScript", color: "#3178c6" }
  ],
  백엔드: [
    { name: "Java", color: "#b07219" },
    { name: "DB", color: "#204420" }
  ]
};
