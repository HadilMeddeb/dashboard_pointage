import React from 'react';
import './Sidebar.css';
import {Link } from 'react-router-dom';
import data from './sidebarItemsData';
import { FaCode } from 'react-icons/fa'

function Sidebar()
{
return(
    <section className="sidebar">
       <div className="sidebar-brand">
          <h2><span className="logo"><FaCode/></span><span>ACOBA</span></h2>  
       </div> 
       <div className="sidebar-menu">
           <ul>
           {data.map((item)=>{return <li key={item.title}><Link className={item.className} to={item.path}><span>{item.icon}</span><span className="item-title">{item.title}</span></Link></li>})} 
           </ul>

       </div>
    </section>);

}
export default Sidebar;