import React from 'react'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  static shelfCategories = {
    currentlyReading: 'currentlyReading',
    wantToRead: 'wantToRead',
    read: 'read',
    none: 'none'
  }

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  
  // This function sets the property 'shelf' of the supplied
  //  'book' to the specified value 'shelf', both locally and on the backend
  //  server.  
  handleChangeShelf = (book, shelf) => {
    if (book && book.id && shelf) {
      if (!(shelf in BooksApp.shelfCategories)) {
        // there should only be four well defined categories (including 'none')
        shelf = BooksApp.shelfCategories.none
      }
      // now that the shelf category of the book is verified, we can set it
      //  locally and on the backend server
      BooksAPI
        .update(book, shelf)
        .then(() => {
          book.shelf = shelf
          // the function 'handleChangeShelf' gets also called from the 
          //  component 'SearchBooks'. In this case the book referred to by the
          //  argument 'book'is not yet contained in the array 'books', so we 
          //  have to explicitly add it using concat():          
          this.setState((prev) => ({
            books: prev.books
              .filter((b) => (
                b.id !== book.id
              ))
              .concat(book)
          }))
        })
    }
  }

  render() {
    return (
      <div className="app">
        {/* the first <Route> contains the main page  */}
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf
                  title='Currently Reading'
                  books={this.state.books.filter(
                    (book) => book.shelf === BooksApp.shelfCategories.currentlyReading
                  )}
                  handleChangeShelf={this.handleChangeShelf} />
                <Bookshelf
                  title='Want to Read'
                  books={this.state.books.filter(
                    (book) => book.shelf === BooksApp.shelfCategories.wantToRead
                  )}
                  handleChangeShelf={this.handleChangeShelf} />
                <Bookshelf
                  title='Read'
                  books={this.state.books.filter(
                    (book) => book.shelf === BooksApp.shelfCategories.read
                  )}
                  handleChangeShelf={this.handleChangeShelf} />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />

        {/* the second <Route> contains the search page  */}
        <Route path="/search" render={() => (
          <SearchBooks
            booksInShelves={this.state.books}
            handleChangeShelf={this.handleChangeShelf} />
        )} />
      </div>
    )
  }
}

export default BooksApp
