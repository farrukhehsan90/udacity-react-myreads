import React from "react";
import { Route,BrowserRouter as Router } from "react-router-dom";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import selectOptionsJson from './assets/selectOptions.json';
import { getAll, search, update } from "./BooksAPI";
import BookShelf from "./components/book-shelf/BookShelf";
import SearchBooks from "./components/search-books/SearchBooks";

class BooksApp extends React.Component {
  state = {
    books: [],
    initialCategories:true,
    currentlyReading: [],
    read: [],
    wantToRead: [],
    selectOptions: [],
    filteredBooks:[],
    text:'',
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  };

  componentDidMount() {
    getAll().then(books => {
      this.setState({ books,selectOptions:selectOptionsJson });
      this.categorizeBooks();
    });
  }

  categorizeBooks = () => {
    const { initialCategories, books } = this.state;

    if(initialCategories){
      
    books.map(book => {
      return this.setState(prevState =>
        book.shelf === "currentlyReading"
          ? { currentlyReading: [...prevState.currentlyReading, book] }
          : book.shelf === "wantToRead"
          ? { wantToRead: [...prevState.wantToRead, book] }
          : {
              read: [...prevState.read, book]
            }
      );
    });
    this.setState({initialCategories:false});
  }
  else{

    const currentlyReading=[];
    const wantToRead=[];
    const read=[];


    getAll().then(books=>
      {
       books.map(book => {

          if(book.shelf==='currentlyReading') 
          { 
            currentlyReading.push(book);
           }
          if(book.shelf === "wantToRead"){

             wantToRead.push(book); 
          }
          if(book.shelf==='read'){
              
            read.push(book);
            
          }

          return true;
        });
        
       return this.setState({currentlyReading,read,wantToRead});
      });
  }
  };

  onChange=(e,book,type)=>{
  
    const {books}=this.state;

    this.setState({[e.target.name]:e.target.value});

    switch(type){

      case "select":
      return update(book,e.target.value)
      .then(res=>{
        this.categorizeBooks();
      });

      case "text":
      return search(e.target.value)
        .then(filteredBooks=>{
          this.setState({filteredBooks});
        });

      default :
        return;
    }

      
  }

  render() {
    
    const {
      books,
      currentlyReading,
      wantToRead,
      read,
      selectOptions,
      filteredBooks,
      text
    } = this.state;

    return ( 
     <Router>
      <div className="app">
     <Route exact path="/" render={(props)=>{
     return <BookShelf
      books={books}
      onChange={this.onChange}
      selectOptions={selectOptions}
      currentlyReading={currentlyReading}
      wantToRead={wantToRead}
      read={read}
       {...props}/>}}/>
     <Route exact path="/search" render={(props)=>
       <SearchBooks
        currentlyReading={currentlyReading}
        wantToRead={wantToRead}
        read={read}
        filteredBooks={filteredBooks}
        inputFieldText={text}
        onChange={this.onChange}
        selectOptions={selectOptions}
        {...props}
       />
     }/>
      </div>
      </Router>
    );
  }
}

export default BooksApp;
