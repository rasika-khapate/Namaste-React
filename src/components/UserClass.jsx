import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.name + ": => Child Constructor");
    this.state = {
      userInfo: {
        name: "dummy",
        location: "dummy",
        // login: "dummy",
      },
    };
  }

  async componentDidMount() {
    console.log(this.props.name + ": => Child ComponentDidMount");
    const data = await fetch("https://api.github.com/users/rasika-khapate");
    const json = await data.json();

    this.setState({
      userInfo: json,
    });
  }

  componentDidUpdate() {
    console.log(this.props.name + "Child Component Did update");
  }

componentWillUnmount(){
  console.log(this.props.name + "Child Component will unmount");
}

  render() {
    console.log(this.props.name + ": => Child Render");

    const { login, name, location } = this.state.userInfo;

    return (
      <div className="user-card">
        <p>Class Based</p>
        <h2>Login-Id : {login}</h2>
        <h2>Name : {name} </h2>
        <h3>Location : {location}</h3>
        <h3>Profession : Front end developer</h3>
      </div>
    );
  }
}

export default UserClass;
