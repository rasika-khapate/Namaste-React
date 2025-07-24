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



      // const restaurantCard = mockData[0]?.data?.cards.find(
      //   (card) => card?.card?.card?.id === "restaurant_grid_listing_v2"
      // );  // TO DETERMINE WHICH INDEX OF CARD KEY CONTAINS DATA OF RESTAURANTS, AND THIS WILL BE COMMUNNICATED TO US VIA Backend

      // const resList = restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants;


===========================================================================================================================================

# What is useEffect, why are they called side effects??

# Answer:

👉  What is useEffect?
 useEffect is a React Hook that lets you run side effects in function components.
✅ It's used for:
Fetching data from APIs 🛰️
Subscribing to events 🖱️
Setting up timers or intervals ⏲️
Working with browser APIs like localStorage, document, etc.
Updating the DOM manually (e.g., animations)

How it Works
Syntax	Behavior
useEffect(fn)         	      Runs after every render
useEffect(fn, [])           	Runs once after the first render (componentDidMount)
useEffect(fn, [x])          	Runs when x changes (dependency array)
return () => {...} inside it	Runs cleanup before component unmount or before the next effect runs



👉 What Are "Side Effects"?
In programming, a side effect is anything a function does beyond returning a value.

✅ Pure Function
A pure function:
Takes inputs
Returns an output
Does nothing else

js
Copy
Edit
function add(a, b) {
  return a + b; // ✅ no side effects
}
❌ Functions with Side Effects
These functions affect the outside world, e.g.:

js
Copy
Edit
function logAndAdd(a, b) {
  console.log("Adding...");   // ⚠️ side effect: console
  document.title = "New Title"; // ⚠️ side effect: DOM
  return a + b;
}


👉 Why is it called a "side effect"?
In React, pure rendering means the component's render output is based only on its props and state.

But things like:

network calls,
timeouts,
subscriptions,
...are "side effects" — they affect things outside the component and need useEffect to manage them properly.


📦 Why Are They Called “Side” Effects?
Because they are not the main point of the function — they are side activities.
In React, rendering is supposed to be pure (just return JSX), so React provides useEffect() to isolate side effects from the render logic.

🧼 Rendering in React = Following a Recipe
When React renders a component:

It reads props + state

It returns JSX (just like a recipe returns a dish layout)

There are no surprises: it’s pure, predictable, reproducible

Just like:
A recipe that says “2 cups of flour + 1 egg → mix → bake”

Nothing magical happens on its own. You give it inputs, and you get a defined output.

🔥 Side Effects = Real World Cooking Setup
Now imagine you're actually cooking:

You turn on the oven ✅

You go shopping for ingredients ✅

You set a timer so the cookies don’t burn ✅

You update the fridge with leftovers ✅

These things don’t directly change the recipe — but they’re necessary for the dish to succeed. They're actions that interact with the world.

🧠 In React Terms:
Cooking Step	React Equivalent
Preheat the oven	useEffect(() => setupSomething(), [])
Set a kitchen timer	setTimeout / setInterval
Go grocery shopping	fetch() from API
Store leftovers	localStorage.setItem()
Clean up the kitchen	Cleanup inside return () => {...}

You wouldn’t write in the ingredients section of the recipe:

“Also, go to the store, call mom, and update your budget”

That’d be confusing and inappropriate in a recipe.

Likewise, you don’t put side effects in the return block of a component, because that’s meant for pure UI output.

✅ Why It Matters in React:
React rerenders components a lot.

So if you did:

js
Copy
Edit
const Component = () => {
  fetch("/api"); // 😱 Happens every render!
  return <div>Hello</div>;
};
…it’d be like running to the grocery store every time you stir the soup 🍲😵

Instead, React gives you:

js
Copy
Edit
useEffect(() => {
  fetch("/api"); // ✅ only happens once
}, []);
This is like:

"Before you start cooking, make sure you have ingredients and the oven’s hot."

🧠 One-Liner Analogy Summary:
Render is reading the recipe and plating the food.
Side effects are the behind-the-scenes prep that make the recipe possible.

You need both — but you keep them in different parts of the kitchen 👨‍🍳

===========================================================================================================================================

# is LINK from react-router-dom tag is actually anchor tag in html?

# Solution
✅ This is not a native HTML tag.
✅ It is a React component provided by react-router-dom.
✅ Internally, it renders an anchor (<a>) tag, but with enhanced behavior.

⚙️ What Does Link Do?
It prevents a full page reload (which a normal <a> would cause).
Instead, it updates the URL and renders the matching route using React Router.
It works with the React Router history stack to enable client-side navigation.

🧠 Behind the Scenes
This:

<Link to="/about">About</Link>
Will render:

<a href="/about">About</a>
But with JavaScript event handlers added to intercept clicks and trigger navigation without refreshing the page.





