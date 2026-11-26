document.addEventListener('DOMContentLoaded', () => {
    // --- Бургер-меню ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('open');
            
            const spans = burger.querySelectorAll('span');
            if (nav.classList.contains('open')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // --- Логика версии для слабовидящих ---
    const a11yToggleBtn = document.getElementById('a11yToggleBtn');
    const a11yPanel = document.getElementById('a11yPanel');
    const a11yResetBtn = document.getElementById('a11yResetBtn');

    // 1. Открытие/закрытие панели
    if (a11yToggleBtn && a11yPanel) {
        a11yToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            a11yPanel.classList.toggle('is-open');
        });

        // Закрыть панель при клике вне её
        document.addEventListener('click', (e) => {
            if (!a11yToggleBtn.contains(e.target) && !a11yPanel.contains(e.target)) {
                a11yPanel.classList.remove('is-open');
            }
        });
    }

    // 2. Применение настроек
    function applyA11ySettings() {
        const savedSize = localStorage.getItem('a11y-size') || 'normal';
        const savedColor = localStorage.getItem('a11y-color') || 'default';

        // Сбрасываем старые классы
        document.body.classList.remove('a11y-size-large', 'a11y-size-xlarge', 'a11y-color-black-white', 'a11y-color-white-black');

        // Применяем размер
        if (savedSize === 'large') document.body.classList.add('a11y-size-large');
        if (savedSize === 'xlarge') document.body.classList.add('a11y-size-xlarge');

        // Применяем цвет
        if (savedColor === 'black-white') document.body.classList.add('a11y-color-black-white');
        if (savedColor === 'white-black') document.body.classList.add('a11y-color-white-black');

        // Обновляем активные кнопки в панели
        document.querySelectorAll('.a11y-option').forEach(btn => {
            btn.classList.remove('is-active');
            if (btn.dataset.size === savedSize || btn.dataset.color === savedColor) {
                btn.classList.add('is-active');
            }
        });
    }

    // 3. Обработчики кликов по кнопкам настроек
    document.querySelectorAll('.a11y-option').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.dataset.size) {
                localStorage.setItem('a11y-size', btn.dataset.size);
            }
            if (btn.dataset.color) {
                localStorage.setItem('a11y-color', btn.dataset.color);
            }
            applyA11ySettings();
        });
    });

    // 4. Кнопка сброса
    if (a11yResetBtn) {
        a11yResetBtn.addEventListener('click', () => {
            localStorage.removeItem('a11y-size');
            localStorage.removeItem('a11y-color');
            applyA11ySettings();
        });
    }

    // 5. Инициализация при загрузке страницы
    applyA11ySettings();
});
// 5. Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', applyA11ySettings);
