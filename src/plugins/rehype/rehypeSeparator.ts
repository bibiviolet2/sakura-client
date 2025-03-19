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

      if (textNode.type === "text" && (textNode.value.trim() === "***" || textNode.value.trim() === "AAA")) {
        const fireIcon = h("svg", { 
          width: 24, height: 24, viewBox: "0 0 16 16", "aria-hidden": "true",
          stroke: "currentColor", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg"
        }, [
          h("path", {
            d: "M5.016 16c-1.066-2.219-0.498-3.49 0.321-4.688 0.897-1.312 1.129-2.61 1.129-2.61s0.706 0.917 0.423 2.352c1.246-1.387 1.482-3.598 1.293-4.445 2.817 1.969 4.021 6.232 2.399 9.392 8.631-4.883 2.147-12.19 1.018-13.013 0.376 0.823 0.448 2.216-0.313 2.893-1.287-4.879-4.468-5.879-4.468-5.879 0.376 2.516-1.364 5.268-3.042 7.324-0.059-1.003-0.122-1.696-0.649-2.656-0.118 1.823-1.511 3.309-1.889 5.135-0.511 2.473 0.383 4.284 3.777 6.197z"
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
