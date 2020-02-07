import React, { Component } from "react";
import Img from "../../Image/1.jpg";
import userIcon from "../../Image/user.png";
import passwordIcon from "../../Image/password.png";
import jwt_decode from "jwt-decode";
import { connect } from "react-redux";
import {login, logout} from '../../Action/loginAction'
import "./styles.css";
import getIp from "../../Utility/getIp";
import setAuthToken from "../../Utility/setauth";
import Modal from '../../UI/Modal/messageModal';
import Routes from '../../config/Route';
import Axios from "axios";
import LoginValidation from '../../Validation/LoginValidation'
 class Login extends Component {
  state = {
    ip: null,
    data: "",
    permission: "",
    errors: "",
    email: "",
    message: "",
    show: false,
    alertVariant: "danger"
  };
  async componentDidMount(){
    this.setState({ip : await getIp()});
    if(localStorage.token){
      setAuthToken(localStorage.token);
      const decode = jwt_decode(localStorage.token);
      if(decode.exp < Date.now()/1000){
        localStorage.removeItem("token");
        this.props.logout();
        this.props.history.replace(Routes.MAIN_LOGIN)
        return true;
      }else{
        this.props.login();
        if(this.props.loginData.login){
          this.props.history.push(Routes.DASHBOARD)
        }
      }
    }
  }
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      console.log(this.state);
    });
  };

  login = async e=>{
    e.preventDefault();
    console.log("e",e.target.password.value)
    this.setState({email:e.target.email.value})
    const data={
      email:e.target.email.value,
      password:e.target.password.value,
      ip:this.state.ip
    };
    const {errors, isValid} = LoginValidation(data);
    if(isValid){
      await Axios.post("http://localhost:5000/api/users/login",data).then(res=>{
        if(res.data.type==="success"){
          localStorage.setItem("token",res.data.token);
          const decode = jwt_decode(res.data.token);
          this.props.login();
          this.props.history.push(Routes.DASHBOARD)
        }else if(res.data.type==="error"){
          this.setState({message:res.data.message},()=>{
            this.showAlerts()
          });
          this.props.history.replace(Routes.MAIN_LOGIN)
        }
      })
    }else{
      this.setState({errors})
    }    
  }
  showAlerts = () => {
    this.setState({ show: true });
  };
  modalClose = () => {
    this.setState({ show: false });
  };
  render() {
    let { errors } = this.state;

    return (
      <>
      <div className="login">
        <div className="login-box">
          <div className="form-area">
            <div className="welcome-text">Welcome to</div>
            <div className="infinity">Pragya Resturant System</div>
            <div className="login-description">Login. We Make work Easy</div>
            <div
              style={{ width: "100%", margintop: "100px", marginRight: "40px" }}
            >
              <form onSubmit={this.login}>
                <div className="input-field">
                  <img
                    style={{
                      height: "20px",
                      width: "20px",
                      display: "flex",
                      justifySelf: "center",
                      alignSelf: "center"
                    }}
                    src={userIcon}
                  />
                  <input
                    type="text"
                    placeholder="Enter Email"
                    name="email"
                    class="input-box"
                  />
                </div>

                <div className="input-field">
                  <img
                    style={{
                      height: "20px",
                      width: "20px",
                      display: "flex",
                      justifySelf: "center",
                      alignSelf: "center"
                    }}
                    src={passwordIcon}
                  />

                  <input
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    className="input-box"
                  />
                </div>

                <div className="login-button">
                  <button className="loginButton" type="submit">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="image-area">
            <img src={Img} className="image" />
            <div className="image-text">
              <div className="icon" />
              <div className="logo"></div>
              <div className="description">
                Keep green and keep our planet clean. Dont be mean and go green.
              </div>
            </div>
          </div>
        </div>
      </div>
        <Modal
        show={this.state.show}
        close={this.modalClose}
        variant={this.state.alertVariant}
        message={this.state.message}
      />
      </>

    );
  }
}

const mapActionToProps = dispatch => ({
  login: () => dispatch(login()),
  logout:()=>dispatch(logout()),
});

const mapStateToProps = state => ({
  loginData: state.login
});

export default connect(
  mapStateToProps,
  mapActionToProps
)(Login);
