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
                            size: {
                                width: 500
                            },
                            palette: "bright",
                            dataSource: dataSource,
                            series: [
                                {
                                    argumentField: "university",
                                    valueField: "cantgrupos",
                                    label: {
                                        visible: true,
                                        connector: {
                                            visible: true,
                                            width: 1
                                        }
                                    }
                                }
                            ],
                            title: "Projection of groups by university",
                            "export": {
                                enabled: true
                            },
                            onPointClick: function (e) {
                                var point = e.target;
                        
                                toggleVisibility(point);
                            },
                            onLegendClick: function (e) {
                                var arg = e.target;
                        
                                toggleVisibility(e.component.getAllSeries()[0].getPointsByArg(arg)[0]);
                            }
                        };
                        
                        function toggleVisibility(item) {
                            if(item.isVisible()) {
                                item.hide();
                            } else { 
                                item.show();
                            }
                        }
                                /*$scope.chartOptions = {
                                    
                                    //palette: "bright",
                                dataSource: dataSource,
                                series: {
                                    argumentField: "university",
                                    valueField: "cantgrupos",
                                    name: "University",
                                    //type: "bar",
                                    color: '#ffaa66'
                                },
                                title: "Projection of groups by university",
                                "export": {
                                    enabled: true
                                },
                                valueAxis: {
                                title: {
                                    text: "Groups"
                                }
                                    
                                }
                            };*/
                            /**********************************/
                            }
                            
                }
            })
        }

        refresh();
});