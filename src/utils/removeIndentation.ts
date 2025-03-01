export const removeIndentation = (text: string) => {
    const lines = text.split("\n");
  
    // Najdeme nejmenší počet počátečních mezer (kromě prázdných řádků)
    const minIndent = lines
      .filter((line) => line.trim() !== "") // Ignorujeme prázdné řádky
      .reduce((min, line) => {
        const match = line.match(/^(\s*)/);
        const leadingSpaces = match ? match[0].length : 0; // Ověření, zda není `null`
        return Math.min(min, leadingSpaces);
      }, Infinity);
  
    // Odstraníme nalezený počet mezer/tabulátorů z každého řádku
    return lines.map((line) => line.slice(minIndent)).join("\n").trim();
  };
  