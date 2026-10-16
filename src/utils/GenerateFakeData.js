export function GenerateFakeData() {
    const history = {};
    const today = new Date();
    for (let i = 7; i >= 1; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        history[dateStr] = {
            protein: Math.floor(Math.random() * (120 - 70 + 1)) + 70,
            fat: Math.floor(Math.random() * (90 - 50 + 1)) + 50,
            carbs: Math.floor(Math.random() * (250 - 150 + 1)) + 150 
        };
    }

    localStorage.setItem('dishesHistory', JSON.stringify(history));
}


