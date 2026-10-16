export function StatsPage(root) {
    const filters = document.createElement('div');
    filters.className = 'stats-filters';

    const labelFrom = document.createElement('label');
    labelFrom.innerText = 'От: ';
    const inputFrom = document.createElement('input');
    inputFrom.type = 'date';

    const labelTo = document.createElement('label');
    labelTo.innerText = ' До: ';
    const inputTo = document.createElement('input');
    inputTo.type = 'date';

    const today = new Date();
    const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    inputTo.value = today.toISOString().split('T')[0];
    inputFrom.value = lastWeek.toISOString().split('T')[0];

    labelFrom.append(inputFrom);
    labelTo.append(inputTo);
    filters.append(labelFrom, labelTo);
    root.append(filters);

    const chartContainer = document.createElement('div');
    chartContainer.className = 'chart-container';
    root.append(chartContainer);


    const renderChart = () => {
        chartContainer.innerHTML = '';

        const dateFrom = new Date(inputFrom.value);
        const dateTo = new Date(inputTo.value);
        
        const historyData = JSON.parse(localStorage.getItem('dishesHistory')) || {};
        
        let hasData = false;

      
        for (let d = new Date(dateFrom); d <= dateTo; d.setDate(d.getDate() + 1)) {
            const dateStr = d.toISOString().split('T')[0];
            const historyData = JSON.parse(localStorage.getItem('dishesHistory')) || {};
            const dayData = historyData[dateStr] || { protein: 0, fat: 0, carbs: 0 };

            if (historyData[dateStr]) hasData = true;

            const dayBarContainer = document.createElement('div');
            dayBarContainer.className = 'chart-day-column';

            const pBar = document.createElement('div');
            pBar.className = 'bar bar-protein';
            pBar.style.height = `${Math.min(dayData.protein, 200)}px`; 
            pBar.title = `Белки: ${dayData.protein}г`;

            const fBar = document.createElement('div');
            fBar.className = 'bar bar-fat';
            fBar.style.height = `${Math.min(dayData.fat, 200)}px`;
            fBar.title = `Жиры: ${dayData.fat}г`;

            const cBar = document.createElement('div');
            cBar.className = 'bar bar-carbs';
            cBar.style.height = `${Math.min(dayData.carbs, 200)}px`;
            cBar.title = `Углеводы: ${dayData.carbs}г`;

            const dateLabel = document.createElement('span');
            dateLabel.className = 'chart-date-label';
            dateLabel.innerText = d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });

            const barsGroup = document.createElement('div');
            barsGroup.className = 'bars-group';
            barsGroup.append(pBar, fBar, cBar);

            dayBarContainer.append(barsGroup, dateLabel);
            chartContainer.append(dayBarContainer);
        }
        if (!hasData) {
            chartContainer.innerHTML = '<p class="no-data-msg">Нет данных за выбранный период.</p>';
        }
    };

    inputFrom.onchange = renderChart;
    inputTo.onchange = renderChart;
    renderChart();
}
