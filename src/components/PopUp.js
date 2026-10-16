export function PopUp(id = null) {
    const popUp = document.createElement('div');
    const nameCard = document.createElement('input');
    const macrosCard = document.createElement('input');

    const editBtn = document.createElement('button');
    const addBtn = document.createElement('button');

    editBtn.innerText = 'Изменить';
    addBtn.innerText = 'Добавить';

    nameCard.placeholder = "Имя блюда";
    macrosCard.placeholder = "Бжу через запятую";

    popUp.className = 'popUp';
    nameCard.classList.add('inputpPopUp');
    macrosCard.classList.add('inputpPopUp');
    editBtn.className = 'editBtnpopUp';
    addBtn.className = 'addBtnpopUp';

    const getDishesFromStorage = () => {
        const data = localStorage.getItem('dishes');
        return data ? JSON.parse(data) : [];
    };

    let currentDish = null;

    if (id) {
        const dishesList = getDishesFromStorage();
        currentDish = dishesList.find(dish => dish.id === id);

        if (currentDish) {
            nameCard.value = currentDish.name || '';
            macrosCard.value = currentDish.macros || '';
        }
    }

    // Добовляем новое блюдо
    addBtn.onclick = () => {
        const name = nameCard.value.trim();
        const macros = macrosCard.value.trim();

        if (name !== '' && macros !== '') {
            const dishesList = getDishesFromStorage();
            
            const newDish = { 
                id: Math.random().toString(36).substring(2, 11),
                name: name, 
                macros: macros 
            };
            
            dishesList.push(newDish);
            localStorage.setItem('dishes', JSON.stringify(dishesList));
            window.location.reload();
        }
    };

    // Изменяем уже текущие блюдо
    editBtn.onclick = () => {
        const name = nameCard.value.trim();
        const macros = macrosCard.value.trim();

        if (id && name !== '' && macros !== '') {
            const dishesList = getDishesFromStorage(); 
            const dishIndex = dishesList.findIndex(dish => dish.id === id);
            if (dishIndex !== -1) {
                dishesList[dishIndex].name = name;
                dishesList[dishIndex].macros = macros;
                
                localStorage.setItem('dishes', JSON.stringify(dishesList));
                window.location.reload();
            }
        }
    };

    popUp.append(nameCard, macrosCard);
    
    id ? popUp.append(editBtn) : popUp.append(addBtn);

    return popUp;
}
