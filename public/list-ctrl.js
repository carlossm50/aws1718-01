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
        
        $scope.updateProject1 = function (){
            
            $http
                .put("/api/v1/projects/"+$scope.OneProject.projname , $scope.OneProject)//{projname:$scope.newProject.projname,tipo:$scope.newProject.tipo,referencia:$scope.newProject.referencia})
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
        
		$scope.agregarTarea = function (_op) {

    		if(_op === 0){
    	    	if ($scope.nuevoInv != null)
    				$scope.tareas.push({inv_name: $scope.nuevoInv});
    			$scope.nuevoInv = null;
    			
    		}
    		else{
    		    if(_op === 1){
    		        if ($scope.EditaInv != null)
    				    $scope.OneProject.grInv.push({inv_name: $scope.EditaInv});
    				$scope.EditaInv = null;
    			    
    		    }
    		}
		    
		}

		$scope.eliminarTarea = function (_op,_index) {
				//var pos = $scope.tareas.indexOf({texto:dato});
            if (_op === 0){
				if (_index === 0 && $scope.tareas.length > 0){
				    $scope.tareas.splice(0,1)
				}
				else{
				    $scope.tareas.splice(_index,1)
				}
            }
            else{
                if (_op === 1){
                    
                    if (_index === 0 && $scope.OneProject.grInv.length > 0){
    				    $scope.OneProject.grInv.splice(0,1)
    				}
    				else{
    				    $scope.OneProject.grInv.splice(_index,1)
    				    
    				}
                }
            }
		}
    
    
    //Inicio agregar y eliminar Personal de equipo de tabajo de la lista 
        
		$scope.agregarPtrabajo = function (_op) {
		    if(_op === 0){
        		if ($scope.nuevoTrb != null)
        				$scope.grTrab.push({trb_name: $scope.nuevoTrb});
        				$scope.nuevoTrb = null;
		    }
		    else{
		        if(_op === 1){
		             if ($scope.EditaTrb != null)
                		$scope.OneProject.grTrb.push({trb_name: $scope.EditaTrb});
                		$scope.EditaTrb = null;
		            
		        }
		    }
    	}
    	
		$scope.eliminarPtrabajo = function (_op,_index) {
			if(_op === 0){
                  if (_index === 0 && $scope.grTrab.length > 0){
    				    $scope.grTrab.splice(0,1)
    				}
    				else{
    				    $scope.grTrab.splice(_index,1)
    				}				    
			}
			else{
			    if(_op === 1){
			        
			        if (_index === 0 && $scope.OneProject.grTrb.length > 0){
    				    $scope.OneProject.grTrb.splice(0,1)
    				}
    				else{
    				    $scope.OneProject.grTrb.splice(_index,1)
    				    
    				}
			        
			    }
			}
				
				
		}
    
        
        refresh();
        
    });
