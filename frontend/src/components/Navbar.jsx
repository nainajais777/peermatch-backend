import { useSelector } from "react-redux";
const Navbar= ()=>{
 const user=useSelector((store) => store.user);
console.log("Navbar",user);
            console.log("from navbar",user?.PhotoUrl);
            console.log("from navbar",user?.user?.PhotoUrl);

    return(
<div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">Peer Match</a>
  </div>
  <div className="flex gap-2">
    {user && (<div className="dropdown dropdown-end">
      <p>Welcome,{user.user.FirstName}</p>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="user_photo"
            src={user?.user?.PhotoUrl} />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
)}
  </div>
</div>
    );
}
export default Navbar;

