import { Component } from "react";
import { data } from "./data";
function* idGenert() {
  let count = data.length;
  while (true) {
    yield ++count;
  }
}
let i = idGenert();
class App extends Component {
  state = {
    data: data,
    name: "",
    status: "",
    select: "id",
  };
  render() {
    function getID(id) {
      let res = this.state.data.filter((value) => value.id !== id);
      this.setState({
        data: res,
      });
    }
    function getSearch(event) {
      let res = data.filter((v) =>
        `${v[this.state.select]}`
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      );
      this.setState({
        data: res,
      });
    }

    function getName(event) {
      this.setState({ [event.target.placeholder]: event.target.value });
    }
    function getSubmit() {
      const { name, status } = this.state;
      let newobj = { id: i.next().value, name, status };

      this.setState({ data: [...this.state.data, newobj] });
    }
    function getSelect(e) {
      console.log(e.target.value);
      this.setState({ select: e.target.value });
    }
    return (
      <>
        <h1>To Do list</h1>
        <input
          type="text"
          onChange={(event) => {
            getName.bind(this)(event);
          }}
          placeholder="name"
        />
        <input
          type="text"
          onChange={(event) => {
            getName.bind(this)(event);
          }}
          placeholder="status"
        />{" "}
        <input
          type="submit"
          onClick={() => {
            getSubmit.bind(this)();
          }}
        />
        <br />
        <select
          name=""
          onChange={(e) => {
            getSelect.bind(this)(e);
          }}
          id=""
        >
          <option value="id">Id</option>
          <option value="name">Name</option>
          <option value="status">Status</option>
        </select>
        <input
          onChange={(e) => {
            getSearch.bind(this)(e);
          }}
          type="text"
          placeholder="search"
        />
        <table border={1} width={"70%"}>
          <thead>
            <tr>
              <td>id</td>
              <td>Name</td>
              <td>Status</td>
              <td>Delete</td>
              <td>Edit</td>
            </tr>
          </thead>
          <tbody>
            {this.state.data.length ? (
              this.state.data.map((valu) => {
                return this.state.data.length ? (
                  <tr key={valu.id}>
                    <td> {valu.id} </td>

                    <td> {valu.name} </td>
                    <td>{valu.status}</td>
                    <td>
                      <button
                        onClick={() => {
                          getID.bind(this)(valu.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button>Edit</button>
                    </td>
                  </tr>
                ) : (
                  "no data"
                );
              })
            ) : (
              <tr>
                <th colSpan={"5"}>
                  <h1>No Data</h1>
                </th>
              </tr>
            )}
          </tbody>
        </table>
      </>
    );
  }
}

export default App;
