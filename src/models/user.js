import axios from "axios";

class User {
  constructor(name, email, password, passwordConfirmationRef, id) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.passwordConfirmationRef = passwordConfirmationRef;
  }

  async signIn() {
    //
    try {
      let response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBMq9F_xrZQ3NP1uA-WuRH3450IUYtr8Y4
      `,
        {
          email: this.email,
          password: this.password,
          returnSecureToken: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error.response);
      return null;
    }
  }

  async signOut() {
    //
  }

  async register() {
    //
    try {
      let response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBMq9F_xrZQ3NP1uA-WuRH3450IUYtr8Y4
            `,
        {
          email: this.email,
          password: this.password,
          returnAecureToken: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default User;
