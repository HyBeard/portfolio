import Isotope from 'isotope-layout';

import listenImagesLoading from './utils/listenImagesLoading';

export default class ProjectsFilter {
  filtersSectionClass = 'portfolio-section__filter';
  filterClass = 'filter__button';
  activeFilterClass = 'filter__button_active';
  projectsSectionClass = 'portfolio__project-list';
  projectContainerClass = 'portfolio__project-container';
  projectContainerClass = 'portfolio__project-container';
  projectImageClass = 'project__screen';

  currentFilter = 'Show All';

  constructor() {
    this.currentFilterElement = document.querySelector(`[data-filter='${this.currentFilter}']`);
    this.projects = [...document.getElementsByClassName(this.projectContainerClass)];
    [this.projectsSection] = document.getElementsByClassName(this.projectsSectionClass);
    this.iso = new Isotope(`.${this.projectsSectionClass}`, {
      itemSelector: `.${this.projectContainerClass}`,
      percentPosition: true,
    });
  }

  changeFilter = (filterElem, filterName) => {
    this.currentFilterElement.classList.remove(this.activeFilterClass);
    filterElem.classList.add(this.activeFilterClass);

    this.currentFilter = filterName;
    this.currentFilterElement = filterElem;
  };

  filterVisibleProjects = () => {
    this.iso.arrange({
      filter: (itemElem) => {
        const projectFilters = itemElem.dataset.filters.split(',');

        return projectFilters.includes(this.currentFilter) || this.currentFilter === 'Show All';
      },
    });
  };

  init = () => {
    const [filterSection] = document.getElementsByClassName(this.filtersSectionClass);
    const images = [...document.getElementsByClassName(this.projectImageClass)];

    this.currentFilterElement.classList.add(this.activeFilterClass);
    listenImagesLoading(images, this.filterVisibleProjects);

    filterSection.addEventListener('click', ({ target }) => {
      const filterElem = target.closest(`.${this.filterClass}`);

      if (!filterElem) {
        return;
      }

      const filterName = filterElem.dataset.filter;

      this.changeFilter(filterElem, filterName);
      this.filterVisibleProjects();
    });
  };
}
