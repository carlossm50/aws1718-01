var DemoApp = angular.module('DemoApp', ['dx']);

DemoApp.controller('DemoController', function DemoController($scope,$http) {
    var dataSource = [];
    
    var cant_groups=0;
    var results = [];
    var universitypushed = '';
    var x=0;
    function refresh(){
            $http.get("https://aws1718-03.herokuapp.com/api/v1/groups?apikey=asdfg").then(function (response){
                $scope.groups = response.data;
                $scope.filterGroups = response.data;
                var records = $scope.groups.length ;
                for( x = 0; x<records; x++){
                    cant_groups = 0;
                    if (universitypushed != $scope.groups[x].university){
                                results = $scope.filterGroups.filter(function (univ) { 
                                            return univ.university == $scope.groups[x].university;
                                          });

                                cant_groups = results.length;         
                                dataSource.push({university: $scope.groups[x].university, cantgrupos: cant_groups});
                                universitypushed = $scope.groups[x].university; 

                            /**********************************/
                                $scope.chartOptions = {
                                dataSource: dataSource,
                                series: {
                                    argumentField: "university",
                                    valueField: "cantgrupos",
                                    name: "University",
                                    type: "bar",
                                    color: '#ffaa66'
                                }
                            };
                            /**********************************/
                            }
                            
                }
            })
        }

        refresh();
});