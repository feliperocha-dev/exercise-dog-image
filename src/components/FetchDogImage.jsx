import React, { Component } from 'react';

class FetchDogImage extends Component {
  constructor() {
    super();
    this.state = {
      img: '',
      loading: true,
      previousImg: [],
      dogRace: '',
    }
    this.fetchDogImage = this.fetchDogImage.bind(this);
    this.updateDogImage = this.updateDogImage.bind(this);
  }

  async fetchDogImage() {
    const url = await fetch('https://dog.ceo/api/breeds/image/random')
      .then((data) => data.json())
      .then((data) => data.message)
    const dogRace = url.split('/')[4];
    this.setState({
      img: url,
      loading: false,
      dogRace: dogRace,
    })
    alert(`Raça: ${this.state.dogRace}`)
  }
  
  componentDidMount() {
    this.fetchDogImage();
  }

  updateDogImage() {
    this.setState((prevState) => ({
      previousImg: [...prevState.previousImg, this.state.img],
      loading: true,
    }))
    this.fetchDogImage()
  }

  render() {
    const imgContainer = (
      <>
        <img src={ this.state.img } alt='Dog'></img>
        <button type='button' onClick={this.updateDogImage}>Fecth Dog</button>
      </>
    )
    return(
      <>
        { (this.state.loading) ? <span>Loading</span> : imgContainer }
      </>
    )
  }
}

export default FetchDogImage;