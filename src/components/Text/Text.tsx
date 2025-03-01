import rehypeSeparator from "@plugins/rehype/rehypeSeparator";
import remarkCzechTypo from "@plugins/remark/remarkCzechTypo ";
import React, { HTMLAttributes } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

type TextProps = HTMLAttributes<HTMLDivElement> & {
  children: string;
  type?: string; // Výchozí typ je "fire"
};

const Text: React.FC<TextProps> = ({ children, type = "fire", className = "", ...props }) => {
  return (
    <div className={`formatted-markdown formatted-markdown--${type} ${className}`} {...props}>
      <ReactMarkdown remarkPlugins={[remarkCzechTypo]} rehypePlugins={[rehypeRaw, rehypeSeparator]}>
        {children}
      </ReactMarkdown>
    </div>
  );
};

export default Text;
