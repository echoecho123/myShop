app.controller('itemController',function ($scope) {

    //+-j计算
    $scope.addNum=function(x){
        $scope.num += x;
        if($scope.num < 1){
            $scope.num = 1;
        }
    }

    $scope.specificationItems={};//记录用户选择的规格

    //将用户选择的规格添加到规格变量
    $scope.selectSpecification = function (key,value) {
        $scope.specificationItems[key] = value;
        searchSku();
    }

    //判断该规格是否被选中
    $scope.isSelected = function (key,value) {
        if($scope.specificationItems[key] == value){
            return true;
        }else{
            return false;
        }
    }

    //加载默认的sku
    $scope.loadSku=function () {

        $scope.sku=skuList[0];
        $scope.specificationItems = JSON.parse(JSON.stringify($scope.sku.spec));
    }

    //判断两个对象是否相同
    matchObject=function (map1,map2) {
        for(var k in map1){
            if(map1[k] != map2[k]){
                return false;
            }
        }

        for(var k in map2){
            if(map2[k] != map1[k]){
                return false;
            }
        }

        return true;
    }

    //根据用户选择的规格，来从skuList中选择当前sku
    searchSku=function () {
        for(var i=0;i<skuList.length;i++){
            if(matchObject(skuList[i].spec,$scope.specificationItems)){
                $scope.sku= skuList[i]; //赋值给当前的sku
                return;
            }
        }

        $scope.sku={id:'',title:'---',price:0};//找不到用户选择的相同规格的sku,返回一个自定义的sku
    }
    //加入购物车
    $scope.addToCart=function(){
        alert("skuId"+$scope.sku.id);
    }

});