// FUNCTIONS
import setThemeForm from '../../common_blocks/form/__theme/form__theme';
import { doBackgroundUsual } from '../../common_blocks/scripts/backgroundOpacityChange';

// IMAGES
import sun from '../../utils/images/sun.png';
import moon from '../../utils/images/moon.png';

// Установливает тему при загрузке + контролирует изменения чекбокса -> меняет тему в процессе работы
const setTheme = (trigger, light_img, dark_img) => {
    const startTheme = localStorage.getItem('theme'),
          img = document.querySelector(`.${trigger} > div > img`),
          trig = document.querySelector(`.${trigger}`);

    // Устанавливает иконку в зависимости от темы
    const setImg = (theme) => {
        img.src = theme === 'light'? light_img : dark_img;
    }
    // Наблюдает за изменением атрибута data-theme, при изменении устанавливает иконку темы
    const watchForThemeChange = () => {
        let observer = new MutationObserver(changes => {
            setImg(document.documentElement.getAttribute('data-theme'));
        });
        observer.observe(document.documentElement, {
            attributes: true
        });
    };

    watchForThemeChange();
    // Стартовая иконка и тема
    document.documentElement.setAttribute('data-theme', startTheme);
    // По клику триггер проверяет состояние чекбокса -> меняет тему и иконку в зависимости от него
    trig.addEventListener('change', function(e) {
        let tl = gsap.timeline();
        if (e.target.checked) {
            tl
            .to('body', { duration: 1, backgroundColor: '#222831', opacity: 0 })
            .to('html', { duration: .1, attr: { 'data-theme': 'dark' }})
            .to('body', { duration: .5, opacity: 1 })
            // document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            tl
            .to('body', { duration: 1, backgroundColor: '#eaeaea', opacity: 0 })
            .to('html', { duration: .1, attr: { 'data-theme': 'light' }})
            .to('body', { duration: .5, opacity: 1 })        }
    });
    // По клику на ПКМ открывается контекстное меню
    trig.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const changeDefault = document.createElement('div');
        changeDefault.classList.add('context-menu');
        changeDefault.innerHTML = `
            <div class="context-menu_row">
                <h1>Change default theme</h1>
            </div>
        `;
        document.querySelector('.header__block_switcher').append(changeDefault);
        // При выборе настройки дефолтной темы открывается форма выбора темы и удаляется контекстное меню
        const setting = document.querySelector('.context-menu_row');
        setting.addEventListener('click', function() {
            setThemeForm(true);
            changeDefault.remove();
        })
        // Если нажать не на контекстное меню, оно удаляется
        window.addEventListener('click', function(event) {
            if (!event.target.classList.contains('context-menu')) {
                changeDefault.remove();
            } 
        });
    });
}

setTheme('input__type_checkbox-label', sun, moon);

export default setTheme;