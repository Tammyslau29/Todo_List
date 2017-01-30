angular.module('todoList').service('dbService', function($q, $timeout,$firebaseArray,$firebaseAuth){
    var config = {
        apiKey: "AIzaSyDonbgHSyxqWJkwXgkgq8_cLI5fvtAqjyo",
        authDomain: "to-do-list-30cab.firebaseapp.com",
        databaseURL: "https://to-do-list-30cab.firebaseio.com",
        storageBucket: "to-do-list-30cab.appspot.com",
        messagingSenderId: "158594730766"
    };
    firebase.initializeApp(config);
    var dbs = this;
    dbs.userId = null;
    dbs.auth = $firebaseAuth();
    dbs.createUser = function(email, password){
        var defer = $q.defer();
        dbs.auth.$createUserWithEmailAndPassword(email,password).then(function(user){
            var ref = firebase.database()
            dbs.userId = user.uid;
            dbs.todos=$firebaseArray(ref.ref("users-todos/" + user.uid));
            defer.resolve(user);
        }).catch(function(err){
            defer.reject(err);
        });

        return defer.promise;
    };
    dbs.login = function(email, password){
        var defer = $q.defer();
        dbs.auth.$signInWithEmailAndPassword(email,password).then(function(user){
            dbs.userId = user.uid;
            defer.resolve(user);
        }).catch(function(err){
            defer.reject(err);
        });
        return defer.promise;
    };
    dbs.logout = function(){
        var defer = $q.defer();
        dbs.todos = null;
        dbs.auth.$signOut().then(function(){
            defer.resolve();
            dbs.userId=null;
        }).catch(function(err){
            defer.reject(err);
        });
        return defer.promise;
    };
    dbs.get = function(user){
        var defer = $q.defer();
        var ref = firebase.database().ref("users-todos/" + user);
        dbs.todos=$firebaseArray(ref);
        defer.resolve(dbs.todos);
        return defer.promise;
    };
    dbs.add = function(item){
        var defer = $q.defer();
        item.dateAdded = new Date().getTime();
        item.completed = false;
        item.dateCompleted = null;

        dbs.todos.$add(item).then(function(){
            defer.resolve("Item Added to Database Successfully");
        });

        return defer.promise;
    };
    dbs.update = function(item,prop,value){
        var defer = $q.defer();
        var index = dbs.todos.indexOf(item);
        if(index > -1){
            dbs.todos[index][prop] = value;
            dbs.todos.$save(index);
        }else{
            defer.reject('Unable to update, unknown item: ' + item);
        }
        return defer.promise;
    }
    dbs.delete = function(item){
        var defer = $q.defer();
        var index = dbs.todos.indexOf(item);
        if(index > -1) {
            dbs.todos.$remove(index, 1);
            defer.resolve('Item successfully Deleted');
        }else{
            defer.reject('Item Not Found.');
        }
        return defer.promise
    }
});