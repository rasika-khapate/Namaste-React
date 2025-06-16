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



# My question - 

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