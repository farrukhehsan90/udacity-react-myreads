import React, { Component } from 'react';

class SearchBooks extends Component {
    state = { 

     }
    render() {

        const {filteredBooks,onChange,selectOptions,inputFieldText,currentlyReading,wantToRead,read}=this.props;

        let searchContent;

        if(filteredBooks.length>0){
            searchContent=filteredBooks.map(book=>
                <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url("${book.imageLinks.thumbnail}")`
                      }}
                    />
                    <div className="book-shelf-changer">
                      <select
                      onChange={(e)=>onChange(e,book,"select")}
                      value={(currentlyReading.filter(aBook=>aBook.id===book.id)).length>0?"currentlyReading":(
                          (wantToRead.filter(aBook=>aBook.id===book.id)).length>0?"wantToRead":((read.filter(aBook=>aBook.id===book.id)).length>0?"read":"none")
                      )}
                      name={book.id}
                      >
                        {selectOptions.map(option => (
                          <option
                            key={option.value}
                            disabled={option.value === "moveTo"}
                            value={option.value}
                          >
                            {option.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  {book.authors ? (
                    <div className="book-authors">
                      {book.authors.map(author => (
                        <div key={author}>{author}</div>
                      ))}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </li>
            )
        }

        return (
            <div className="search-books">
            <div className="search-books-bar">
              <button
                className="close-search"
                onClick={() => this.props.history.push('/')}
              >
                Close
              </button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input 
                value={inputFieldText}
                name="text"
                onChange={(e)=>onChange(e,null,"text")}
                type="text" placeholder="Search by title or author" />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {searchContent}
              </ol>
            </div>
          </div>
        );
    }
}

export default SearchBooks;