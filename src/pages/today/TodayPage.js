import { Card } from '@components/Card'

export function TodayPage(root) {
  root.innerHTML = '';

  const cards = document.createElement('div')
  cards.className = 'cards-container'
  const rawData = localStorage.getItem('todayDishes')
  const todayDishesList = rawData ? JSON.parse(rawData) : []

  if (todayDishesList.length === 0) {
    const emptyMessage = document.createElement('p')
    emptyMessage.innerText = 'Вы еще не добавили блюда на сегодня.'
    emptyMessage.className = 'empty-message'
    root.append(emptyMessage)
    return
  }

  //отрисовка карточек
  todayDishesList.forEach(dish => {
    const cardElement = Card(dish.name, dish.macros, dish.instanceId, 'today', null)
    cards.append(cardElement)
  })

  root.append(cards)
}
