function itemDetailController(){
    var ctrl = this;
    ctrl.toggle = function(){
        ctrl.onToggle();
    };
}

angular.module('todoList').component('itemDetail', {
    templateUrl: './js/components/itemDetail/item-detail.component.html',
    controller: itemDetailController,
    bindings: {
        item: '<',
        onToggle:'&',
        onDelete: '&'
    }
});