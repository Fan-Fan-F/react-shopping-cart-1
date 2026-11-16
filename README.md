# Shopping Cart in React

Yet another shopping cart sample application that supports HTML5 *drag and drop* :dancer:

[DEMO](http://prakhar.me/react-shopping-cart/)

## Build

```
$ npm install
$ gulp build
```

## Run

```
$ python -m http.server   # Python 3 (SimpleHTTPServer was Python 2 only)
```

## Fork improvements

This fork fixes three real bugs in the original demo (both `js/` sources and the
pre-built `build/app.js` bundle were patched):

* **Cart never updated** — `Cart` copied `props.items` into state in `getInitialState`
  and rendered from that stale copy, so adding products never refreshed the cart.
  It now renders directly from props.
* **Drop crash** — dropping anything that is not a product (selected text, files,
  links) crashed with `Cannot read property 'id' of null`. The drop handler now
  ignores unknown content.
* **State mutation** — `addItemToCart` mutated the state array in place
  (`items.push(...)`, `existingItem.qty += 1`). It now builds a new array
  (`map` / `concat`) before `setState`.

Also fixed the invalid table markup (`<tr>` elements outside `<tbody>`) and the
Python 2-only serve command above.
