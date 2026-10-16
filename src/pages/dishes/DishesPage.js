import { Card } from '@components/Card'
import { SearchBar } from '@components/SearchBar'
import { PopUp } from '@components/PopUp'
import { BtnBig } from '@components/BtnBig'

export function DishesPage(root) {
  //логика открытие попапа
  const openPopUp = (id = null) => {
    const oldPopUp = document.querySelector('.popUp')
    if (oldPopUp) oldPopUp.remove()
    root.prepend(PopUp(id))
  }
  const handleEdit = (id) => openPopUp(id)
  const addDishBtn = BtnBig('Добавить блюда', () => openPopUp())
  root.append(addDishBtn)

  //отрисовка карточек
  const cards = document.createElement('div')
  cards.className = 'cards-container' 
  const rawData = localStorage.getItem('dishes')
  const dishesList = rawData ? JSON.parse(rawData) : []
  const renderCards = (filteredList) => {
    cards.innerHTML = ''
    filteredList.forEach(dish => {
      const cardElement = Card(dish.name, dish.macros, dish.id, 'dishes', handleEdit)
      cards.append(cardElement)
    })
  }

  //фильтрация карточек по поисковой строке
  const filterDishes = (event) => {
    const query = event.target.value.toLowerCase().trim()
    const filteredDishes = dishesList.filter(dish => 
      dish.name.toLowerCase().includes(query)
    )
    renderCards(filteredDishes)
  }
  const SearchInput = SearchBar('Введите блюдо',filterDishes)
  root.append(SearchInput)


  renderCards(dishesList)
  root.append(cards)
}

