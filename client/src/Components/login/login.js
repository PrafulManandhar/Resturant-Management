import React, { Component } from "react";
import Img from "../../Image/1.jpg";
import userIcon from "../../Image/user.png";
import passwordIcon from "../../Image/password.png";

import "./styles.css";

export default class Login extends Component {
  state = {
    error: false
  };
  render() {
    return (
      <div class="login">
        <div class="login-box">
          <div class="form-area">
            <div class="welcome-text">Welcome to</div>
            <div class="infinity">Pragya Resturant System</div>
            <div class="login-description">Login. We Make work Easy</div>
            <div style={{ width: "100%",margintop:"100px",marginRight:"40px"}}>
              <form>
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
                    class="input-box"
                  />
                </div>

                <div className="login-button">
                  <button className="loginButton" type="submit">Login</button>
                </div>
                
              </form>
            </div>
          </div>
          <div class="image-area">
            <img src={Img} class="image" />
            <div class="image-text">
              <div class="icon" />
              <div class="logo"></div>
              <div class="description">
                Keep green and keep our planet clean. Dont be mean and go green.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// const mapActionToProps = dispatch => ({
//   login: () => dispatch(login()),
//   loginusersdata: payload => dispatch(loginusersdata(payload))
// });

// const mapStateToProps = state => ({
//   loginData: state.login
// });

// export default connect(
//   mapStateToProps,
//   mapActionToProps
// )(Login);
