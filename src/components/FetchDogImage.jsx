import React, { Component } from 'react';

class FetchDogImage extends Component {
  constructor() {
    super();
    this.state = {
      img: '',
      loading: true,
      previousImg: [],
      dogBreed: '',
      imgLoaded: false,
    }
    this.fetchDogImage = this.fetchDogImage.bind(this);
    this.updateDogImage = this.updateDogImage.bind(this);
    this.handleImgLoad = this.handleImgLoad.bind(this);
  }

  async fetchDogImage() {
    const url = await fetch('https://dog.ceo/api/breeds/image/random')
      .then((data) => data.json())
      .then((data) => data.message)
    this.setState({
      img: url,
      loading: false,
      dogBreed: url.split('/')[4],
    })
  }
  
  componentDidMount() {
    this.fetchDogImage();
  }

  updateDogImage() {
    this.setState((prevState) => ({
      previousImg: [...prevState.previousImg, this.state.img],
      loading: true,
      imgLoaded: false,
    }))
    this.fetchDogImage()
  }

  handleImgLoad() {
    this.setState({
      imgLoaded: true,
    })
  }

  render() {
    return(
      <>
        { (this.state.loading) ? <span>Loading</span> : <img src={ this.state.img } alt='Dog'onLoad={this.handleImgLoad} ></img> }
        { (this.state.imgLoaded) && 
          <>
            <p>Dog Breed: {this.state.dogBreed}</p>
            <button type='button' onClick={this.updateDogImage}>Next</button>
          </>
         }
      </>
    )
  }
}

export default FetchDogImage;