function loginFormController(dbService){
    var ctrl = this;
    ctrl.user = {};
    ctrl.uid = null;
    ctrl.failed = false;
    dbService.auth.$onAuthStateChanged(function(user){
        if(user){
            ctrl.uid = user.uid;
        }else{
            ctrl.uid = null;
        }
    });
    ctrl.newUser = function(){
        console.log('User Info: ',ctrl.user);
        dbService.createUser(ctrl.user.email, ctrl.user.password).then(function(user){
            console.log("User Created:" , ctrl.user);
            ctrl.uid = user.uid;
        }).catch(function(err){
            console.warn("User not created: ",err)
        });
    }
    ctrl.loginUser = function(){
        dbService.login(ctrl.user.email, ctrl.user.password).then(function(user){
            ctrl.failed = false;
            console.log("User logged in: ", user);
        }).catch(function(err){
            ctrl.failed = true;
            console.warn("Failed Login" , err)
        })
    };
    ctrl.logoutUser = function (){
        ctrl.onSignOut();
        dbService.logout().then(function(){
            console.log("User logged out");

        }).catch(function(err){
            console.warn("Failed to log out user: ", err )
        })
    }
}

angular.module("todoList").component("loginForm", {
    templateUrl:'./js/components/loginForm/login-form.component.html',
    controller: loginFormController,
    bindings:{
        onSignOut:'&'
    }
});