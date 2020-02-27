/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import { html } from 'lit-element'

export const UPDATE_PAGE = 'UPDATE_PAGE';
export const UPDATE_DRAWER_STATE = 'UPDATE_DRAWER_STATE'; //hide drawer menu

export const navigate = (path) => (dispatch) => {
  // Extract the page name from path.
  const page = (path || "").slice(1) || 'view1';

  // Any other info you might want to extract from the path (like page type),
  // you can do here
  dispatch(loadPage(page));

  // Close the drawer - in case the *path* change came from a link in the drawer.
  dispatch(updateDrawerState(false));
};

//TODO: can this be worked out to do dynamic page views easier? maybe separate file
//maybe add a reducer?
export const PAGES = {
  "view1": { page: "view1", file: "../views/my-view1.js",  then: null, element: `my-view1`},
  "view2": { page: "view2", file: "../views/my-view2.js",  then: null, element: `my-view2`},
  "view3": { page: "view3", file: "../views/my-view3.js",  then: null, element: `my-view3`},
  "404":   { page: "404",   file: "../views/error-404.js", then: null, element: `error-404`}
}

const loadPage = (pageName) => (dispatch) => {
  const {file, then, page} = PAGES[pageName] || PAGES["404"];
  const active = import(file);
  if (then) {
    active.then(then);
  }
  dispatch(updatePage(page));
};

const updatePage = (page) => {
  return {
    type: UPDATE_PAGE,
    page
  };
};

export const updateOffline = (offline) => (dispatch, getState) => {
  // Show the snackbar only if offline status changes.
  if (offline !== getState().app.offline) {
    dispatch(showSnackbar());
  }
  dispatch({
    type: UPDATE_OFFLINE,
    offline
  });
};

export const updateDrawerState = (opened) => {
  return {
    type: UPDATE_DRAWER_STATE,
    opened
  };
};
