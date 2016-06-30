(function () {
  'use strict';

  angular
    .module('leads')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Leads',
      state: 'leads',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'leads', {
      title: 'List Leads',
      state: 'leads.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'leads', {
      title: 'Create Lead',
      state: 'leads.create',
      roles: ['user']
    });
  }
})();
