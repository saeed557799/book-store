import React from 'react';
import './App.css';
import BookList from './components/bookList';


function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Book Store</h1>
                <BookList />
            </header>
        </div>
    );
}

export default App;