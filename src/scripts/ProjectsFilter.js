export default class ProjectsFilter {
  filtersSectionClass = 'portfolio-section__filter';
  filterClass = 'filter__button';
  activeFilterClass = 'filter__button_active';
  projectsSectionClass = 'portfolio__project-list';
  projectContainerClass = 'portfolio__project-container';
  visibleProjectContainerClass = 'portfolio__project-container_visible';

  currentFilter = 'Show All';

  constructor(isoInstance) {
    this.iso = isoInstance;
    this.currentFilterElement = document.querySelector(`[data-filter='${this.currentFilter}']`);
    this.projects = [...document.getElementsByClassName(this.projectContainerClass)];
    [this.projectsSection] = document.getElementsByClassName(this.projectsSectionClass);
  }

  changeFilter = (filterElem, filterName) => {
    this.currentFilterElement.classList.remove(this.activeFilterClass);
    filterElem.classList.add(this.activeFilterClass);

    this.currentFilter = filterName;
    this.currentFilterElement = filterElem;
  };

  filterVisibleProjects = () => {
    this.projects.forEach((pr) => {
      const projectFilters = pr.dataset.filters.split(',');

      if (projectFilters.includes(this.currentFilter) || this.currentFilter === 'Show All') {
        pr.classList.add(this.visibleProjectContainerClass);

        return;
      }

      pr.classList.remove(this.visibleProjectContainerClass);
    });

    this.iso.arrange({ filter: `.${this.visibleProjectContainerClass}` });
  };

  init = () => {
    const [filterSection] = document.getElementsByClassName(this.filtersSectionClass);

    this.currentFilterElement.classList.add(this.activeFilterClass);

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
