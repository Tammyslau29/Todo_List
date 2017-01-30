function todoListController($log, dbService){
    var ctrl = this;
    ctrl.todoArr = null;
    dbService.auth.$onAuthStateChanged(function(user){
        if(user){
            ctrl.getList(user.uid)
        }
    });
    ctrl.getList = function(userId){
        dbService.get(userId).then(function(resp){
            $log.info('Todo List Resp: ', resp);
            ctrl.todoArr = resp;
        });
    };
    ctrl.clearList = function() {
        ctrl.todoArr.$destroy();
        ctrl.todoArr=null;
    };
    ctrl.toggleComplete = function(item){
        var completed = !item.completed;
        var now = (completed)? new Date().getTime() : null;
        dbService.update(item, 'completed',completed);
        dbService.update(item, 'dateCompleted',now);
    };
   ctrl.itemDelete = function(item){
       dbService.delete(item);
   }
   ctrl.addItem = function(item){
       dbService.add(item).then(function(msg){
           $log.info(msg);
       });
   }
}

angular.module('todoList').component('toDo', {
    templateUrl: './js/components/todoList/todo-list.component.html',
    controller: todoListController,
    transclude: true
});