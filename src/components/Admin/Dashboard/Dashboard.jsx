import { Component } from "react";
import { NavLink } from "react-router-dom";

import "./Dashboard.css";

class AdminDashboard extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <section className="dashboard-section">
        <ul className="list-group-horizontal">
          <li className="list-group-item">
            <i className="bi bi-menu-button-wide-fill"></i>
          </li>
          <li className="list-group-item">
            <button type="button" className="btn btn-primary">
              {" "}
              <NavLink className="link" to="/addFoodDetails">
                Add Records
              </NavLink>
            </button>
          </li>
          <li className="list-group-item">
            {" "}
            <button type="button" className="btn btn-success">
              <NavLink className="link" to="/foodDetails/View">
                View Records
              </NavLink>
            </button>
          </li>
          <li className="list-group-item">
            <button type="button" className="btn btn-warning">
              <NavLink className="link" to="/foodDetails/Update">
                Update Records
              </NavLink>
            </button>
          </li>
          <li className="list-group-item">
            <button type="button" className="btn btn-danger">
              <NavLink className="link" to="/foodDetails/Delete">
                Delete Records
              </NavLink>
            </button>
          </li>
          <li className="list-group-item">
            <button type="button" className="btn btn-danger">
              <NavLink className="link" to="/foodDetails/SendPdf">
                Send PDF
              </NavLink>
            </button>
          </li>
          <li className="list-group-item">
            <button type="button" className="btn btn-danger">
              <NavLink className="link" to="/foodDetails/ExcelSheet">
                Export Excel
              </NavLink>
            </button>
          </li>
        </ul>
       
       
      </section>
    );
  }
}

export default AdminDashboard;
