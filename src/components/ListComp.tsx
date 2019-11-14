import * as React from 'react';
import _ from 'underscore';

const elements = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f"
];

class ListComp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {elements: elements};
    }
    handleClick(element, e){
      e.stopPropagation();
      if(element === 'a'){
        alert('add a');
      }
    }
    render() {
      const elements = this.state.elements;
      const items = elements.map(element => {
        return <li key={element}><a onClick={this.handleClick.bind(this, element)}>{element}</a></li>;
      });
      return <ul className='list'>
        {items}
      </ul>;
    }
}

export default ListComp;
