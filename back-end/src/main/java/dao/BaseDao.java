package dao;

import dto.BaseDto;

import java.util.List;

public interface BaseDao<P extends BaseDto> {

    public void put(P p);

    public P get(String id);

    List<P> getAll();

}
