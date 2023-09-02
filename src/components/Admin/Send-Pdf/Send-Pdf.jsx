
import { Component } from "react";
import './Send-Pdf.css';
import { postFoodDetails,updateFoodDetails } from '../../../store/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class SendPdf  extends Component {
    constructor() {
        super();
        this.state = {
            title: "Receipt",
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

               
                <p>This me {fields.name}</p>
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
export default connect(mapStateToProps, mapDispatchToProps)(SendPdf);



