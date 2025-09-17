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

# If this was the logic i had given for filter, would react still re render the UI? if yes why, if no why?

# solution:

Will React re-render the UI?
Yes — but with nuance.

✅ React will schedule a re-render because:
setListOfRestaurants(filteredList) is called — and React’s useState <b>doesn't shallow-compare </b>the previous state and the new state values by default.


# ((((((((((((((((((
   
   ✅ Visual Hierarchy
Reference equality  →  Are they the same pointer?
                      (React, JS ===)

Shallow comparison  →  Do they have the same top-level elements/keys?

Deep comparison     →  Are *all* nested contents equal?


👉 So, when I said “React doesn’t shallow-compare arrays”, what I meant was:

React does reference equality only.

It does not do the element-by-element shallow comparison, nor the recursive deep comparison.

# ))))))))))))))))))

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

Scenario Will React re-render? Will DOM change?
setListOfRestaurants with a new array (even if contents same) ✅ Yes (because new array reference) ❌ No (because same keys, same component output)

===========================================================================================================================================


# const [count , setCount] = useState(0)

// a function in which im keeping this statment

setCount(1)
setCount(1)
setCount(1)
setCount(1)
setCount(1)

# will this component be rerendered? if yes why? if no why?

# whats the difference between the above question and this question?

The key difference between your first question and the filter question comes down to how React checks whether state has changed — primitive vs. object/array reference.

1️⃣ First question — setCount(1) (primitive value: number)
count is a primitive (number), so React can directly compare the old value and the new value using ===.

If the value hasn’t changed (1 === 1), React will skip re-rendering altogether.

Multiple setCount(1) calls in the same sync execution are batched, and React sees:

Old value → New value is same? ✅ Skip re-render.

Old value → New value is different? ✅ Re-render once.

2️⃣ Second question — setListOfRestaurants(filteredList) (non-primitive: array)
Here, listOfRestaurants is an array, which is an object reference in JavaScript.

Even if the contents of the array are identical, .filter() always returns a new array object ([] !== []).

React doesn’t do a deep comparison(meaning it does shallow compare) of objects/arrays by default — it only compares references.

New array reference? ✅ React schedules a re-render, even if the data looks the same.

🔍 Why my answers were different
First case: Possible skip if value is the same, because React compares primitive values directly.

Second case: Always re-render (unless you manually prevent it), because React sees a new array reference.

In short:

Primitive state: React compares by value → same value = no re-render.
Object/array state: React compares by reference → new reference = re-render.

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

console.log(userAge || 25); // 25 (since 0 is falsy)
console.log(userAge ?? 25); // 0 (since 0 is NOT null/undefined)

let userName = null;
console.log(userName ?? "Guest"); // "Guest"
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
console.log(email); // "Not Provided"

📌 Summary Table:
Operator Meaning Example
?. Access property/method if not null/undefined obj?.prop
?? Return fallback only if value is null/undefined value ?? fallback

      // const restaurantCard = mockData[0]?.data?.cards.find(
      //   (card) => card?.card?.card?.id === "restaurant_grid_listing_v2"
      // );  // TO DETERMINE WHICH INDEX OF CARD KEY CONTAINS DATA OF RESTAURANTS, AND THIS WILL BE COMMUNNICATED TO US VIA Backend

      // const resList = restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants;

===========================================================================================================================================

# What is useEffect, why are they called side effects??

# Answer:

👉 What is useEffect?
useEffect is a React Hook that lets you run side effects in function components.
✅ It's used for:
Fetching data from APIs 🛰️
Subscribing to events 🖱️
Setting up timers or intervals ⏲️
Working with browser APIs like localStorage, document, etc.
Updating the DOM manually (e.g., animations)

How it Works
Syntax Behavior
useEffect(fn) Runs after every render
useEffect(fn, []) Runs once after the first render (componentDidMount)
useEffect(fn, [x]) Runs when x changes (dependency array)
return () => {...} inside it Runs cleanup before component unmount or before the next effect runs

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
console.log("Adding..."); // ⚠️ side effect: console
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
Cooking Step React Equivalent
Preheat the oven useEffect(() => setupSomething(), [])
Set a kitchen timer setTimeout / setInterval
Go grocery shopping fetch() from API
Store leftovers localStorage.setItem()
Clean up the kitchen Cleanup inside return () => {...}

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

===========================================================================================================================================

# what is super keyword, why and when is it used?

# Answer

What is super?
In JavaScript (and React), super is used to call the constructor or methods of the parent class.

In React class components, the parent class is React.Component, so you use super() to make sure the parent’s constructor is properly called.

🧠 Why is it used?
When you create a constructor in a child class, you must call super(props) before accessing this. This is required by JavaScript when extending classes.

📦 Example in a class component:
import React, { Component } from "react";

class Welcome extends Component {
constructor(props) {
super(props); // Calls the parent class's constructor

    // Now you can safely use `this`
    this.state = {
      message: `Hello, ${this.props.name}`,
    };

}

render() {
return <h1>{this.state.message}</h1>;
}
}
If you don’t call super(props), you’ll get an error like:

Must call super constructor in derived class before accessing 'this'

🔍 When is super used?
Inside a constructor of a class that extends another class

Before using this in that constructor

To optionally pass props to the parent class (React.Component) so this.props is available

🔁 Summary:
Use Purpose
super() Calls the parent class’s constructor
super(props) Passes props to the parent so this.props is initialized
Must be called In the constructor of a subclass before using this

===========================================================================================================================================

# \*super(name)- This must be called before using `this`\*\* — otherwise, JS throws an error.

# why? whats the reason apart from the error?

# Answer

1.  JavaScript class inheritance (ES6+) is based on the super call to initialize "this".
    In JavaScript, when you write a subclass like this:

class Dog extends Animal {
constructor(name) {
super(name);
this.name = name;
}
}
JavaScript doesn’t automatically create the this context for Dog. Instead, the super() call is what creates and initializes the this binding by calling the parent constructor (Animal in this case).

🧠 Without super(), there is no this yet — so using it would reference something that doesn’t exist, and JavaScript throws an error to prevent undefined behavior.

💣 2. It prevents inconsistent or broken object creation
Imagine if JavaScript allowed this:

class Dog extends Animal {
constructor(name) {
this.name = name; // ❌ Using 'this' before 'super'
super(name);
}
}
Here’s what would go wrong:

this hasn’t been initialized — JavaScript wouldn’t know what object you're assigning to.

If Animal (the parent) needs to set up something critical (like this.id or base logic), it’s now bypassed or done too late.
This breaks the constructor chain — a core principle in object-oriented inheritance.

⚙️ 3. The JavaScript engine design requires the parent class to control this creation
When you use extends, the child class inherits from the parent class.

The parent (like Animal) is responsible for calling super() and initializing internal slots like [[HomeObject]] and [[ThisValue]].

The child constructor can't define this until the parent constructor has done it.

That’s a rule enforced by the JavaScript specification (specifically in ECMAScript 2015 / ES6).

🔍 In technical terms (per ES6 spec):
"A constructor must call super() before referencing this, because the object must be constructed first by the base class constructor."

🧭 Analogy (real-world example):
Imagine you inherit a house-building business (Dog) from your parent company (Animal), but you try to decorate or live in the house (this) before the foundation is even laid by the parent.

Until Animal builds the foundation (super()), there is no house (this) for you to work with — touching this early is like trying to put furniture in thin air. So the system throws an error to stop you.

✅ Summary
Reason Why it's required
super() initializes this Without it, this is undefined
Ensures proper inheritance chain Guarantees parent setup happens first
Avoids bugs or broken object state Prevents using uninitialized or wrongly built objects
JavaScript language rule Enforced by ES6 spec — not just a convention

===========================================================================================================================================

# I was under the impression we can only use "this" if we wrote super first , is that so?

# Answer

Here's the key rule:
In a constructor, you must call super(props) before using this.

Why?
Because:

1. super() calls the parent class's constructor (React.Component)
2. Until super() runs, this isn't initialized

constructor(props) {
// ❌ this is illegal here
this.state = {}; // ❌ Error: Must call super constructor before accessing 'this'

super(props); // ✅ should be called first
}

But outside the constructor?
✔️ You can use this safely in class fields like this:
class HelloWorld extends React.Component {
state = {
message: 'Hello!',
};

handleClick = () => {
// ✅ This is fine: we're not inside a constructor
this.setState({ message: 'Clicked!' });
};

render() {
return <button onClick={this.handleClick}>Click Me</button>;
}
}
Class fields are initialized after super() has been implicitly called during class instantiation, so this is safe to use there.

===========================================================================================================================================

# why should we not directly modify the state variable in react class components

# Answer

❌ Direct State Mutation: this.state.count = 5; // WRONG
✅ Correct Way: this.setState({ count: 5 });
NEVER UPDATE YOUR STATE VARIABLES DIRECTLY, IT WONT WORK AND CREATES INCONSISTENCIES

            You should not modify React state directly (such as with this.state.count = 1) because React will not detect the change and therefore will not re-render the component to reflect the updated state. React tracks state changes so it knows when to update the user interface. Direct mutation bypasses this mechanism, leaving your UI out of sync with your data

             React’s design expects you to use setState() (or its modern equivalents) so it can manage and optimize the rendering process, track changes, and maintain the consistency of your app's UI and data

Why You Should Not Mutate this.state Directly:

1. Bypasses React's State Management
   React uses setState() to track when and how your component should re-render. If you mutate state directly:

React won’t detect the change, and
No re-render will happen unless something else triggers it.

2. Breaks React's Lifecycle
   React batches state updates and schedules renders optimally. If you skip setState(), you:
   Bypass that batching
   Create unpredictable bugs when state updates happen asynchronously

3. State Consistency Issues
   If multiple state updates happen close together (especially async), React ensures they merge correctly through setState(). Direct mutation can clobber existing values or create race conditions.

4. Debugging Nightmare 🔍
   React DevTools and other tools rely on React's internal state tracking. Direct mutation makes it hard or impossible to trace bugs.

===========================================================================================================================================

# WHY YOUR LOG ORDER VARIES IN REACT

# answer

1️⃣ Asynchronous State Updates & Batching
React doesn’t update the DOM immediately when you call setState() (class) or setCount() (hook). Instead, it:
Batches updates
Schedules re-renders efficiently
Defers execution to the next event loop tick when needed

🔧 Example:
this.setState({ count: 1 });
console.log(this.state.count); // Still old value!
React doesn't mutate state immediately — it queues it.

This means:

Logs can run before the update is applied
Component re-renders may happen later than expected
Updates can be grouped together to avoid extra re-renders

🧪 What you might observe:

Child render
Child componentDidMount
Child render // After fetch triggers setState
Child componentDidUpdate
But depending on timing, it might look jumbled like:

Child componentDidMount
Child render
Child componentDidUpdate
Child render

2️⃣ Concurrent Rendering (React 18+ with createRoot)
React 18 introduced concurrent features like:
Automatic batching
Interruptible rendering
Transitions

If you use:

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
You're enabling concurrent mode by default. Here's what changes:

@@@ Behaviors:

1. React may pause rendering mid-way and resume later
2. Multiple components may not complete synchronously
3. Lifecycle logs (like render or useEffect) can appear in non-linear order
4. Double rendering can happen in development with Strict Mode for dev-safety

📦 Example of Inversion:
Parent render
Child render
Parent componentDidMount
Child componentDidMount
Child render // from state update
Child componentDidUpdate
But with concurrent rendering, logs might show:

Child render
Parent render
Child componentDidMount
Parent componentDidMount
Because React decouples rendering from committing. So logs reflect virtual work, not actual DOM updates.

3️⃣ Console.log() Buffering & JS Engine Behavior
Even in non-React code, console.log() isn’t always precise in output order.

Reasons:
Console might flush logs asynchronously
If logs occur in promises, microtasks, or animation frames, order may drift
React hooks often involve closures, which delay execution

useEffect(() => {
fetch(...).then(() => {
console.log("✅ fetch done");
});
console.log("📦 useEffect ran");
}, []);
Expected:

📦 useEffect ran
✅ fetch done
But you might see:

✅ fetch done
📦 useEffect ran
Depending on:

DevTools behavior
Console implementation (browser-specific)
If you're viewing logs in between paint/flush cycles

🧠 TL;DR Summary
Reason Description
🧮 Asynchronous setState() State updates are queued & batched, so logs before re-render
🧵 Concurrent Rendering Mode React may pause/resume rendering, reorder lifecycle timings
🖨️ console.log() Buffering Log outputs may appear out-of-sync with actual execution in JS engines

💡 Pro Tips to Diagnose This:
Use a unique timestamp or counter in your logs:

console.log(`[${Date.now()}] render`);
Use Profiler in React DevTools — it shows actual render timing 🔥

Wrap logs with identifiable tags:

console.log("🟢 MOUNTED:", props.name);

===========================================================================================================================================

# Execution order in functional component

Rasika: => Functional Render // Initial mount
Rasika: => Functional ComponentDidMount // After first paint
Rasika: => Functional Render // Triggered by setState (fetch)
Rasika: => Functional ComponentDidUpdate // Because userInfo changed
Rasika: => Functional ComponentWillUnmount // If unmounted (e.g. navigating away)

🧠 Order Logic - for a different example with basic useState and useEffect
Step Event Console Log
1 First render 🔁 Functional Render
2 JSX evaluated 🧾 Inside JSX
3 useEffect mount runs 📦 useEffect - componentDidMount
4 Button click → setCount 🔁 Functional Render (again)
5 JSX evaluated again 🧾 Inside JSX
6 useEffect detects count change 🔄 useEffect - componentDidUpdate
7 Unmount (navigate away) ❌ useEffect Cleanup - componentWillUnmount

Important Notes:
useEffect(() => ..., []) is always called after the first render

State update (setUserInfo) causes re-render, then componentDidUpdate

Order may vary across multiple components because fetch is async
