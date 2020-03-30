
(function () {
    'use strict';

    const eop = "https://rickandmortyapi.com/api/character/?";

    var app = angular.module('myApp',['ngRoute', 'charactersService'])
        app.controller('charactersCtrl', charactersCtrl)

        app.config(function($routeProvider) {
            $routeProvider.when('/characters', {
                    templateUrl: 'characters/characters.view.html',
                    controller: 'charactersCtrl'
                })
                .otherwise({
                    templateUrl: 'characters/characters.view.html',
                    controller: 'charactersCtrl'
                });
            })

        charactersCtrl.$inject = ['charactersService'];



        function charactersCtrl( charactersService){
            var cc = this;
            cc.title = "HDP";
            cc.dis_prev = true;
            cc.dis_next = false;
            cc.result = [];
            cc.total_peges = 0;
            cc.next_pege = '';
            cc.previus_pege = '';
            cc.search_name = '';
            cc.search_specie = '';
            cc.find_gender = "Gender...";
            cc.path = eop;//EOP path init
            cc.q_gender = 'gender=';
            cc.q_species = 'species='
            cc.q_name = 'name=';

            //Deberia estar en un .locale para multi-idiomas.
            cc.labels = {
                title: "Rick & Morty Challenge",
                s_name: "Search by name...(3 letters)",
                s_specie: "Search by specie...(3 letters)",
                search: "Search",
                species: "Species: ",
                gender: "Gender: ",
                location: "Location Name: ",
                c_date: "Creation Date: ",
                status: "Status: ",
                previous: "<< Previous",
                next: "Next >>",
                no_data: "No data was found with the selected filters."
            };
            

            angular.extend(cc, {
    
                data: {},

                //Funciones
                init: init,
                scrollUp: scrollUp,
                navClickPrev: navClickPrev,
                navClickNext: navClickNext,
                changeInputsFilter: changeInputsFilter,
                filterByGender:filterByGender,
        
                $onInit: init,

                
            });
        
            function init() {

                //The gender of the character ('Female', 'Male', 'Genderless' or 'unknown').
                cc.gender_data = {
                    model: null,
                    genderOptions: [
                      {id: '0', name: 'Gender...'},
                      {id: '1', name: 'Male'},
                      {id: '2', name: 'Female'},
                      {id: '3', name: 'Genderless'},
                      {id: '4', name: 'Unknown'},
                    ]
                };
                cc.next_pege = '';
                cc.previus_pege = '';
                cc.search_name = '';
                cc.search_specie = '';
                cc.gender_data.model = cc.gender_data.genderOptions[0].name;
                cc.dis_prev = true;
                cc.path = cc.path+'page=1'
        
                this.getByAPI();
            };
            

            function scrollUp () {
                window.scrollTo(0, 0);
            }


            this.getByAPI = async () => {
                var _path = cc.path;
                //disabled buttons.
                cc.next_pege = "";
                cc.previus_pege = "";

                 await charactersService.getCharactersByApi(_path).then(function(r) {

                    if(r.error){
                        cc.result = [];
                        return;
                    }
                    if(r.info != undefined){
                        cc.total_peges = r.info.pages;
                        cc.next_pege = r.info.next;
                        cc.previus_pege = r.info.prev;
                        cc.result = r.results;
                    }
                });
                cc.path = eop;
                scrollUp();
            }

            function navClickPrev(){
                scrollUp();
                cc.path = cc.previus_pege;
                this.getByAPI();
                
            }
            function navClickNext(){
                scrollUp();
                cc.path = cc.next_pege;
                this.getByAPI();
            }

            
            //(change) clean input
            function changeInputsFilter(n){

                console.log(n);
                if(cc.search_name.trim() == '' && cc.search_specie.trim() == '' && cc.gender_data.model == cc.gender_data.genderOptions[0].name){
                    cc.path = cc.path+"page=1";
                    this.getByAPI();
                    
                }else{

                    //name filter
                    if(cc.search_name.trim() != '' && cc.search_name.trim().length  > 2)
                        cc.path = cc.path + "&" + cc.q_name + cc.search_name;

                    //species filter
                    if(cc.search_specie.trim() != '' && cc.search_specie.trim().length  > 2)
                        cc.path = cc.path + "&" + cc.q_species + cc.search_specie;

                    //gender filter
                    if(cc.gender_data.model != cc.gender_data.genderOptions[0].name)
                        cc.path = cc.path + "&" + cc.q_gender + cc.gender_data.model;

                    this.getByAPI();
                }
                    
            }
            

            function filterByGender(){

                if(cc.gender_data.model == cc.gender_data.genderOptions[0].name && 
                    cc.search_name.trim() == '' && cc.search_specie.trim() == ''){
                    cc.path = cc.path+"page=1";
                }
                else{

                    //gender filter
                    if(cc.gender_data.model != cc.gender_data.genderOptions[0].name)
                        cc.path = cc.path + cc.q_gender + cc.gender_data.model;
                    
                    //species filter
                    if(cc.search_specie.trim() != '')
                        cc.path = cc.path + "&" + cc.q_species + cc.search_specie;

                    //name filter
                    if(cc.search_name.trim() != '')
                        cc.path = cc.path + "&" + cc.q_name + cc.search_name;
                }
                
                this.getByAPI();
                
            }

        }

})();
