import monitoringOfCurrentSectionForNavbar from './scripts/monitoringOfCurrentSectionForNavbar';
import ProjectsFilter from './scripts/ProjectsFilter';
import addListenersToNavbar from './scripts/navigation';

import './styles/index.scss';

document.addEventListener('DOMContentLoaded', () => {
  const projectsFilter = new ProjectsFilter();

  projectsFilter.init();
  monitoringOfCurrentSectionForNavbar();
  addListenersToNavbar();
});
