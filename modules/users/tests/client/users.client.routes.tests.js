(function () {
  'use strict';

  describe('Users Route Tests', function () {
    // Initialize global variables
    var $scope,
      UsersService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _UsersService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      UsersService = _UsersService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('users');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/users');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          UsersController,
          mockUser;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('users.view');
          $templateCache.put('modules/users/client/views/view-user.client.view.html', '');

          // create mock User
          mockUser = new UsersService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'User Name'
          });

          //Initialize Controller
          UsersController = $controller('UsersController as vm', {
            $scope: $scope,
            userResolve: mockUser
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:userId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.userResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            userId: 1
          })).toEqual('/users/1');
        }));

        it('should attach an User to the controller scope', function () {
          expect($scope.vm.user._id).toBe(mockUser._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/users/client/views/view-user.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          UsersController,
          mockUser;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('users.create');
          $templateCache.put('modules/users/client/views/form-user.client.view.html', '');

          // create mock User
          mockUser = new UsersService();

          //Initialize Controller
          UsersController = $controller('UsersController as vm', {
            $scope: $scope,
            userResolve: mockUser
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.userResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/users/create');
        }));

        it('should attach an User to the controller scope', function () {
          expect($scope.vm.user._id).toBe(mockUser._id);
          expect($scope.vm.user._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/users/client/views/form-user.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          UsersController,
          mockUser;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('users.edit');
          $templateCache.put('modules/users/client/views/form-user.client.view.html', '');

          // create mock User
          mockUser = new UsersService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'User Name'
          });

          //Initialize Controller
          UsersController = $controller('UsersController as vm', {
            $scope: $scope,
            userResolve: mockUser
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:userId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.userResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            userId: 1
          })).toEqual('/users/1/edit');
        }));

        it('should attach an User to the controller scope', function () {
          expect($scope.vm.user._id).toBe(mockUser._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/users/client/views/form-user.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
