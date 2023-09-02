import { Component } from "react";
import { connect } from 'react-redux';
import './Notification.css';

class Notification extends Component {
    constructor() {
        super();
        this.state = {
            status: '',
            message: '',
          
        }
    }



    render() {
        return (
            this.returnTemplate()
        );
    }

    static getDerivedStateFromProps(props, state) {
        if (props && props.response) {

            return {
                status: props.response.status,
                message: props.response.message,
               
            };
        }
        return null

    }


    returnTemplate() {

        if (this.state.status == 200) {
            return (
                <div className="alert alert-success" role="alert" >
                    {this.state.message}
                </div>
            )
        } else if (this.state.status > 200) {
            return (

                <div className="alert alert-danger basic-transition" role="alert" >
                    {this.state.message}
                </div>)
        }
        else {
            return null;
        }
    }

}



function mapStateToProps(state) {

    return {
        response: state.response,
     
    }
}


export default connect(mapStateToProps, null)(Notification);

