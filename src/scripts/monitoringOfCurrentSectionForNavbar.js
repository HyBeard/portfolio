const changeActiveNavLink = (entries) => {
  const activeClass = 'navbar__item_active';

  entries.forEach(({ isIntersecting, target }) => {
    if (isIntersecting) {
      const currentlyActive = document.querySelector('.navbar__item_active');
      const shouldBeActive = document.querySelector(`[data-ref=${target.id}]`);

      if (currentlyActive) {
        currentlyActive.classList.remove(activeClass);
      }

      if (shouldBeActive) {
        shouldBeActive.classList.add(activeClass);
      }
    }
  });
};

export default function monitoringOfCurrentSectionForNavbar() {
  const config = {
    rootMargin: '-45% 0px -55% 0px',
  };

  const observer = new IntersectionObserver(changeActiveNavLink, config);
  const anchorSections = [...document.getElementsByClassName('main-section')];

  anchorSections.forEach((anchor) => observer.observe(anchor));
}
