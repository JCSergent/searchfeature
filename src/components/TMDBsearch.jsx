import React, { Component} from 'react';

class TMDBsearch extends Component {
    
  constructor(){
    super();
    this.state = {
      currSearch: ' ',
      newSearch: '',
      searchResults: []
    };
  }
 


  handleChange(value) {
    this.setState( { newSearch : value });

  }

  handleSubmit() {
    if(this.state.newSearch === ''){
      this.setState( {currSearch : ' '});
    }
    else this.setState( { currSearch : this.state.newSearch});
  }

componentDidMount() {
  fetch('https://api.themoviedb.org/3/search/tv?api_key=68157c75320237711cf91ff0c3f21e9c&language=en-US&page=1&query='+ this.state.currSearch +'&include_adult=false')
  .then( results => {
    return results.json();
  }).then(data => {
    let searchResults = data.results.map((result) => {
      return(
        <div key ={result.id}>
          <p>{result.name}</p>
        </div>
      )
    })
    this.setState({searchResults: searchResults});
  })
  return <ul>{this.state.searchResults.map(result => <li>{result}</li>)}</ul>;
}



  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <label>
          TV Show:
          <input type="text" value={this.state.newSearch} onChange={(e) =>this.handleChange(e.target.value)} />
        </label>
        <input type="button" value="Submit" onClick={() => this.handleSubmit()} />
        </form>
        <p>Searching for: {this.state.currSearch}</p>
        { this.componentDidMount() }
      </div>
    );
  }
}

export default TMDBsearch;