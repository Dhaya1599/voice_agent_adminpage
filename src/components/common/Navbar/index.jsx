import "./style.css";

import {

FiBell,

FiSearch,

FiSettings,

FiUser

} from "react-icons/fi";

function Navbar(){

return(

<header className="navbar">

<div className="navbar-left">

<h2>

Voice Agent Dashboard

</h2>

</div>

<div className="navbar-right">

<div className="search-box">

<FiSearch/>

<input

placeholder="Search..."

/>

</div>

<div className="nav-icon">

<FiBell/>

</div>

<div className="nav-icon">

<FiSettings/>

</div>

<div className="profile">

<div className="avatar">

<FiUser/>

</div>

<div>

<h4>

Roshini

</h4>

<p>

Administrator

</p>

</div>

</div>

</div>

</header>

);

}

export default Navbar;