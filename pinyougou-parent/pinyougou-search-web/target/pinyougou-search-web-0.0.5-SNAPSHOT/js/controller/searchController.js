app.controller('searchController',function($scope,searchService){
//搜索

    $scope.search=function(){
        $scope.searchMap.pageNo = parseInt($scope.searchMap.pageNo);
        searchService.search( $scope.searchMap ).success(
            function(response){
                $scope.resultMap=response;//搜索返回的结果
                buildPageLabel(); //根据分页返回结果，生成分页页码
            }
        );
    }

    //定义搜索对象的结构（前端向后台传输搜索条件的实体）
    $scope.searchMap = {'keywords':'','category':'','brand':'','spec':{},'price':'','pageNo':1,'pageSize':20};//规格有多个，以对象方式存储

    //点击分类和品牌和规格，追加到搜索对象中(需要参数，点击品牌，品牌中哪一个)
    $scope.addSearchItem = function (key,value) {
        //点击分类和品牌
        if(key == 'category' || key == 'brand' || key == 'price'){
            //改变searchMap的值
            $scope.searchMap[key] = value;
        }else{
            //点击的规格,改变searchMap的值
            $scope.searchMap.spec[key]=value;
        }
        $scope.search();//改变了searchMap的值，重新从后台查询数据
        $scope.searchMap.pageNo = 1;//改变了条件，重新查询，页码设置为1.
    }

    //撤销搜索项
    $scope.removeSearchItem=function (key) {
        if(key == 'category' || key == 'brand' || key == 'price'){
            $scope.searchMap[key] = '';       //恢复原样，置空
        }else{
            delete $scope.searchMap.spec[key];//把对象移除
        }
        $scope.search();//改变了searchMap的值，重新从后台查询数据
        $scope.searchMap.pageNo = 1;//每次重新查询，页码置为1；
    }

    //构建分页页码变量
    buildPageLabel = function () {
        $scope.pageLabel = [];  //初始化分页页码数组
        $scope.firstPage = 1;
        $scope.lastPage = $scope.resultMap.totalPages;
        $scope.firstDot = true;  //前面的...
        $scope.lastDot = true;   //后面的...
        //以当前页为中心，每页显示5个页码
        if($scope.resultMap.totalPages > 5){   //总页数大于5
            if($scope.searchMap.pageNo <= 3){  //当前页<=3显示1-5
                $scope.lastPage = 5;
                $scope.firstDot = false;    //只显示1-5的时候，前面没有...
            }else if($scope.searchMap.pageNo >= $scope.resultMap.totalPages -2 ){ //显示后5页
                $scope.firstPage = $scope.resultMap.totalPages -4;
                $scope.lastDot = false;    //只显示后5页的时候，后面没有...
            }else{
                $scope.firstPage = $scope.searchMap.pageNo - 2;
                $scope.lastPage =  $scope.searchMap.pageNo + 2;
            }

        }else{    //总页数小于5,前后都没有...
            $scope.firstDot = false;
            $scope.lastDot = false;
        }


        for(var i=$scope.firstPage;i<= $scope.lastPage;i++){
            $scope.pageLabel.push(i);
        }
    }


    //分页查询
    $scope.queryByPage = function (pageNo) {
        if(pageNo < 1 || pageNo > $scope.resultMap.totalPages){ //上一页，下一页做限制
            return;
        }
        $scope.searchMap.pageNo = pageNo;
        $scope.search();
    }
    //当前页是否是首页
    $scope.isTopPage = function () {
        if($scope.searchMap.pageNo == 1){
            return true;
        }else{
            return false;
        }
    }
    //当前页是否是尾页
    $scope.isEndPage = function () {
        if($scope.searchMap.pageNo == $scope.resultMap.totalPages){
            return true;
        }else{
            return false;
        }
    }

    //判断是否是当前页
    $scope.isCurrentPage=function (pageNo) {
        if(pageNo == $scope.searchMap.pageNo){
            return true;

        }else{
            return false;
        }
    }

    //按价格排序
    $scope.sortSearch=function (sortField,sort) {
        $scope.searchMap.sortField = sortField;
        $scope.searchMap.sort=sort;
        $scope.search();
    }

    //关键字中有品牌名，则隐藏品牌栏
    $scope.keywordsIsBrand= function () {
        $scope.searchMap.keywords = $scope.searchMap.keywords.replace(" ","");//去除搜索关键字中的空格
        for(var i=0;i<$scope.resultMap.brandList.length;i++){
            if($scope.searchMap.keywords.indexOf($scope.resultMap.brandList[i].text) >= 0){
                return true;
            }
        }
        return false;
    }

    //加载从首页传来的关键字
    $scope.loadKeywords=function () {
        $scope.searchMap.keywords = $location.search()['keywords'];
        $scope.search();
    }
});