import React, { useRef } from 'react'
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import { Note } from '../../types/types';
import { DEFAULT_COLOR } from '../../utils/note.util';

type MyState = {
  id: string,
  backgroundColor: string, 
  content: string, 
  color: string, 
  size: number,
  x: number, 
  y: number,
};


export class TextNote extends React.Component<Note, MyState> {
  

  constructor(props: any) {
    super(props);
    this.state = {
      id: props.id,
      backgroundColor: props.backgroundColor, 
      content: props.content, 
      color: props.color, 
      size: props.size,
      x: props.x, 
      y: props.y,
    };
  }

  onDragStop = (e: any, position: any) => {
    const {x, y} = position;
    this.persistNewLocation(x, y)
  };

  persistNewLocation(x: number, y: number) {
    fetch(`http://localhost:3002/notes/` + this.state.id, {
      method: 'PATCH',
      body: JSON.stringify({
        x: x,
        y: y,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((note) => {
        return this.setState({
          x: note.x, 
          y: note.y,
        })
      });
  }

  onTextChange = (event: any) => {
    this.persistNewText(event.target.value);
  }

  persistNewText(content: string) {
    fetch(`http://localhost:3002/notes/` + this.state.id, {
      method: 'PATCH',
      body: JSON.stringify({
        content: content 
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((note) => {
        return this.setState({
          content: content
        })
      });
  }
    
  render() {
    return (
      <Draggable 
        axis="both" 
        defaultClassName="note text-note" 
        defaultPosition={{x: this.state.x, y:this.state.y}} 
        scale={1}  
        onStop={this.onDragStop}>
      <div
        style={{
          backgroundColor: this.state.backgroundColor,
          color: this.state.color ?? DEFAULT_COLOR,
          width: this.state.size,
          height: this.state.size,
        }}
      >
        <textarea 
          defaultValue={this.state.content}
          onChange={this.onTextChange} />
      </div>
    </Draggable>
    );
  }
}