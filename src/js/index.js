import '../css/main.scss';
import * as pageBuilder from './pages/pageBuilder';

// Init
// Build main page, set up event listeners for menu items

(() => {
    const menu = document.querySelector('.nav')
    document.querySelector('.mobile-nav').addEventListener('click', () => {
        menu.classList.toggle('nav-unwrapped');
    });
    const root = document.querySelector('.main');
    pageBuilder.buildMain(root);
    document.querySelector('.brand__link').addEventListener('click', (event) => {
        event.preventDefault();
        menu.classList.remove('nav-unwrapped');
        pageBuilder.clearPage(root);
        pageBuilder.buildMain(root);
    });
    document.querySelector('.jsAddBreed').addEventListener('click', (event) => {
        event.preventDefault();
        menu.classList.remove('nav-unwrapped');
        pageBuilder.clearPage(root);
        pageBuilder.buildAddBreed(root);
    });
    document.querySelector('.jsAddImage').addEventListener('click', (event) => {
        event.preventDefault();
        menu.classList.remove('nav-unwrapped');
        pageBuilder.clearPage(root);
        pageBuilder.buildAddCat(root);
    });
})();
