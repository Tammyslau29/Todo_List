function appController() {

}

angular.module('todoList').component('app', {
    templateUrl: './js/components/app/app.component.html',
    controller: appController,
    transclude: true
});