import React, { useRef } from 'react'
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import { Note } from '../../types/types';
import { DEFAULT_COLOR } from '../../utils/note.util';
import './mediaNote.scss';


export class MediaNote extends React.Component<Note> {
  

  onDragStop = (e: any, position: any) => {
    const {x, y} = position;
    console.log(this.props);
    this.persistNewLocation(x, y)
    this.props.onReorder(this.props.id, x, y);
  };

  persistNewLocation(x: number, y: number) {
    fetch(`http://localhost:3002/notes/` + this.props.id, {
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
    fetch(`http://localhost:3002/notes/` + this.props.id, {
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
        defaultPosition={{x: this.props.x, y:this.props.y}} 
        scale={1}  
        onStop={this.onDragStop}>
      <div
        style={{
          backgroundColor: this.props.backgroundColor,
          color: this.props.color ?? DEFAULT_COLOR,
          width: this.props.size,
          height: this.props.size,
        }}
      >
        <img className="profile-photo" src={this.props.content}/>
        <textarea 
          defaultValue={this.props.content}
          onChange={this.onTextChange} />
      </div>
    </Draggable>
    );
  }
}