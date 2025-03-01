import { visit } from 'unist-util-visit';

const remarkCzechTypo = () => {
  return (tree: any) => {
    visit(tree, 'text', (node) => {
      // Regulární výraz pro jednopísmenné předložky a spojky
      const regex = /\b([ksvzouaiKSVZOUAI])\s+/g;
      // Nahrazení mezery pevnou mezerou
      node.value = node.value.replace(regex, '$1\u00A0');
    });
  };
};

export default remarkCzechTypo;
