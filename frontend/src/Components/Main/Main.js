import React from 'react';
import './Main.css';
import { FiMenu } from "react-icons/fi";
import { BiSearchAlt2 } from "react-icons/bi";
import {Route,Switch} from 'react-router-dom';
import Employees from '../../Pages/Employees/Employees';
import AddEmployee from '../../Pages/Employees/AddEmployee/AddEmployee';
import Departements from '../../Pages/Departements/Departements';
import Sendmail from '../../Pages/Sendmail/Sendmail';
import Posts from '../../Pages/Posts/Posts';
import { Avatar, makeStyles } from '@material-ui/core';




const useStyleAvatar = makeStyles((theme) => ({
  root: {
      display: 'flex',
      '& > *': {
          margin: theme.spacing(1),
      },
  },
  small: {
      width: theme.spacing(5),
      height: theme.spacing(5),
  },

  large: {
      width: theme.spacing(12),
      height: theme.spacing(12),
  },
}))

function Main()
{
  const avatarclass = useStyleAvatar()
return(
    <section className="main-content">
      <header className="main-header">
            <div className="header-left row"><FiMenu className="ft-lg-bld pointer"/><h2 className="pd-lf">Dashboard</h2></div>
            <div className="header-left search">
              <input type="text" placeholder="Search here ..."/>
              <BiSearchAlt2/>
            </div>
            <div className="header-left row">
            <Avatar src="/static/images/avatar/1.jpg" style={{marginRight:"10px"}}className={avatarclass.small} />
            <div><h2>ACOBA</h2>
            <p>Admin</p></div>
            </div>
      </header>
      <div className="container">
      <Switch>
         <Route path="/dashboard/Employees"><Employees/></Route>
         <Route path="/dashboard/EmployeesAdd"><AddEmployee/></Route>
         <Route path="/dashboard/Departements"><Departements/></Route>
         <Route path="/dashboard/sendmail"><Sendmail/></Route>
         <Route path="/dashboard/sendmail:email"><Sendmail/></Route>
         <Route path="/dashboard/posts"><Posts/></Route>

     </Switch>
      </div>
    </section>);

}
export default Main;