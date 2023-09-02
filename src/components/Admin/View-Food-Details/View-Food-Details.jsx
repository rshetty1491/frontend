import { Component } from "react";
import "./View-Food-Details.css";
import { getFoodDetails, deleteFoodDetails } from "../../../store/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddFoodDetails from "../Add-Food-Details/Add-Food-Details";
import SendPdf from "../Send-Pdf/Send-Pdf";
import ExcelExport from "../ExportToExcel";
import jsPDF from "jspdf";
import { CSVLink } from "react-csv";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";

class ViewFoodDetails extends Component {
  constructor() {
    super();
    this.state = {
      foodDetails: [],
      setUpdateDetails: {},
      setDeleteFDID: "",
      name: "",
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (props) {
      return {
        foodDetails: props.foodDetails,
      };
    }
    return null;
  }

  componentDidMount() {
    this.props.getFoodDetails();
  }
  render() {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheet.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const { params } = this.props.match;
    return (
      <section className="food-details-section">
        <h2>{params.page} Food Details</h2>
        {this.renderTable(params.page)}
        {this.renderDeleteModal()}
        {this.renderUpdateModal()}
        {this.renderSendPdfModal()}
        {this.renderExportExcel()}
      </section>
    );
  }

  toggleDeleteModal(id) {
    this.setState({
      setDeleteFDID: id,
    });
  }

  toggleUpdateModal(id) {
    this.state.foodDetails.filter((data) => {
      if (id === data._id) {
        this.setState({
          setUpdateDetails: data,
          name: data.name,
        });
      }
    });
  }

  dispatchDeleteFoodDetails(id) {
    this.props.deleteFoodDetails(id);
    window.location.reload();
  }

  dispatchPDF() {
    var doc = new jsPDF("p", "pt", "a4");
    doc.html(document.querySelector("#test"), {
      callback: function (pdf) {
        pdf.save("mypdf.pdf");
      },
    });
  }

  dispatchExcel() {
    console.log(this.props.foodDetails);
    const wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(this.props.foodDetails);
    XLSX.utils.book_append_sheet(wb, ws, "sheet1");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    //XLSX.write(wb, "test.xslx");
      const data = new Blob([excelBuffer],{type:'application/vnd.openxmlformats-officedocument.spreadsheet.sheet;charset=UTF-8'});
      FileSaver.saveAs(data,"test"+'.xlsx');
  }

  renderUpdateModal() {
    return (
      <div
        className="modal fade"
        id="updateModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Provide Updated Details{" "}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <AddFoodDetails
                title="true"
                showUpdateButton="true"
                foodRecordsFromProps={this.state.setUpdateDetails}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderDeleteModal() {
    return (
      <div
        className="modal fade"
        id="deleteModal"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Confirm Delete Food Details
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to Delete?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() =>
                  this.dispatchDeleteFoodDetails(this.state.setDeleteFDID)
                }
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderSendPdfModal() {
    return (
      <div
        className="modal fade"
        id="pdfModal"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body" id="test">
              <p>Hi {this.state.name}</p>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.dispatchPDF()}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderExportExcel() {
    return (
      <div
        className="modal fade"
        id="excel"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body" id="test">
              <p>EXPORT EXCEL</p>
            </div>

            <div className="modal-body">
              <button
                type="button"
                className="btn btn-success"
                data-toggle="modal"
                data-target="#excel"
                data-placement="top"
                title="Export Excel"
                onClick={() => this.dispatchExcel()}
              ></button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderTable(page) {
    if (this.state.foodDetails && this.state.foodDetails.length > 0) {
      return (
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">SL No</th>
              <th scope="col">Name</th>
              <th scope="col">Flat No</th>
              <th scope="col">Building Name</th>
              <th scope="col">Amount</th>
              {this.renderActionHeader(page)}
            </tr>
          </thead>
          <tbody>
            {this.state.foodDetails.map((record, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{record.name}</td>
                  <td>{record.flatNo}</td>
                  <td>{record.buildingName}</td>
                  <td>{record.amount}</td>

                  {this.renderActionButton(page, record._id)}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
  }

  renderActionHeader(page) {
    if (page !== "View") {
      return <th scope="col">Action</th>;
    } else {
      return null;
    }
  }

  renderActionButton(page, id) {
    if (page === "Update") {
      return (
        <td>
          <button
            type="button"
            className="btn btn-default"
            data-toggle="modal"
            data-target="#updateModal"
            data-placement="top"
            title="Update Food Details"
            onClick={() => this.toggleUpdateModal(id)}
          >
            <i className="bi bi-pencil"></i>
          </button>
        </td>
      );
    } else if (page === "Delete") {
      return (
        <td>
          <button
            type="button"
            className="btn btn-danger"
            data-toggle="modal"
            data-target="#deleteModal"
            data-placement="top"
            title="Delete Food Details"
            onClick={() => this.toggleDeleteModal(id)}
          >
            <i className="bi bi-x"></i>
          </button>
        </td>
      );
    } else if (page === "SendPdf") {
      return (
        <td>
          <button
            type="button"
            className="btn btn-danger"
            data-toggle="modal"
            data-target="#pdfModal"
            data-placement="top"
            title="Send PDF"
          >
            <i
              className="bi bi-x"
              onClick={() => this.toggleUpdateModal(id)}
            ></i>
          </button>
        </td>
      );
    } else if (page === "ExcelSheet") {
      return (
        <td>
          <button
            type="button"
            className="btn btn-success"
            data-toggle="modal"
            data-target="#excel"
            data-placement="top"
            title="Export Excel"
          ></button>
        </td>
      );
    } else {
      return null;
    }
  }
}

function mapStateToProps(state) {
  return {
    foodDetails: state.foodDetails,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getFoodDetails, deleteFoodDetails }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewFoodDetails);
