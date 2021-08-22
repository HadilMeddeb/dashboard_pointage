import React from'react';
import { TiGroup} from "react-icons/ti";
import {FaHome} from 'react-icons/fa';
import {MdWork,MdEmail} from "react-icons/md";
import {RiSettings5Fill} from "react-icons/ri"
import {BsCardText} from "react-icons/bs"


const data=
[
{
    
 title:"home",
 path:"/Home",
 icon:<FaHome/>,
 className:"sidebar-list-item",    
},
{
 title:"Employees",
 path:"/dashboard/Employees",
 icon:< TiGroup/>,
 className:"sidebar-list-item",    
},
{
    title:"Departement",
    path:"/dashboard/Departements",
    icon:<MdWork/>,
    className:"sidebar-list-item",    
},
{
 title:"Profile",
 path:"/dashboard/profile",
 icon:<RiSettings5Fill/>,
 className:"sidebar-list-item",    
},
    {
 title:"Send Email",
 path:"/dashboard/sendmail",
 icon:<MdEmail/>,
 className:"sidebar-list-item",    
},
{
    title:"Posts",
    path:"/dashboard/posts",
    icon:<BsCardText/>,
    className:"sidebar-list-item",    
   },

   {
    title:"Pointage",
    path:"/pointage",
    icon:<BsCardText/>,
    className:"sidebar-list-item",    
   },



]



export default data;