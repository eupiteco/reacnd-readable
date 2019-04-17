import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { LoadingBar } from "react-redux-loading";
import "../assets/App.css";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import Nav from "./Nav";
import PostPage from "./PostPage";
import NewPost from "./NewPost";
import EditPost from "./EditPost";

class App extends Component {
  static propTypes: {
    loading: PropTypes.bool.isRequired
  };

  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <Router>
        <div className="App">
          <LoadingBar />
          <div className="container">
            {this.props.loading === true ? (
              <h1>Loading ...</h1>
            ) : (
              <div className="main-section">
                <Route path="/" exact component={Dashboard} />
                <Route path="/c/:category" component={Dashboard} />
                <Route path="/new" component={NewPost} />
                <Route path="/e/:id" component={EditPost} />
                <Route path="/p/:id" component={PostPage} />
              </div>
            )}
            <Nav />
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps({ flags }) {
  const { authedUser } = flags;
  return {
    loading: authedUser === null
  };
}
export default connect(mapStateToProps)(App);
