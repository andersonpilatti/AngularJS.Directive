var app = angular.module('myApp', []);

app.controller('MainCtrl', ['ViaCEP', function(ViaCEP) {
    var self = this;
    
    self.Teste = function(){
        console.log(self.enderecoResidencial);
        console.log(self.enderecoComercial);
    };
}]);

app.factory('ViaCEP', ['$http', function($http){
    return {
        Buscar : function (cep){
            return $http.get('https://viacep.com.br/ws/' + cep + '/json/')
                        .then(function(response) {
                                return response.data;
                            });
        }
    }
}]);

app.directive('endereco', ['ViaCEP', function(ViaCEP) {
    return {
      templateUrl: 'views/frmEndereco.html',
      restrict: 'AE',
      scope: {
          ngModel : '='
      },
      link: function($scope, $element, $attrs) {
                $scope.BuscarCEP = function(){
                    ViaCEP.Buscar($scope.ngModel.cep).then(function(d){
                        $scope.ngModel.cep = d.cep;
                        $scope.ngModel.logradouro = d.logradouro;
                        $scope.ngModel.bairro = d.bairro;
                        $scope.ngModel.localidade = d.localidade;
                        $scope.ngModel.uf = d.uf;

                    }, function(e){
                        console.error('erro');
                    }); 
                };
            }
    };
  }]);