declare module "react-microlink" {
  import * as React from "react";

  interface MicrolinkProps extends React.HTMLAttributes<HTMLDivElement> {
    url: string;
    size?: "small" | "large";
    media?: "image" | "logo" | "video";
    [key: string]: any;
  }

  const Microlink: React.FC<MicrolinkProps>;

  export default Microlink;
}
