import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';

export default function remarkRemoveImages() {
  return (tree: Root) => {
    visit(tree, 'image', (node, index, parent) => {
      if (parent && typeof index === 'number') {
        if (node.alt) {
          // Pokud má obrázek alternativní text, nahradíme ho pouze tímto textem
          parent.children.splice(index, 1, { type: 'text', value: node.alt });
        } else {
          // Jinak obrázek úplně odstraníme
          parent.children.splice(index, 1);
        }
      }
    });
  };
}
