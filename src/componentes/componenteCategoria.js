const componenteCategoria = ({ categories, onSelectCategory }) => {
  return `
    <label for="category-select">Escolha uma categoria:</label>
    <select id="category-select">
      <option value="">Todas as categorias</option>
      ${categories.map(category => `<option value="${category}">${category}</option>`).join('')}
    </select>
  `;
};

export default componenteCategoria;


  