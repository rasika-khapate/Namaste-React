import { useState } from "react";

const UserFunctional = () => {

  const [count] = useState(0)
  const [count2] = useState(1)
  return (
    
    <>
      <div className="user-card">
        <p>Functional Based</p>
        <h1>Count : {count}</h1>
         <h1>Count2 : {count2}</h1>
        <h2>Name : Rasika</h2>
        <h3>Location : Bengaluru</h3>
        <h3>Profession : Front end developer</h3>
      </div>
    </>
  );
};

export default UserFunctional;
