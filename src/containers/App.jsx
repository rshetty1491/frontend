import AdminDashboard from "../components/Admin/Dashboard/Dashboard";
import Footer from "../components/Common/Footer/Footer";
import Header from "../components/Common/Header/Header";
import "./App.css";
import axios from "axios";
import React from "react";

import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import AddFoodDetails from "../components/Admin/Add-Food-Details/Add-Food-Details";
import ViewFoodDetails from "../components/Admin/View-Food-Details/View-Food-Details";
import Notification from "../components/Common/Notification/Notification";

const routing = (
  <Router>
    <Switch>
      <Route exact={true} path="/">
        <Redirect to="/dashboard" />
      </Route>
      <Route exact={true} path="/dashboard" component={AdminDashboard} />
      <Route exact={true} path="/addFoodDetails" component={AddFoodDetails} />
      <Route
        exact={true}
        path="/foodDetails/:page?"
        component={ViewFoodDetails}
      />
    </Switch>
  </Router>
);

function App() {
  const [data, setData] = React.useState([]);
  const fileName = "myfile"; // here enter filename for your excel file

  React.useEffect(() => {
    const fetchData = () => {
      axios.get("http://localhost:3003/viewfooddetails").then((postData) => {
        // reshaping the array
        console.log("hi");
      //  const customHeadings = postData.json((item) => ({
      //    "Article Id": item.name,
      //    "Article Title": item.flatNo,
     //   }));

        setData(postData);
      });
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <Notification />
      <Header />
     
      {routing}
      <Footer />
    </div>
  );
}

export default App;
