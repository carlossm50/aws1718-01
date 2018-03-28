angular
    .module("ProjectListApp")
    
    .controller("ListCtrl", function($scope,$http) {
        console.log("Controller initialized");
        $scope.perinvest = ['Juan Francisco', 'Pedro Fernandez', 'Maria Magdalena','Altagracia'];
		$scope.pertrab = ['Martha', 'Paola', 'Mariana','Ana'];
		$scope.grTrab = [];
        $scope.tareas = [];

        function refresh(){
            $http.get("/api/v1/projects").then(function (response){
                $scope.projects = response.data;
            });
        }
        
        $scope.indice = function (dato){
            //alert(dato);
            
            $scope.OneProject = $scope.projects[dato];
        }
        $scope.GetProject = function (){
            
            $http.get("/api/v1/projects/"+$scope.newProject.projname).then(function (response){
            $scope.projects = response.data;
            });
        } 
        
        $scope.addProject = function (){
            $scope.newProject.grInv = $scope.tareas;
            $scope.newProject.grTrb = $scope.grTrab;
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
    
    //Inicio agregar y eliminar invertigador de la lista 
        
		$scope.agregarTarea = function () {
		if ($scope.nuevoInv != null)
				$scope.tareas.push({inv_name: $scope.nuevoInv});
				$scope.nuevoInv = null;
                //alert($scope.tareas);
		}

		$scope.eliminarTarea = function (dato) {
				//var pos = $scope.tareas.indexOf({texto:dato});
				$scope.tareas.splice(dato);
		}
    
    
    //Inicio agregar y eliminar Personal de equipo de tabajo de la lista 
        
		$scope.agregarPtrabajo = function () {
		if ($scope.nuevoTrb != null)
				$scope.grTrab.push({trb_name: $scope.nuevoTrb});
				$scope.nuevoTrb = null;
				//alert($scope.grTrab);

		}

		$scope.eliminarPtrabajo = function (dato) {
				//var pos = $scope.tareas.indexOf({texto:dato});
				$scope.grTrab.splice(dato);
		}
    
        
        refresh();
        
    });

    
    