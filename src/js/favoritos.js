
/**
 * Coloca o array dentro dos favoritos
 * @param {string[]} arr 
 * @returns 
 */
const setFavorito = arr => localStorage.setItem('favoritos', JSON.stringify(arr))

/**
 * Retorna lista de IDs dos produtos favoritos
 * @returns {string[]}
 */
const visualizarFavorito = () => {
    return JSON.parse(localStorage.getItem('favoritos')) || []
}

/**
 * Adiciona um novo favorito. Adicionado no localStorage
 * @param {string} id 
 */
const adicionarFavorito = (id) => {
    /**
     * @type {string[]}
     */
    const favoritos = visualizarFavorito()
    
    if(favoritos.includes(id)) return

    favoritos.push(id)

    setFavorito(favoritos)
}

/**
 * Remove o produto dos favoritos caso ele exista
 * @param {string} id 
 */
const removerFavorito = (id) => {
    const favoritos = visualizarFavorito()

    if(!favoritos.includes(id)) return

    console.log('remove before: ', favoritos)
    favoritos.splice(favoritos.indexOf(id), 1)
    console.log('remove after: ', favoritos)

    setFavorito(favoritos)
}


