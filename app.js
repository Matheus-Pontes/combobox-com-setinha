const app = angular.module('myApp', []);


app.controller('MainCtrl', function($scope) {
  var ctrl = this;

  ctrl.epis = [{id: 1, descricao: "teste"}, {id: 2, descricao: "teste 02"}, {id: 3, descricao: "teste 03"}];
  ctrl.especies = [{id: 1, descricao: "teste"}, {id: 2, descricao: "teste 02"}, {id: 3, descricao: "teste 03"}];
  ctrl.numerosOnus = [{id: 1, descricao: "teste"}, {id: 2, descricao: "teste 02"}, {id: 3, descricao: "teste 03"}];
  ctrl.epiId = "";
  ctrl.especieId = "";
  ctrl.numeroOnuId = "";

  ctrl.selecionarEPI = function () {

  };

  ctrl.selecionarEspecie = function () {
    
  };

  ctrl.selecionarNumeroOnu = function () {
    
  };
  
  }
);

app.directive('combo', function(){
  return {
    restrict: 'E',
    scope: {  
        lista: '=',
        selecao: '=',
        label: '@',
        funcao: '='
    },
    bindToController: true,
    templateUrl: "./directive/combobox.html",
    controller: function($scope) {
        var ctrlCombo = this;

        ctrlCombo.lista = $scope.lista;
        ctrlCombo.label = $scope.label;
        ctrlCombo.listaAux = [{id: 1, descricao: "teste"}, {id: 2, descricao: "teste 02"}, {id: 3, descricao: "teste 03"}];
        ctrlCombo.activeIndex = -1;

        ctrlCombo.search = function (search) {
          ctrlCombo.lista = ctrlCombo.listaAux.filter(ele => ele.descricao.toLowerCase().indexOf(search.toLowerCase()) >= 0);
        }

        ctrlCombo.handleKeydown = function(event) {
          switch(event.key) {
            case 'ArrowDown':
              if (ctrlCombo.activeIndex < ctrlCombo.lista.length - 1) {
                ctrlCombo.activeIndex++;
              }
              break;
            case 'ArrowUp':
              if (ctrlCombo.activeIndex > 0) {
                ctrlCombo.activeIndex--;
              }
              break;
            case 'Enter':
                // Acesse o elemento DOM
                const componente = document.querySelectorAll('.meuCombo');
                
                componente.forEach(c => {
                    // Acesse o estado Alpine.js associado ao elemento
                    const alpineState = Alpine.$data(c);
                
                    if (alpineState.open) 
                        alpineState.open = false;
                })
                

                ctrlCombo.selectSuggestion(ctrlCombo.lista[ctrlCombo.activeIndex]);
                break;
          }
          ctrlCombo.activeSuggestionId = ctrlCombo.activeIndex >= 0 ? 'list' + ctrlCombo.activeIndex : null;
        };

        ctrlCombo.selectSuggestion = function(suggestion) {
          ctrlCombo.selecao = suggestion.id;
          ctrlCombo.selecaoDescricao = suggestion.descricao;
          ctrlCombo.activeIndex = -1;
        };
    },
    controllerAs: 'ctrlCombo'
}
});