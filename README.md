Parcel features at a glance:
Hot Module Replacement (HMR)
File Watcher Algorithm - C++
Bundling
Minify Code
Cleaning our code
Dev and production build
Igniting Our App! ( Namaste-React ) 8
Super fast build algorithm
Image Optimization
Caching while development
Compression
Compatible with older browser versions
Https on dev
Image Optimization
Port No
Consistency Hashing Algorithm
Zero Config
Tree Shaking

===========================================================================================================================================

# 1.My question - 

const handleFilteredRestaurants = () => {
    const filteredList = ListOfRestaurants.filter((res) => res.avgRating);
    setListOfRestaurants(filteredList);
  };

If this was the logic i had given for filter, would react still re render the UI? if yes why, if no why?


# solution:

Will React re-render the UI?
Yes — but with nuance.

✅ React will schedule a re-render because:
setListOfRestaurants(filteredList) is called — and React’s useState  <b>doesn't shallow-compare </b>the previous state and the new state values by default.

It only skips re-rendering if you use useMemo, useCallback, or React.memo optimizations or if the state update is skipped altogether because you didn't call setState.

In this case:

Even though the new filteredList array might contain the same objects in the same order as the previous state, it's a new array reference ([] !== [] in JS).

React sees: "Oh, new state reference? Schedule a re-render."

📊 Will the UI visibly change?
No visible difference, if the filteredList and ListOfRestaurants are the same in content.

✅ Re-render still happens:
React will call your Body function again

JSX evaluates

ListOfRestaurants.map(...) produces the same set of RestaurantCard components with the same keys
React's reconciliation will realize: "Hey, this is the same list of keys/components I already have."
Minimal DOM diffing happens — React may do nothing to the actual DOM

💡 TL;DR:

Scenario	                                                     Will React re-render?	   Will DOM change?
setListOfRestaurants with a new array (even if contents same)	✅ Yes (because new array reference)	❌ No (because same keys, same component output)

===========================================================================================================================================

# 2. My question - dont remember


# solution:

 React's event loop here:

 Event handler runs — button is clicked, handleFilteredRestaurants executes, filters list, and calls setListOfRestaurants.
React schedules an update — but the component doesn’t re-render immediately within that function.
 After the event handler completes, React processes state updates, and triggers a re-render of the component with the new state value.
 Now, during render, your JSX:

 {ListOfRestaurants.map((i) => (
   <RestaurantCard key={i.id} resData={i} />
 ))}

 is evaluated using the new updated state value.

 🔍 Why doesn’t it "stop" at 5th line?
 In React functional components:
 State updates via useState are asynchronous
 The function body (Body component function) is not "run again" immediately — it re-runs in the next render cycle after React completes its state reconciliation.

 At runtime:

 First render → initial state (resList)
 User clicks → handleFilteredRestaurants filters, setListOfRestaurants(filteredList)
 React schedules re-render
 On next render:
 ListOfRestaurants now holds filteredList

 JSX re-evaluates

 map generates new RestaurantCard components for the filtered list
 React updates the DOM
 💡 Important principle:
 React treats function components as render blueprints.
 They aren't "live" functions waiting to be paused/resumed. Each time React renders, it invokes your function from the top, with the latest state values.

 So handleFilteredRestaurants just schedules an update — the rendering happens separately afterward.

===========================================================================================================================================

 # 3. My question 

const data = await fetch(url) , where url is a live api data, like a list of restaurants from swiggy
const json = await data.json()

my question is, why we write the second line of code, when the response of the live api data is indeed a json data?

# solution

# 1 
➡ fetch(url) returns a Promise, not the actual data.
Specifically, it returns a Promise that will resolve to a Response object when the HTTP request completes.

That Response object contains meta-information about the response (like status, headers) and the body as a stream — it doesn't immediately give you the parsed JSON data.

# 2
➡ data.json() reads the body stream and parses it as JSON.
Even though the API response is JSON — it's still a text stream until you explicitly parse it.

The .json() method is an asynchronous operation (returns a Promise), because it has to read the entire response stream, convert it to text, then parse it as JSON.

# 3
Why doesn't fetch automatically give us the parsed JSON if the content is application/json?
Because:

The fetch API is generic — it doesn't assume how you want to handle the response body.

You might want to read it as:

.text() → if it’s plain text
.blob() → for binary files
.arrayBuffer() → for low-level binary streams
.formData() → for form submissions
.json() → for JSON

So you choose how to parse the response body.

===========================================================================================================================================

# Difference between nullish coalescing and logical OR operator

# Answer:

Nullish Coalescing (??)
👉 It provides a default value when the left-hand side is null or undefined.

⚠️ Important: It’s different from the logical OR || operator, which considers any falsy value (like 0, '', false) as a reason to fallback.

✅ Syntax:
javascript
Copy
Edit
let value = something ?? defaultValue;
🔍 Example:
javascript
Copy
Edit
let userAge = 0;

console.log(userAge || 25);  // 25 (since 0 is falsy)
console.log(userAge ?? 25);  // 0 (since 0 is NOT null/undefined)

let userName = null;
console.log(userName ?? "Guest");  // "Guest"
📌 Use Them Together:
They often work nicely together when dealing with APIs or dynamic data.

🔍 Example:
javascript
Copy
Edit
const user = {
  profile: {
    name: "Rasika"
  }
};

let email = user.contact?.email ?? "Not Provided";
console.log(email);  // "Not Provided"


📌 Summary Table:
Operator	Meaning	Example
?.	Access property/method if not null/undefined	obj?.prop
??	Return fallback only if value is null/undefined	value ?? fallback


