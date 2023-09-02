
import { Component } from "react";
import './Add-Food-Details.css';
import { postFoodDetails,updateFoodDetails } from '../../../store/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class AddFoodDetails  extends Component {
    constructor() {
        super();
        this.state = {
            title: "Add Food Details",
            fields: {
                name: "",
                flatNo: "",
                buildingName: "",
                amount: ""
            
            },
            errors: {
                name: "",
                flatNo: "",
                buildingName: "",
                amount: ""
            },
            response: "",
            addNewFoodDetails: '',
        }
    }

    validate = (name, value) => {
        switch (name) {
            case "name":
                if (!value) {
                    return "Restuarant Name is Required";
                } else {
                    return "";
                }
            case "flatNo":
                if (!value) {
                    return "Restuarant address is Required";
                } else {
                    return "";
                }
            case "BuildingName":
                if (!value) {
                    return "Food name is Required";
                } else if (!value.match(/^[a-zA-Z]+$/g)) {
                    return "Please enter valid Food name";
                } else {
                    return "";
                }

            case "amount":
                if (!value) {
                    return "Food Cost Field is Required";
                } else if (!value.match(/^[0-9]+$/g)) {
                    return "Please enter valid Food Cost";
                } else {
                    return "";
                }
            default: {
                return "";
            }
        }
    }

    handleUserInput = event => {
        this.setState({
            errors: {
                ...this.state.errors,
                [event.target.name]: this.validate(event.target.name, event.target.value)
            },
            fields: {
                ...this.state.fields,
                [event.target.name]: event.target.value
            }
        })
    }

    handleSubmit = event => {
        const { fields } = this.state;
        event.preventDefault();
        let validationErrors = {};

        Object.keys(fields).forEach(name => {
            const error = this.validate(name, fields[name]);
            if (error && error.length > 0) {
                validationErrors[name] = error;
            }
        });
        if (Object.keys(validationErrors).length > 0) {
            this.setState({ errors: validationErrors });
            return;
        }
        if ( fields.name && fields.flatNo && fields.buildingName  && fields.amount) {
            let data = { ...fields };
           
            if(!this.props.showUpdateButton){
                this.props.postFoodDetails(data)
            }else{
                data.id = this.props.foodRecordsFromProps._id
                this.props.updateFoodDetails(data);
                window.location.reload();
            }    


            this.setState({
                fields: {
                    name: "",
                    flatNo: "",
                    buildingName: "",
                    amount: ""
                
                }
            })
        }
    }

    static getDerivedStateFromProps(props, state) {

        if (props) {
            return {
                isLoaded: props.isLoaded,
                response: props.response,
                foodRecords:props.foodRecordsFromProps
            };
        }
        return null

    }
   
    render() { 
        const { fields, errors, title } = this.state;
        return (
            <section className="add-food-details-section">
                <h1>{this.props.title ? "" : title}</h1>

                <form autoComplete="off" onSubmit={event => this.handleSubmit(event)}>
                    <div className="master-form-group">
                        <input type="text" name="name" value={fields.name} placeholder="Enter Name" className={"master-input " + (errors.name ? 'master-input-error' : '')}
                            onChange={event => this.handleUserInput(event)} />
                        <p className="text-danger">{errors.name}</p>
                    </div>
                    <div className="master-form-group">
                        <input type="text" name="flatNo" value={fields.flatNo} placeholder="Enter Flat Number" className={"master-input " + (errors.flatNo ? 'master-input-error' : '')}
                            onChange={event => this.handleUserInput(event)} />
                        <p className="text-danger">{errors.flatNo}</p>
                    </div>
                    <div className="master-form-group">
                        <input type="text" name="buildingName" value={fields.buildingName} placeholder="Enter Building Name" className={"master-input " + (errors.buildingName ? 'master-input-error' : '')}
                            onChange={event => this.handleUserInput(event)} />
                        <p className="text-danger">{errors.buildingName}</p>
                    </div>
                   
                    <div className="master-form-group">
                        <input type="number" name="amount" value={fields.amount} placeholder="Enter Amount" className={"master-input " + (errors.amount ? 'master-input-error' : '')}
                            onChange={event => this.handleUserInput(event)} />
                        <p className="text-danger">{errors.amount}</p>
                    </div>
                    {!this.props.showUpdateButton ?
                        <div className="master-form-group master-center">
                            <button className="btn btn-primary" onClick={event => this.handleSubmit(event)}>Add Records</button></div>
                        : <div className="master-form-group master-center">
                            <button className="btn btn-primary" onClick={event => this.handleSubmit(event)}>Update Records</button></div>

                    }
               
                </form>

            </section>
        )
    }
}
 
function mapStateToProps(state) {

    return {
        isLoaded: state.isLoaded,
        response: state.response
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ postFoodDetails,updateFoodDetails }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(AddFoodDetails);



