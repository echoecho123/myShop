package com.pinyougou.search.service;

import java.util.List;
import java.util.Map;

public interface ItemSearchService {

    public Map search(Map searchMap);
    //运营商后台审核通过商品，更新solr
    public void importList(List list);
    //运营商后台删除商品，更新solr
    public void deleteByGoodsIds(List goodsIds);

}
