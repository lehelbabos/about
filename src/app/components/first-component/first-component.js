app.directive('firstComponent', function(){
    return {
      restrict: 'E',
      replace: false,
      controllerAs: 'firstComponentCtrl',
      templateUrl: './app/components/first-component/first-component.html',
      controller: function(storeService) {
          var vm = this;
          vm.store = storeService; // Make store accessible to component by aliasing it to vm.store

          vm.welcomeMessage = vm.store.sampleObject; // link var in component to specific value in store. 
          console.log("First Component Test")
      }
    };
});