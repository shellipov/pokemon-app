import React from 'react';
import PostList from "./PostList";
import About from "./About";
import { Route } from "react-router-native";

export default function AppRouter() {
  return (
    <>
      <Route exact path="/" component={PostList} />
      <Route path="/about" component={About} />
    </>
  );
}
