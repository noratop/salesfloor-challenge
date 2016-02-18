# Salesfloor technical test

## live demo [here](http://noratop.github.io/salesfloor-challenge/)

## Install
1. git clone
2. npm install
3. grunt dev (for local preview at http://localhost:42000/)

## Technologies
* React
* Redux
* Sass
* Foundation
* Grunt
* Webpack

## Additional comments
Using GoogleMap services in React and Redux architecture is confusing for some of the following reasons.

The map object needs to be global in order to be used by different Google services that can be in different components of the app.

Because the map object is attached to a DOM Markup, the map object needs to be initialized from its React component itself, after it's being rendered.

Since the map object does not belong to the React component, we can't subscribe this component to the store. We could them subscribe a specific 'update map' function to the store that will handle what should be updated in the map. This would allow us to comply with the data flow specification of Redux (Flux). It also helps to keep this part of the code in the component itself.

However, this solution is not ideal since we end up dealing with each cases in this 'update map' handler. The most simple way I found to handle it, is to make a exception to the Flux architecture for the map.

As a result, we can update the map before actually dispatch any flux action using Redux middlewares. It is also easier to update only what needs update in the map. The code is much clearer this way although it probably goes against the rules of Flux.

Possible alternative: a [GoogleMap React library](https://github.com/tomchentw/react-google-maps) that might help. I had a quick look at it and chose not to go with it. What I seemed to understand is that all Google services for a map should be contained in a single React component. Might be the best practice in the end...
