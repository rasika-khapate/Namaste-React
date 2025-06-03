const headingg = React.createElement(
  "h1",
  { style: { backgroundColor: "red" } },
  "Hello World from React"
);

console.log(headingg);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(headingg);

// const example = <div id="parent">
//     <div id="child">
//         <h1>H1</h1>
//         <h2>H2</h2>
//     </div>
//     <div id="child2">
//         <h1>H1</h1>
//         <h2>H2</h2>
//     </div>
// </div>

const reactEx = React.createElement("div", { id: "parent" }, [
  React.createElement("div", { id: "child" }, [
    React.createElement("h1", {}, "H1"),
    React.createElement("h2", {}, "H2"),
  ]),
  React.createElement("div", { id: "child2" }, [
    React.createElement("h1", {}, "H1"),
    React.createElement("h2", {}, "H2"),
  ]),
]);

root.render(reactEx);
