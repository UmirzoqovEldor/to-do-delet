import { Component } from "react";
import { data } from "./data";

class App extends Component {
  state={
    data:data
  }
  render() {
    function getID(id) {
      let res = this.state.data.filter((value) => value.id !== id);
      this.setState({
        data:res
      })
    }
    return (
      <>
        <h1>To Do list</h1>
        {this.state.data.map((valu) => {
          return (
            <h2>
              {valu.id} {valu.name} {valu.status}
              <button
                onClick={() => {
                  getID.bind(this)(valu.id);
                }}
              >
                delte
              </button>
            </h2>
          );
        })}
      </>
    );
  }
}

export default App;
