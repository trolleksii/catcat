import '../css/main.scss';
import * as pageBuilder from './pages/pageBuilder';

// Init
// Build main page, set up event listeners for menu items

(() => {
    const main = document.querySelector('.main'),
          menu = document.querySelector('.nav');
    pageBuilder.clearPage(main);
    pageBuilder.buildMain(main);
    document.querySelector('.mobile-nav').addEventListener('click', (event) => {
        event.stopImmediatePropagation();
        menu.classList.toggle('nav-unwrapped');
    });
    document.querySelector('.brand__link').addEventListener('click', (event) => {
        event.preventDefault();
        menu.classList.remove('nav-unwrapped');
        pageBuilder.clearPage(main);
        pageBuilder.buildMain(main);
    });
    document.querySelector('.jsAddBreed').addEventListener('click', (event) => {
        event.preventDefault();
        menu.classList.remove('nav-unwrapped');
        pageBuilder.clearPage(main);
        pageBuilder.buildAddBreed(main);
    });
    document.querySelector('.jsAddImage').addEventListener('click', (event) => {
        event.preventDefault();
        menu.classList.remove('nav-unwrapped');
        pageBuilder.clearPage(main);
        pageBuilder.buildAddCat(main);
    });
})();
