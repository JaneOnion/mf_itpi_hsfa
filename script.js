document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('open');
            
            // Простая анимация иконки бургера (опционально)
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
});

// Логика версии для слабовидящих
const a11yBtn = document.getElementById('a11yBtn');
if (a11yBtn) {
    a11yBtn.addEventListener('click', () => {
        document.body.classList.toggle('a11y-mode');
    });
}