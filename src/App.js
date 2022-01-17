import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    noRows: 1,
    noColoums: 1,
    arr: [],
    codeValue: ""
  };
  changeRows = event => {
    var valuesROws = event.target.value;
    this.setState({ noRows: event.target.value }, () => {
      if (valuesROws) {
        this.make2DArray();
      }
    });
  };

  changeColumns = event => {
    var valuesCOlumns = event.target.value;
    this.setState({ noColoums: event.target.value }, () => {
      if (valuesCOlumns) {
        this.make2DArray();
      }
    });
  };

  changeinput = (obj, event) => {
    let newAr = [...this.state.arr];
    newAr[obj.postionI][obj.postionJ].value = event.target.value;
    this.setState({
      arr: newAr
    });
  };

  componentDidMount() {
    this.make2DArray();
  }
  make2DArray = () => {
    var array2D = new Array(parseInt(this.state.noColoums));
    for (var i = 0; i < array2D.length; i++) {
      array2D[i] = new Array(parseInt(this.state.noRows));
    }
    var r = [];
    for (var i = 0; i < parseInt(this.state.noColoums); i++) {
      for (var j = 0; j < parseInt(this.state.noRows); j++) {
        array2D[i][j] = {
          postionI: i,
          postionJ: j,
          value: i + "_" + j
        };
      }
    }
    this.setState({ arr: array2D });
  };
  generateCode = () => {
    let code = `\\begin{array} {${'|c'.repeat(this.state.noColoums) + '|'}}\\hline `;

    for (var i = 0; i < parseInt(this.state.noColoums); i++) {
      code += ``;
      for (var j = 0; j < parseInt(this.state.noRows); j++) {
        code += this.state.arr[i][j].value;
        if (j != parseInt(this.state.noRows) - 1) {
          code += " & ";
        } else {
          code += " \\\\ ";
        }
      }
      code += `\\hline `;
    }
    code += " \\end{array}";
    this.setState({ codeValue: code });
  };

  render() {
    return (
      <div>
        <main role="main" class="container">
          <h1 className="mt-5">Math Jax table generator</h1>
          {/* <p className="lead">Uses array of MATHJAX </p> */}
          <div className="row">
            <div className="col-sm">
              <label>Columns</label>
              <input
                className="form-control"
                onChange={this.changeRows}
                value={this.state.noRows}
                type="number"
                placeholder=""
                min={1}
              />
            </div>
            <div className="col-sm">
              <label>Rows</label>
              <input
                className="form-control"
                onChange={this.changeColumns}
                value={this.state.noColoums}
                type="number"
                min={1}
              />
            </div>
          </div>
          {/* <div className="row"> */}
          <br />
          <button
            onClick={this.generateCode}
            class="btn btn-primary btn-sm "
            type="submit"
          >
            Generate
          </button>

          {/* </div> */}
          <hr />
        </main>

        <div class="container">
          {this.state.arr.map(i => (
            <div className="row">
              {i.map(j => {
                return (
                  <div className="col-sm-1">
                    <input
                      value={j.value}
                      onChange={event => {
                        this.changeinput(j, event);
                      }}
                      type="text"
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="container">
          <hr />
          <textarea value={this.state.codeValue} />
        </div>
      </div>
    );
  }
}

export default App;
