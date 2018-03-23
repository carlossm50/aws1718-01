angular
    .module("ProjectListApp")
    
    .controller("ListCtrl", function($scope,$http) {
        console.log("Controller initialized");

        function refresh(){
            $http.get("/api/v1/projects").then(function (response){
                $scope.projects = response.data;
            });
        }
        
        
        $scope.GetProject = function (){
            
            $http.get("/api/v1/projects/"+$scope.newProject.projname).then(function (response){
            $scope.projects = response.data;
            });
        } 
        
        $scope.addProject = function (){
            
            $http
                .post("/api/v1/projects", $scope.newProject)
                .then(function (){
                    refresh();  
                });
        }
        
        $scope.delallProject = function (){
            $http
                .delete("/api/v1/projects", $scope.delallProject)
                .then(function (){
                    refresh();  
                });
        }
        
        $scope.delProject = function (){
            
            $http
                .delete("/api/v1/projects/"+$scope.newProject.projname , $scope.deleteProject)
                .then(function (){
                    refresh();  
                });
        }
        
        $scope.delProject = function (_name){
            
            $http
                .delete("/api/v1/projects/"+_name , $scope.deleteProject)
                .then(function (){
                    refresh();  
                });
        }
        
        $scope.updateProject = function (){
            
            $http
                .put("/api/v1/projects/"+$scope.newProject.projname , {projname:$scope.newProject.projname,tipo:$scope.newProject.tipo,referencia:$scope.newProject.referencia})
                .then(function (){
                    refresh();  
                });
        }
        refresh();
        
    });
    