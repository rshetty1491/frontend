import { Component } from "react";
import './Footer.css';


class Footer extends Component {
    constructor() {
        super();
        this.state = {
            date: ''
        }
    }

    componentDidMount(){
        this.getCurrentDate();
    }
    
    render() {
        return (
            <div className="navbar navbar-expand-lg fixed-bottom navbar-dark bg-dark ">

                <footer id="colophon" className="site-footer" role="contentinfo">
                    <div ><p><i className="bi bi-calendar-fill"></i>{this.state.date}</p> </div>
                    <div className="social-wrapper">
                        <nav className="footer-nav" role="navigation">
                            <p>Copyright &copy; 2022-ZF LTD All rights reserved.</p>
                        </nav>
                        <ul>
                            <li>
                                <a href="#" target="_blank">
                                    <img src="https://cdn1.iconfinder.com/data/icons/logotypes/32/twitter-128.png" alt="Twitter Logo" className="twitter-icon" /></a>
                            </li>
                            <li>
                                <a href="#" target="_blank">
                                    <img src="https://www.mchenryvillage.com/images/instagram-icon.png" alt="Instagram Logo" className="instagram-icon" /></a>
                            </li>

                            <li>
                                <a href="#" target="_blank">
                                    <img src="http://www.iconarchive.com/download/i54037/danleech/simple/facebook.ico" alt="Facebook Logo" className="facebook-icon" /></a>
                            </li>
                            <li>
                                <a href="#" target="_blank">
                                    <img src="http://icons.iconarchive.com/icons/marcus-roberto/google-play/256/Google-plus-icon.png" alt="Googleplus Logo" className="googleplus-icon" /></a>
                            </li>
                            <li>
                                <a href="#" target="_blank">
                                    <img src="https://lh3.googleusercontent.com/j_RwVcM9d47aBDW5DS1VkdxUYCkDUCB6wZglv4x-9SmsxO0VaFs7Csh-FmKRCWz9r_Ef=w170" alt="Youtube Logo" className="youtube-icon" /></a>
                            </li>
                            <li>
                                <a href="#" target="_blank">
                                    <img src="http://www.iconarchive.com/download/i94258/designbolts/vector-foursquare/Foursquare-2.ico" alt="Foursquare Logo" className="foursquare-icon" /></a>
                            </li>
                        </ul>
                    </div>


                </footer>

            </div>
        )
    }

    getCurrentDate(){
        setInterval(()=>{
            const currentdate = new Date();
            const datetime =  " "+  currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
        this.setState({
            date:datetime
        })

        },1000)
    }
}

export default Footer;