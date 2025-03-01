import { visit } from "unist-util-visit";
import { h } from "hastscript";

const rehypeSeparator = () => {
  return (tree: any) => {
    visit(tree, "element", (node, index, parent) => {
      if (
        typeof index !== "number" || // Ověříme, že index existuje
        !parent || 
        node.tagName !== "p" || 
        node.children.length !== 1
      ) {
        return;
      }

      const textNode = node.children[0];

      if (textNode.type === "text" && textNode.value.trim() === "***") {
        const fireIcon = h("svg", { width: 24, height: 24, viewBox: "0 0 24 24", "aria-hidden": "true" }, [
          h("path", {
            fill: "orange",
            d: "M12 2C10 6 6 7 6 12c0 3.313 2.687 6 6 6s6-2.687 6-6c0-5-4-6-6-10zM9 12c0 1.657 1.343 3 3 3s3-1.343 3-3c0-2-2-2.5-3-5-1 2.5-3 3-3 5z"
          })
        ]);

        const fireSeparator = h("div", { className: "separator", role: "separator" }, [
          h("span", { className: "hidden-for-screen-readers", "aria-hidden": "false" }, "***"),
          fireIcon,
          fireIcon,
          fireIcon
        ]);

        parent.children[index] = fireSeparator; // ✅ Bezpečné použití indexu
      }
    });
  };
};

export default rehypeSeparator;
