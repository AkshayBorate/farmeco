package com.farmeco.serviceAbs;

import com.farmeco.entity.Farmer;

import java.util.Collection;
import java.util.Optional;

public interface FarmerService {
    Farmer registerFarmer(Farmer farmer);
    Collection<Farmer> loginFarmer();
	Farmer getDetail(long id);
	Farmer update(long id ,Farmer farmer);
	
}
