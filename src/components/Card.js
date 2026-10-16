//Карточка блюд
export function Card(nameCard, macrosCard, id, page, onEdit) {
    const card = document.createElement('div')
    const name = document.createElement('span')
    const macros = document.createElement('span')
    const add = document.createElement('button')
    const remove = document.createElement('button')
    const edit = document.createElement('button')

    card.className = 'Card'
    name.className = 'textCard'
    macros.className = 'textCard'

    add.className = 'CardBtn'
    remove.className = 'CardBtn'
    edit.className = 'CardBtn'

    name.innerText = nameCard
    macros.innerText = 'БЖУ: ' + macrosCard

    add.innerText = 'Добавить'
    remove.innerText = 'Удалить'
    edit.innerText = 'Изменить'

    const parseMacrosStr = (str) => {
        const parts = str.split(',').map(num => parseFloat(num.trim()) || 0);
        return {
            protein: parts[0] || 0,
            fat: parts[1] || 0,
            carbs: parts[2] || 0
        };
    };

    edit.onclick = () => {
        onEdit(id)
    };

    // Логика добовления блюда в сегодняшнее
    add.onclick = () => {
        const todayKey = new Date().toISOString().split('T')[0];
        const itemMacros = parseMacrosStr(macrosCard);
        const todayList = JSON.parse(localStorage.getItem('todayDishes')) || [];
        const todayDish = {
            instanceId: Math.random().toString(36).substring(2, 11),
            dishId: id,
            name: nameCard,
            macros: macrosCard
        };
        todayList.push(todayDish);
        localStorage.setItem('todayDishes', JSON.stringify(todayList));
        const history = JSON.parse(localStorage.getItem('dishesHistory')) || {};
        if (!history[todayKey]) {
            history[todayKey] = { protein: 0, fat: 0, carbs: 0 };
        }
        history[todayKey].protein += itemMacros.protein;
        history[todayKey].fat += itemMacros.fat;
        history[todayKey].carbs += itemMacros.carbs;

        localStorage.setItem('dishesHistory', JSON.stringify(history));
        console.log(`Добавлено БЖУ за сегодня:`, history[todayKey]);
    };

    // Логика удаления блюда из сегодняшнего
    remove.onclick = () => {
        const todayKey = new Date().toISOString().split('T')[0];
        const itemMacros = parseMacrosStr(macrosCard);
        const todayList = JSON.parse(localStorage.getItem('todayDishes')) || [];
        const updatedList = todayList.filter(dish => dish.instanceId !== id);
        localStorage.setItem('todayDishes', JSON.stringify(updatedList));
        const history = JSON.parse(localStorage.getItem('dishesHistory')) || {};
        if (history[todayKey]) {
            history[todayKey].protein = Math.max(0, history[todayKey].protein - itemMacros.protein);
            history[todayKey].fat = Math.max(0, history[todayKey].fat - itemMacros.fat);
            history[todayKey].carbs = Math.max(0, history[todayKey].carbs - itemMacros.carbs);
            localStorage.setItem('dishesHistory', JSON.stringify(history));
        }

        window.location.reload();
    };

    card.append(name, macros, edit)
    page === 'dishes' ? card.append(add) : card.append(remove);

    return card;
}
