function addFormController(){
   var ctrl = this;
    ctrl.todoItem = {};
    ctrl.submit = function(){
        ctrl.onAdd({item: ctrl.todoItem});
        ctrl.todoItem={};
    };
    ctrl.clearForm = function(){
        ctrl.todoItem={};
    };
}

angular.module('todoList').component("addForm",{
    templateUrl:'./js/components/addForm/add-form.component.html',
    controller: addFormController,
    bindings:{
        onAdd: '&'
    }
});