import React, { useState, useEffect } from "react";
import { Switch } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import PrivateRoute from "./components/auth/PrivateRoute";
import NavBar from "./components/NavBar";
import axios from "axios";
// import Layout from "./components/dashboard/Layout";
// import Dashboard from "./components/dashboard/index";
// import Dashboard from "./components/dashboard/Dashboard";
import Tasks from "./views/tasks/Tasks";
import Documents from "./components/documents/Documents"
import Projects from "./components/projects/Projects";
import IndividualProject from "./components/projects/IndividualProject";
import Logout from "./components/auth/Logout";
import Layout from "./layouts/Layout";
import Dashboard from "./components/dashboard/Dashboard";
import DelayLog from "./components/delayLog/DelayLog";

//SWITCH INDEX TO DASHBOARD AFTER LC CHANGES HIS FILE NAME

//context
import UserContext from "./contexts/UserContext";
import SearchTermContext from './contexts/searching/searchTerm'
import TaskProvider from "./contexts/tasks/TaskProvider";
import OpenContext from "./contexts/projects/OpenContext";
import PathnameContext from './contexts/PathnameContext';
import ProjectsProvider from "./contexts/projects/ProjectsProvider";
import { axiosWithAuth } from "./utils/auth/axiosWithAuth";

//AUTH0
import Auth from "./components/auth/auth";
import AuthNavBar from "./components/auth/authNavBar";
import Callback from "./components/auth/callback";
import Uploader from './components/documents/upload'

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pathname, setPathname] = useState(window.location.pathname);
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axiosWithAuth()
      .get("/projects")
      .then(res => setUserInfo(res.data))
      .catch(error => console.log(error));
  };
  console.log(userInfo);

  const navLinks = [
    {
      text: "Home",
      path: "/dashboard",
      icon: "ion-ios-home"
    },
    {
      text: "Projects",
      path: "/projects",
      icon: "ion-ios-construct"
    },
    {
      text: "Tasks",
      path: "/tasks",
      icon: "ion-ios-notifications"
    },
    {
      text: "Documents",
      path: "/documents",
      icon: "ion-ios-document"
    },
    {
      text: "Templates",
      path: "/templates",
      icon: "ion-ios-menu"
    },
    {
      text: "Delay Log",
      path: "/delay-log",
      icon: "ion-ios-hourglass"
    },
    {
      text: "Log Out",
      path: "/log-out",
      icon: "ion-ios-cog"
    },
    {
      text: "Help",
      path: "/help",
      icon: "ion-ios-help-circle-outline"
    }
  ];

  return (
    <Router>
      <ProjectsProvider>
        <TaskProvider>
          <SearchTermContext.Provider value={{searchTerm, setSearchTerm}}>
          <OpenContext.Provider value={{ open, setOpen }}>
            <PathnameContext.Provider value = {{pathname, setPathname}}>
            <UserContext.Provider value={{ userInfo, setUserInfo }}>
              <NavBar setPathname={setPathname} navLinks={navLinks} />
              <Layout pathname={pathname}>
                <Switch>
                  <Route exact path="/auth" component={Auth} />
                  <Route exact path="/navbar" component={AuthNavBar} />
                  <Route exact path="/callback" component={Callback} />
                  <Route exact path="/login" component={Login} />
                  {/* <Route exact path="/signup" component={Signup} /> */}
                  <Route exact path="/log-out" component={Logout} />
                  {/*   */}
                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route exact path="/tasks" component={Tasks} />
                  <Route exact path="/projects" component={Projects} />
                  <Route exact path="/documents" component={Documents}/>
                  <Route exact path="/documents/add" component={Uploader}/>
                  <Route
                    exact
                    path="/project/:id"
                    component={IndividualProject}
                  />
                  <Route exact path="/delay-log" component={DelayLog} />
                </Switch>
              </Layout>
            </UserContext.Provider>
            </PathnameContext.Provider>
          </OpenContext.Provider>
          </SearchTermContext.Provider>
        </TaskProvider>
      </ProjectsProvider>
    </Router>
  );
}

export default App;
