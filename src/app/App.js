import { createRouter } from './router';
import { TodayPage } from '@pages/today/TodayPage';
import { DishesPage } from '@pages/dishes/DishesPage';
import { StatsPage } from '@pages/stats/StatsPage';

import { GenerateFakeData } from '@utils/GenerateFakeData';

export function App(root) {
  root.innerHTML = `
    <div class="shell">
      <nav class="nav">
        <a data-link class="nav__link" href="#/today">Сегодня</a>
        <a data-link class="nav__link" href="#/dishes">Блюда</a>
        <a data-link class="nav__link" href="#/stats">Статистика</a>
      </nav>
      <main class="content" id="outlet"></main>
    </div>`;

  createRouter(
    {
      '/today': TodayPage,
      '/dishes': DishesPage,
      '/stats': StatsPage,
    },
    root.querySelector('#outlet'),
  );
  GenerateFakeData()
}
