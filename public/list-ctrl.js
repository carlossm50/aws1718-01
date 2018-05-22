angular
    .module("ProjectListApp")
    
    .controller("ListCtrl", function($scope,$http,$filter) {
        
        
        /*Google login*/
           $scope.gmail={
        username: "",
        email: ""
    };
    
    $scope.onGoogleLogin= function() {
        var params = {
            'clientid': '33957089096-gh0s3hcut9raumdter912kki19g651qf.apps.googleusercontent.com',
            'coockiepolicy': 'single_host_origin',
            'callback': function(result) {
                if(result['status']['signed_in']) {
                    var request = gapi.client.plus.people.get (
                        {
                            'userId': 'me'
                        }
                        
                        
                        );
                        request.execute(function(resp) {
                            $scope.$apply(function() {
                                $scope.gmail.username = resp.displayName;
                                $scope.gmail.email= resp.emails[0].value;
                                $scope.g_image= resp.image.url;
                                
                            });
                        
                        });
                }
                
            },
            'approvalprompt':'force',
            'scope':'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
            
        };
        
        gapi.auth.signIn(params);
    }
        /*Google login*/
        console.log("Controller initialized");

		$scope.grTrab = [];
        $scope.tareas = [];
        $scope.OneProject = [];
        

        function refresh(){
            $http.get("/api/v1/projects").then(function (response){
                $scope.projects = response.data;
            });
        }

         function GetUniversities (){
                $http.get("https://aws1718-04.herokuapp.com/api/v1/universities?apikey=123456").then(function (response){    
                    $scope.prjuniversities = response.data;
                });
            }
    
        $scope.GetOneUniversity = function (){
            if ($scope.SearchUniversity != null && $scope.SearchUniversity !=''){
                $http.get("https://aws1718-04.herokuapp.com/api/v1/universities/"+$scope.SearchUniversity+"?apikey=123456")
                .then(function (response){
                    $scope.University = response.data;
                    GetGroups();
                })
                .catch(function(rejection){
                    if(rejection.status==404){
                        alert("Not Found");
                    }
                })
                ;
            }
        } 
        
        
        function GetGroups(){
        if ($scope.SearchUniversity != null && $scope.SearchUniversity !=''){
            $http.get("https://aws1718-03.herokuapp.com/api/v1/groups?apikey=asdfg")
                .then(function (response){
                    $scope.Groups = response.data;
                    filterGroups();
                    
                })
                .catch(function(rejection){
                    if(rejection.status==404){
                        alert("Not Found");
                    }
                });
            }
        }
        
        function filterGroups(){
            var pryectos = [];
            $scope.filteredGroups = [];
            $scope.filteredGroups.slice(0);

            //var results = $scope.projects.grFnc.filter(function (univ) { return univ.Fnc_name == $scope.SearchUniversity; });

                for (var x=0; $scope.Groups.length; x++){
                    
                    if ($scope.Groups[x].university == $scope.SearchUniversity )
                    {
                        //$scope.filteredGroups.push({name:$scope.Groups[x].name,university:$scope.Groups[x].university,projects:[{projname:"Projecto AWS"},{projname:"Projecto DAW"}]});
                        $scope.filteredGroups.push({name:$scope.Groups[x].name,university:$scope.Groups[x].university,projects:[]});
                        
                        /**************************************************/
                        for (var i = 0; $scope.filteredGroups.length; i++ ){
                            for(var j = 0; $scope.projects.length; j++)
                            {
                                if ($scope.filteredGroups[i].name == $scope.projects[j].prjGroup)
                                {
                                    //alert('Grupo');
                                    $scope.filteredGroups[i].projects.push({projname:$scope.projects[j].projname});
                                }
                            }
                        }
                        /**************************************************/
                        
                    }
                }
        }

        function selectGroups(){
                    $http.get("https://aws1718-03.herokuapp.com/api/v1/groups?apikey=asdfg")
                        .then(function (response){
                            $scope.SelectGroups = response.data;
                        });
                }

        function GetResearchers(){
                $http.get("https://aws1718-02.herokuapp.com/api/v1/researchers?apikey=asdf1234").then(function (response){
                      $scope.perinvest = response.data;
                      $scope.pertrab = response.data;
                });
            }

        $scope.GetProject = function (){
            if ($scope.Search != null){
                 $scope.Search = $filter('uppercase')($scope.Search);
                $http.get("/api/v1/projects/"+$scope.Search)
                .then(function (response){
                    $scope.projects = response.data;
                    $scope.Search = null;
                })
                .catch(function(rejection){
                    if(rejection.status==404){
                        alert("Not Found");
                        $scope.projects = null;
                        $scope.Search = null;
                    }
                })
                ;
            }
            else
            {
                refresh();
            }
        }
        
        $scope.indice = function (dato){
            //alert(dato);
            $scope.OneProject=Object.assign({}, $scope.projects[dato]);
            
            $scope.OneProject.fecha_ini = new Date($scope.OneProject.fecha_ini);
            $scope.OneProject.fecha_fin = new Date($scope.OneProject.fecha_fin);
            
            $scope.OneProject.grResp = $scope.projects[dato].grResp.slice(0);
            $scope.OneProject.grFnc  = $scope.projects[dato].grFnc.slice(0);
            $scope.OneProject.grInv  = $scope.projects[dato].grInv.slice(0);
            $scope.OneProject.grTrb  = $scope.projects[dato].grTrb.slice(0);
            $scope.OneProject.grSoc  = $scope.projects[dato].grSoc.slice(0);
            $scope.OneProject.grCtr  = $scope.projects[dato].grCtr.slice(0);
            
        }
        $scope.addProject = function (){
            
            $scope.newProject.referencia=$filter('uppercase')($scope.newProject.referencia);
            $scope.newProject.grResp = $scope.grResp;
            $scope.newProject.grFnc = $scope.grFnc;
            $scope.newProject.grInv = $scope.tareas;
            $scope.newProject.grTrb = $scope.grTrab;
            $scope.newProject.grSoc = $scope.grSoc;
            $scope.newProject.grCtr = $scope.grCtr;
            
            
            $http
                .post("/api/v1/projects", $scope.newProject)
                .then(function (response){
                        refresh();  
                        if(response.status==201)
                        alert("Created successfully")
                        
                        $scope.limpiar_newProject();
                })
                .catch(function(rejection){
                    if(rejection.status==409)
                            alert("Conflict in data");
                    else{
                        if(rejection.status==405)
                            alert("Method Not Allowed")
                        else 
                            if(rejection.status==503)
                            alert("Internal error  ");
                    }
                    $scope.limpiar_newProject();
                });
            
        }
        
         $scope.limpiar_newProject = function (){
            
            $scope.newProject.projname = null;
            $scope.newProject.tipo = null;
            $scope.newProject.referencia = null;
            $scope.newProject.fecha_ini= null;
            $scope.newProject.fecha_fin = null;
            $scope.newProject.grResp = [];
            $scope.newProject.grFnc = [];
            $scope.newProject.grInv = [];
            $scope.newProject.grTrb = [];
            $scope.newProject.grSoc = [];
            $scope.newProject.grCtr = [];
            
            $scope.grResp = [];
            $scope.grFnc = [];
            $scope.grInv = [];
            $scope.grTrab = [];
            $scope.grSoc = [];
            $scope.grCtr = [];
            $scope.tareas = [];
            
            
        }
        
        $scope.delallProject = function (){
            if(confirm('Are you sure you want to delete all projects?')){
                $http
                    .delete("/api/v1/projects", $scope.delallProject)
                    .then(function (require){
                        if(require.status == 200)
                            alert("Deleted successfully")
                            refresh();
                    });
            }
        }
        
        $scope.delProject = function (_name){
          if(confirm('Are you sure you want to delete this project?')){
            $http
                .delete("/api/v1/projects/"+_name , $scope.deleteProject)
                .then(function (require){
                    refresh();
                    if(require.status == 200)
                        alert("Deleted successfully")
                        
                })
                .catch(function(rejection){
                    if(rejection.status == 404)
                        alert("Not Found")
                    
                });
                
                
            }
        }
        
        $scope.updateProject1 = function (){
            
               
                $http
                    .put("/api/v1/projects/"+$scope.OneProject.referencia , $scope.OneProject)
                    .then(function (response){
                        refresh(); 
                        if(response.status==200)
                            alert("Update successfully")
                    })
                    .catch(function(rejection){
                        if(rejection.status==404)
                                alert("Not Found");
                        else
                            if(rejection.status==405)
                                alert("Method Not Allowed")   
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
    
   //Inicio agregar y eliminar Personal contratado a la lista 
        $scope.grCtr = [];
		$scope.agregarP_contratado = function (_op) {
		    if(_op === 0){
        		if ($scope.nuevoCtr != null)
        				$scope.grCtr.push({Ctr_name: $scope.nuevoCtr});
        				$scope.nuevoCtr = null;
		    }
		    else{
		        if(_op === 1){
		            
		             if ($scope.EditaCtr != null)
                        {	
                		$scope.OneProject.grCtr.push({Ctr_name: $scope.EditaCtr});
		                }
                		$scope.EditaCtr = null;
		            
		        }
		    }
    	}
    	
		$scope.eliminarP_contratado = function (_op,_index) {
			if(_op === 0){
                  if (_index === 0 && $scope.grCtr.length > 0){
    				    $scope.grCtr.splice(0,1)
    				}
    				else{
    				    $scope.grCtr.splice(_index,1)
    				}				    
			}
			else{
			    if(_op === 1){
			        
			        if (_index === 0 && $scope.OneProject.grCtr.length > 0){
    				    $scope.OneProject.grCtr.splice(0,1)
    				}
    				else{
    				    $scope.OneProject.grCtr.splice(_index,1)
    				    
    				}
			        
			    }
			}
				
				
		}

   //Inicio agregar y eliminar Financiadores
        $scope.grFnc=[];
		$scope.agregar_financiador = function (_op) {
		    if(_op === 0){
                
        		if ($scope.nuevoFnc != null)
        				$scope.grFnc.push({Fnc_name: $scope.nuevoFnc});
        				$scope.nuevoFnc = null;
		    }
		    else{
		        if(_op === 1){
		             if ($scope.EditaFnc != null)
                		$scope.OneProject.grFnc.push({Fnc_name: $scope.EditaFnc});
                		$scope.EditaFnc = null;
		            
		        }
		    }
    	}
    	
		$scope.eliminar_financiador = function (_op,_index) {
			if(_op === 0){
                  if (_index === 0 && $scope.grFnc.length > 0){
    				    $scope.grFnc.splice(0,1)
    				}
    				else{
    				    $scope.grFnc.splice(_index,1)
    				}				    
			}
			else{
			    if(_op === 1){
			        
			        if (_index === 0 && $scope.OneProject.grFnc.length > 0){
    				    $scope.OneProject.grFnc.splice(0,1)
    				}
    				else{
    				    $scope.OneProject.grFnc.splice(_index,1)
    				    
    				}
			        
			    }
			}
				
				
		}

   //Inicio agregar y eliminar Socio
        $scope.grSoc=[];
		$scope.agregar_socio = function (_op) {
            
		    if(_op === 0){
                
                if ($scope.nuevoSoc != null)
        				$scope.grSoc.push({Soc_name: $scope.nuevoSoc});
        				$scope.nuevoSoc = null;
		    }
		    else{
		        if(_op === 1){
		             if ($scope.EditaSoc != null)
                		$scope.OneProject.grSoc.push({Soc_name: $scope.EditaSoc});
                		$scope.EditaSoc = null;
		            
		        }
		    }
    	}
    	
		$scope.eliminar_socio = function (_op,_index) {
			if(_op === 0){
                  if (_index === 0 && $scope.grSoc.length > 0){
    				    $scope.grSoc.splice(0,1)
    				}
    				else{
    				    $scope.grSoc.splice(_index,1)
    				}				    
			}
			else{
			    if(_op === 1){
			        
			        if (_index === 0 && $scope.OneProject.grSoc.length > 0){
    				    $scope.OneProject.grSoc.splice(0,1)
    				}
    				else{
    				    $scope.OneProject.grSoc.splice(_index,1)
    				    
    				}
			        
			    }
			}
				
				
		}

    //Inicio agregar y eliminar Responsable(s)
        $scope.grResp=[];
        $scope.agregar_responsable = function (_op) {
    
            if(_op === 0){
                
                if ($scope.nuevoResp != null)
                
                        $scope.grResp.push({Resp_name: $scope.nuevoResp});
                        $scope.nuevoResp = null;
            }
            else{
                if(_op === 1){
                     if ($scope.EditaResp != null)
                       $scope.OneProject.grResp.push({Resp_name: $scope.EditaResp});
                        $scope.EditaResp = null;
                    
                }
            }
}

        $scope.eliminar_responsable = function (_op,_index) {
            if(_op === 0){
                  if (_index === 0 && $scope.grResp.length > 0){
                        $scope.grResp.splice(0,1)
                    }
                    else{
                        $scope.grResp.splice(_index,1)
                    }				    
            }
            else{
                if(_op === 1){
                    
                    if (_index === 0 && $scope.OneProject.grResp.length > 0){
                        $scope.OneProject.grResp.splice(0,1)
                    }
                    else{
                        $scope.OneProject.grResp.splice(_index,1)
                        
                    }
                    
                }
            }
        
        
}
    
    //Widgets
    
    
/*Data chart

var dataSource = [{
    university: "Illinois",
    projects: 423.721,
    groups: 476.851,
},
{
    university: "Sevilla",
    projects: 423.721,
    groups: 476.851,
}];

Data chart end*/

/*
var DemoApp = angular.module('DemoApp', ['dx']);

DemoApp.controller('DemoController', function DemoController($scope) {
    $scope.chartOptions = {
        dataSource: dataSource,
        commonSeriesSettings: {
            argumentField: "state",
            type: "bar",
            hoverMode: "allArgumentPoints",
            selectionMode: "allArgumentPoints",
            label: {
                visible: true,
                format: {
                    type: "fixedPoint",
                    precision: 0
                }
            }
        },
        series: [
            { valueField: "year2004", name: "2004" },
            { valueField: "year2001", name: "2001" },
            { valueField: "year1998", name: "1998" }
        ],
        title: "Gross State Product within the Great Lakes Region",
        legend: {
            verticalAlignment: "bottom",
            horizontalAlignment: "center"
        },
        "export": {
            enabled: true
        },
        onPointClick: function (e) {
            e.target.select();
        }
    };
});
    */
    
    
        refresh();
        GetUniversities();
        selectGroups();
        GetResearchers();
    });