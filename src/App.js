//App.js

import React, { Component } from 'react';
import './App.css';
import FeaturedPost from './FeaturedPost';
import OtherPosts from './OtherPosts';
import SpotifyContainer from './SpotifyContainer';
import * as CosmicFunctions from './cosmicFunctions';

class App extends Component {

    constructor(props){
    super(props);
    this.state = {
       dataReceived: false,      
       posts: [],
       authors: [],
       featuredPostIndex: 0,
       otherPosts: [],
    }
  }

  async componentDidMount(){
    try {
      const {posts, authors} = await CosmicFunctions.getCosmicJsData();
      this.setState({dataReceived: true, posts: posts, authors: authors, otherPosts: posts.slice(1)})
    }
    catch(err) {
      console.error('Error: Problem retrieving Cosmic JS data');
      console.error(err);
      console.error(err.stack);
      this.setState({dataReceived: false});
    }
  }

    changeFeaturedPost(index) {
    let copyOfPosts = this.state.posts.slice();
    copyOfPosts.splice(index, 1);
    this.setState({featuredPostIndex: index, otherPosts: copyOfPosts});
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">          
          Old School Shuffle
        </header>
        <div className="featuredPost">
          {this.state.dataReceived ? <FeaturedPost post={this.state.posts[this.state.featuredPostIndex]}/> : ''}
        </div>
        <div className="spotifyPlayer">
          <SpotifyContainer/>
        </div>
        <div className="otherPosts">
          <OtherPosts allPosts={this.state.posts} otherPosts={this.state.otherPosts} changeFeaturedPost={(index) => this.changeFeaturedPost(index)}/>
        </div>
        <div className="footer">
          <p>Footer here</p>
        </div>
      </div>
    );
  }
}

export default App;