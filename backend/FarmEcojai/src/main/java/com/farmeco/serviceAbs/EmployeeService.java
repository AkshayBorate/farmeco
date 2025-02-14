package com.farmeco.serviceAbs;


import com.farmeco.entity.Employee;
import com.farmeco.entity.Farmer;

import java.util.Collection;
import java.util.Optional;

public interface EmployeeService {
   Employee registeremp(Employee employee);
    Collection<Employee> loginemp();
}

