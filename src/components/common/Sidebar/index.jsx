import "./style.css";

import {
  FiGrid,
  FiPhone,
  FiServer,
  FiDollarSign,
  FiDatabase
} from "react-icons/fi";

const menus = [

  {
    id: "dashboard",
    title: "Dashboard",
    icon: <FiGrid />
  },

  {
    id: "livecalls",
    title: "Live Calls",
    icon: <FiPhone />
  },

  {
    id: "api",
    title: "API Monitor",
    icon: <FiServer />
  },

  {
    id: "revenue",
    title: "Revenue",
    icon: <FiDollarSign />
  },

  {
    id: "inventory",
    title: "Inventory",
    icon: <FiDatabase />
  }

];

function Sidebar({

  activePage,

  setActivePage

}){

return(

<aside className="sidebar">

<div className="logo">

<div className="logo-circle">

VA

</div>

<div>

<h2>Voice Admin</h2>

<p>Management Portal</p>

</div>

</div>

<nav>

{

menus.map((menu)=>(

<div

key={menu.id}

className={

activePage===menu.id

?

"menu active"

:

"menu"

}

onClick={()=>setActivePage(menu.id)}

>

<div className="menu-icon">

{menu.icon}

</div>

<span>

{menu.title}

</span>

</div>

))

}

</nav>

</aside>

);

}

export default Sidebar;