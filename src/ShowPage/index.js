import React, {Component} from 'react';
import List from '../List';

class ShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      list: []
    }
  }

  getlist = async () => {
    const list = await fetch('http://35.193.222.119:9000' + this.props.match.url );

    const listParsedJSON = await list.json();
      return listParsedJSON
  }

  componentDidMount() {
    this.getlist().then((list) => {
      this.setState({list: list.data, dataLoaded: true})
    }).catch((err) => {
      console.log(err);
    })
  }


  render() {
    console.log(this.state, 'Show Page');
    let backgroundHeight = window.innerHeight;

    return(
      <div style={{height: backgroundHeight}}>
        {this.state.dataLoaded ? <List data={this.state.list} /> : null}
      </div>
    )
  }
}

export default ShowPage;
