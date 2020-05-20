import monitoringOfCurrentSectionForNavbar from './scripts/monitoringOfCurrentSectionForNavbar';
import ProjectsFilter from './scripts/ProjectsFilter';

import './styles/index.scss';

document.addEventListener('DOMContentLoaded', () => {
  const projectsFilter = new ProjectsFilter();

  projectsFilter.init();
  monitoringOfCurrentSectionForNavbar();
});
