package com.farmeco.serviceAbs;

import com.farmeco.entity.Farmer;
import com.farmeco.entity.WasteDetails;
import java.util.List;
import java.util.Optional;

public interface WasteDetailsService {
	String saveWasteDetails(String name, String email, String mobileNo, String address,
            String wasteType, long farmerId, String imagePath);
	  List<WasteDetails> getOrdersByFarmerId(long farmerId);
	  WasteDetails updateStatus(long id,WasteDetails details);
	  WasteDetails updateStatusOnly(long id, WasteDetails details);
}
