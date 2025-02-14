import React, { useRef, useState } from "react";
import "./EmployeeRegister.css";

export default function EmployeeRegister() {
  const [role, setRole] = useState("employee");
  const [task, setTask] = useState("register");
  const fullNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const mobileRef = useRef();
  const dateRef = useRef();
  const confirmPasswordRef = useRef();
  const salaryRef = useRef();
  const deleteEmailRef = useRef();

  const handleRegisterUser = (event) => {
    event.preventDefault();

    const name = fullNameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const mobileNo = mobileRef.current.value.trim();
    const joiningDate = dateRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const confirmPassword = confirmPasswordRef.current.value.trim();
    const salary = role === "employee" ? parseFloat(salaryRef.current.value.trim()) : 0;

    if (!name || !email || !mobileNo || !joiningDate || !password || !confirmPassword || (role === "employee" && salary === 0)) {
      alert("All fields are required!");
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      alert("Please enter a valid full name!");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(mobileNo)) {
      alert("Please enter a valid mobile number!");
      return;
    }
    if (!/^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})$/.test(email)) {
      alert("Please enter a valid email!");
      return;
    }
    if (!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$])[A-Za-z0-9@#$]{6,12}$/.test(password)) {
      alert("Password must be 6-12 characters, with at least one digit, one lowercase, one uppercase, and one special character (@, #, $)");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const data = role === "employee"
      ? { name, email, mobileNo, joiningDate, salary, password, role: role.toUpperCase() }
      : { name, email, mobileNo, joiningDate, password, role: role.toUpperCase() };

    fetch("http://localhost:8085/api/employee/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 409) {
          return response.json().then((text) => {
            throw new Error(text.message || "User already exists!");
          });
        }
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        alert(`${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully!`);
        fullNameRef.current.value = "";
        emailRef.current.value = "";
        mobileRef.current.value = "";
        dateRef.current.value = "";
        if (role === "employee") salaryRef.current.value = "";
        passwordRef.current.value = "";
        confirmPasswordRef.current.value = "";
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleDeleteUser = (event) => {
    event.preventDefault();

    const emailToDelete = deleteEmailRef.current.value.trim();

    if (!emailToDelete) {
      alert("Please provide an email to delete!");
      return;
    }

    fetch("http://localhost:8085/api/employee/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: emailToDelete }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.text();
      })
      .then((message) => {
        alert(message);
        deleteEmailRef.current.value = "";
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="employee-register-wrapper">
      <div className="employee-register-card">
        <h2 className="form-header">Task Selection</h2>
        <select className="input-field" value={task} onChange={(e) => setTask(e.target.value)}>
          <option value="register">Register User</option>
          <option value="delete">Delete User</option>
        </select>

        {task === "register" && (
          <div>
            <h2 className="form-header">Register User</h2>
            <form className="employee-register-form" onSubmit={handleRegisterUser}>
              <select className="input-field" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>

              <input className="input-field" type="text" placeholder="Full Name" ref={fullNameRef} />
              <input className="input-field" type="email" placeholder="Email" ref={emailRef} />
              <input className="input-field" type="tel" placeholder="Mobile Number" ref={mobileRef} />
              <input className="input-field" type="date" placeholder="Joining Date" ref={dateRef} />
              {role === "employee" && <input className="input-field" type="number" placeholder="Salary" ref={salaryRef} min="0" />}
              <input className="input-field" type="password" placeholder="Password" ref={passwordRef} />
              <input className="input-field" type="password" placeholder="Confirm Password" ref={confirmPasswordRef} />
              <button type="submit" className="submit-btn">Register User</button>
            </form>
          </div>
        )}

        {task === "delete" && (
          <div>
            <h2 className="form-header">Delete User</h2>
            <form className="employee-register-form" onSubmit={handleDeleteUser}>
              <input className="input-field" type="email" placeholder="Enter Email to Delete" ref={deleteEmailRef} />
              <button type="submit" className="submit-btn">Delete User</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

