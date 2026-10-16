export function SearchBar(textPlaceholder, callback) {
    const searchBar = document.createElement('input')
    searchBar.placeholder = textPlaceholder
    searchBar.className = 'searchBar'
    searchBar.oninput = callback
    return searchBar

}
