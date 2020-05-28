const burgerMenu = document.querySelector('.navigation-row__hamburger');
const navbar = document.querySelector('.navbar');

export default function addListenersToNavbar() {
  let navbarIsExpanded = false;

  const toggleNavbarExpand = () => {
    burgerMenu.classList.toggle('is-active');
    navbar.classList.toggle('navigation-row__navbar_expanded');
    navbarIsExpanded = true;
  };

  const collapseNavbarIfIsLinkClicked = ({ target }) => {
    if (!navbarIsExpanded || !target.closest('a')) {
      return;
    }

    toggleNavbarExpand();
    navbarIsExpanded = false;
  };

  burgerMenu.addEventListener('click', toggleNavbarExpand);
  navbar.addEventListener('click', collapseNavbarIfIsLinkClicked);
}
