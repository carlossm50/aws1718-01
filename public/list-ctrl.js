angular
    .module("ContactListApp")
    .controller("ListCtrl", function($scope,$http) {
        
        console.log("Controller initialized");
        
        function refresh(){
            $http.get("/api/v1/contacts").then(function (response){
                $scope.contacts = response.data;
            });
        }
        
        
        $scope.GetContact = function (){
            
            $http.get("/api/v1/contacts/"+$scope.newContact.name).then(function (response){
            $scope.contacts = response.data;
            });
        } 
        
        $scope.addContact = function (){
            
            $http
                .post("/api/v1/contacts", $scope.newContact)
                .then(function (){
                    refresh();  
                });
        }
        
        $scope.delallContact = function (){
            $http
                .delete("/api/v1/contacts", $scope.delallContact)
                .then(function (){
                    refresh();  
                });
        }
        
        $scope.delContact = function (){
            
            $http
                .delete("/api/v1/contacts/"+$scope.newContact.name , $scope.deleteContact)
                .then(function (){
                    refresh();  
                });
        }
        
        $scope.delContact = function (_name){
            
            $http
                .delete("/api/v1/contacts/"+_name , $scope.deleteContact)
                .then(function (){
                    refresh();  
                });
        }
        
        $scope.updateContact = function (){
            
            $http
                .put("/api/v1/contacts/"+$scope.newContact.name , {name:$scope.newContact.name,phone:$scope.newContact.phone,email:$scope.newContact.email})
                .then(function (){
                    refresh();  
                });
        }
        refresh();
        
    });
