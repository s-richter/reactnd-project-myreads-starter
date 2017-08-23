import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBookshelves from './ListShelves'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => (
      this.setState({ books })
    ))
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBookshelves books={this.state.books} />
        )} />
        <Route path="/search" render={() => (
          <SearchBooks />
        )} />
      </div>
    )
  }
}

export default BooksApp
