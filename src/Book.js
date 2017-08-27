import React from 'react'
import {
    internalNames as ShelfCategories,
    getDisplayName
} from './ShelfCategories'

function Book(props) {
    const book = props.book
    // sometimes the books returned by BooksAPI.search() do not have values for 
    //  all properties, so let's set default values then
    const imageURL = book.imageLinks
        ? `url(${book.imageLinks.thumbnail})`
        : 'url(https://books.google.com/googlebooks/images/no_cover_thumb.gif)'
    const authors = book.authors
        ? book.authors.join(', ')
        : ''

    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `${imageURL}`
                        }}>
                    </div>
                    <div className="book-shelf-changer">
                        <select
                            value={book.shelf}
                            onChange={(e) => {
                                props.handleChangeShelf(props.book, e.target.value)
                            }}>
                            {/* the first entry in the context menu is actually
                                not a shelf category, so we have to add it manually
                            */}
                            <option value="none" disabled>Move to...</option>
                            {/* now we can enumerate over all the shelf categories
                                and create an <option>-element for each category
                            */}
                            {ShelfCategories.map((category) => (
                                <option
                                    key={category}
                                    value={category}>{getDisplayName(category)}
                                </option>
                                ))
                            }                           
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{authors}</div>
            </div>
        </li>
    )
}


export default Book