import { SUB_CONTENT_TYPE } from "@/constants/StudyroomContentType";

export type SubContentType = (typeof SUB_CONTENT_TYPE)[keyof typeof SUB_CONTENT_TYPE];
