import React, { useState } from 'react';
import { withAuth } from '../hocs/AuthContext';
import { userProfile } from '../services/api.service';

const initForm = {
  username: null,
  password: null
};

function Login (props) {
  let [form, setForm] = useState(initForm);
  let [pageData, setPageData] = useState({});

  const submitForm = () => {
    props.auth.login(form.username, form.password);
  };

  const onChange = e => {
    setForm(Object.assign({}, { ...form }, {
      [e.target.name]: e.target.value,
    }));
  };

  const logout = () => {
    props.auth.logout();
  };

  const getData = async () => {
    try {
      const data = await userProfile();
      setPageData(data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log('FORM', form);
  
  return (
    <div>
      <div>
        <input type='text' name='username' onChange={onChange}  />
      </div>
      <div>
        <input type='text' name='password' onChange={onChange} />
      </div>
      <button onClick={submitForm}>Submit</button>
      <button onClick={logout}>Logout</button>
      <button onClick={getData}>Get Profile</button>
      {props.auth.error &&
        <div>{ props.auth.error.message}</div>
      }
      {pageData &&
        <div>{JSON.stringify(pageData)}</div>
      }
    </div>
  );
}

export default withAuth(Login);