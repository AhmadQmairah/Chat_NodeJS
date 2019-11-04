import React from "react";
import connect from "socket.io-client";
import "./App.css";

class App extends React.Component {
  state = {
    messages: ["Hello", "Yo", "Wassup"],
    input: ""
  };

  componentDidMount() {
    this.client = connect("http://192.168.100.232");

    this.client.on("message", msg => {
      let newMessage = this.state.messages;
      newMessage.push(msg);
      this.setState({ messages: newMessage });
    });
  }

  submit(e) {
    e.preventDefault();
    // alert("Submitting", this.state.input);
    this.client.send(this.state.input);
    this.setState({ input: "" });
  }
  render() {
    let messages = this.state.messages.map(msg => <li>{msg}</li>);

    return (
      <div className="App">
        <ul id="messages">{messages}</ul>

        <form onSubmit={e => this.submit(e)}>
          <input
            id="m"
            autocomplete="off"
            name="input"
            value={this.state.input}
            onChange={e => this.setState({ input: e.target.value })}
          />
          <button>Send</button>
        </form>
      </div>
    );
  }
}

export default App;
