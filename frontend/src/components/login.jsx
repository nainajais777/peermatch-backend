import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
//import { addUser } from "/home/naina/PeerMatch/frontend/utils/userSlice"
import { addUser } from "../../utils/userSlice";
import { BASE_URL } from "../../utils/constants";
const Login = () =>{

const [forms,setForms]=useState({
  email:'',
  password:''  
});
const dispatch=useDispatch();
const [submit,setSubmit]=useState('');

function handleInput(e)
{
  setForms(prev=>({
    ...prev,
   [e.target.name]:e.target.value,
  })
);
}
function handleSubmit(e)
{
   e.preventDefault();
     if(forms.email === '') {
    alert('Email required!')
    return
  }
  if(forms.password === '') {
    alert('Password required!')
    return
  }
  axios.post(`${BASE_URL}/auth/login`,{
    emailId: forms.email,     //  backend name similar 
    Password: forms.password  
  }, {
  withCredentials: true   // for http to work
})
  .then(res=>
  {
    console.log(res.data);
    dispatch(addUser(res.data));
    alert("Login successful");
  })
  .catch(err => {
    console.log(err.response?.data);
    alert("Login failed");
  });
  console.log(forms)
    console.log("submitted");
}

    return(
<div className="flex justify-center">
<form onSubmit={handleSubmit}>
<fieldset className="fieldset border-base-800 rounded-box w-xs border p-8 ">
  <legend className="fieldset-legend">Login</legend>

  <label className="label">Email</label>
  <input type="email" name="email" value={forms.email} onChange={handleInput} className="input" placeholder="Email" />

  <label className="label">Password</label>
  <input type="password" name="password" value={forms.password} onChange={handleInput} className="input" placeholder="Password" />

  <button type="submit" className="btn btn-neutral mt-4">Login</button>
</fieldset>
</form>
    </div>
);
}
export default Login;