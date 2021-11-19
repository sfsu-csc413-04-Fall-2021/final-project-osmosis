package dao;

import dto.BasePaymentDto;

import java.util.List;

public interface BaseDao<P extends BasePaymentDto> {

    public void put(P p);

    public P get(String id);

    List<P> getAll();

}
