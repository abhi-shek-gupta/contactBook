const app=angular.module('myapp',['ngRoute','ngMessages']);
app.config(function($routeProvider,$locationProvider){
    $routeProvider.when('/',{
        templateUrl:'views/showAllcontacts.html',
        controller:'AController'
    });
    $routeProvider.when('/addContact',{
        templateUrl:'views/addContact.html',
        controller:'AController'
    });
    $routeProvider.when('/showContact/:id',{
        templateUrl:'views/showContact.html',
        controller:'ShowController'
    });
    $routeProvider.when('/deleteContact/:id',{
        templateUrl:'views/showAllcontacts.html',
        controller:'deleteController'
    });
    $routeProvider.when('/editContact/:id',{
        templateUrl:'views/addContact.html',
        controller:'editController'
    });

    $routeProvider.when('/404',{
        templateUrl:'views/404.html'
    });
    $routeProvider.otherwise({
        redirectTo:'/404'
    });
    $locationProvider.html5Mode(true);
})

app.controller('AController',function($http,$scope,$location){
    
    var refresh=function(){
             $http({
                 url:'https://zenways-contact.herokuapp.com/api/contacts',
                 headers:{
                     key:'ZENWAYS01ABHISHEK01'
                 },
                 method:'GET'
             }).then(function(response){
                // console.log(response.data);
                 $scope.contacts=response.data.contacts;
             },function(response){
                console.log(response);
             })
             }//refresh 
        
            refresh();
            $scope.submitForm=function(contact){
                $http({
                    url:'https://zenways-contact.herokuapp.com/api/contact',
                                    headers:{
                                        key:'ZENWAYS01ABHISHEK01'
                                    },
                                    method:'POST',
                                    data:$scope.contact 
                }).then(function(response){
                     refresh();
                     $scope.contact={};
                     console.log(response);
                     $location.path('/');
                     alert("Contact added Succesfully");
                },function(response){
                    console.log(response);
                    alert("Something Went wrong");
                })

            };//submit form
})//AController

app.controller('ShowController',function($scope,$http,$routeParams){
    var id=$routeParams.id
	        $http({
            url:'https://zenways-contact.herokuapp.com/api/contact/'+id,
            headers:{
                key:'ZENWAYS01ABHISHEK01'
            }
                 }).then(function(response){
                    console.log(response);
                    $scope.contact=response.data.contact;
                   $scope.x="https://maps.googleapis.com/maps/api/staticmap?center="+$scope.contact.address+"&zoom=14&size=227x267&scale=2&markers=color:redlabel:A|"+$scope.contact.address+"&key=AIzaSyCNGMl4gFASjIL1oXyGrkaycJkoUEl6TZY" ;
                //    console.log($scope.contact.address);
                //    console.log($scope.x);
                  },function(response){
                    console.log("error");
                    console.log(response);
                 });
    
})//showContact

app.controller('deleteController',function($scope,$http,$routeParams){
   // console.log('controller called');
    var id=$routeParams.id
    if( confirm("Are you  sure ?"))
        {
        $http({
            url:'https://zenways-contact.herokuapp.com/api/contact/'+id,
            headers:{
                key:'ZENWAYS01ABHISHEK01'
            },
            method:'DELETE'
        }).then(function(response){
            console.log(response);
            //alert("deleted");
            refresh();
            
        },function(response){
            alert("something went wrong ");
        })
     }
    
});//deleteContact

app.controller('editController',function($scope,$routeParams,$http,$location){
     console.log('editController called');
     var id=$routeParams.id
    $http({
        url:'https://zenways-contact.herokuapp.com/api/contact/'+id,
        headers:{
            key:'ZENWAYS01ABHISHEK01'
        }
             }).then(function(response){
                console.log(response);
                $scope.contact=response.data.contact;
              },function(response){
                console.log("error");
                console.log(response);
             });


$scope.submitForm=function(contact){   
        $http({
            url:'https://zenways-contact.herokuapp.com/api/contact/'+id,
            headers:{
                key:'ZENWAYS01ABHISHEK01'
            },
            method:'PUT',
            data:$scope.contact
        }).then(function(response){
            console.log("editor api sucessfully called");
            //console.log(contact);
           // console.log(response);
            $scope.contact=response.data.contacts;
            $scope.contact={};
           // refresh();
            console.log($scope.contact);
            $location.path('/');
            alert("updated Succesfully");
        },function(response){
            alert("Something went wrong ");
        })  
    }        
     
 });//editContact;

