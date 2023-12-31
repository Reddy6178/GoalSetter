import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

function Register() {
  const [formData,setFormData] = useState({
    name : '',
    email : '',
    password : '',
    password2 : ''
  });
  const {name, email, password, password2} = formData;

  const onChange = (e) =>{
    setFormData((prevState) =>({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  };

  const onSubmit = (e) =>{
    e.preventDefault();

  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p> Please Create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              id="name"
              type="text"
              name="name"
              value={name}
              className="form-control"
              onChange={onChange}
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              className="form-control"
              onChange={onChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              className="form-control"
              onChange={onChange}
              placeholder="Enter your password"
            />
          </div>

          <div className="form-group">
            <input
              id="password2"
              type="password"
              name="password2"
              value={password2}
              className="form-control"
              onChange={onChange}
              placeholder="Confirm your password"
            />
          </div>

          <div className="formgroup">
            <button type="submit" className="btn btn-block">Submit</button>
          </div>

        </form>
      </section>
    </>
  )
}

export default Register;