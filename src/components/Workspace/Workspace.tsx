import React from "react";
import { Note } from "../../types/types";
import { MediaNote } from "../MediaNote/MediaNote";
import { TextNote } from "../TextNote/TextNote";
import './workspace.scss';


type NotesProps = {
  // using `interface` is also ok
  notes: Note[];
};
type NotesState = {
  notes: Note[]; // like this
};

export class Workspace extends React.Component<NotesProps, NotesState> {

  constructor(props: NotesProps) {
    super(props);
    this.state = {
      notes: [...this.props.notes],
    };
  }

  render() {
    return (
      <div className="workspace">
        {this.state.notes?.map((note: Note, i: number) => {

          if (note.type === 'media') {
            return (
              <MediaNote key={i} {...note} onReorder={this.handleReorder} />
            )
          } 
          return (
            <TextNote key={i} {...note} onReorder={this.handleReorder} />
          )


        })}
      </div>
    )
  }

  handleReorder = (handledNoteId: any) => {

    // console.log(this.state.notes);
    // const handledNote = this.state.notes.find(n => n.id === handledNoteId);
    // this.setState(prevState => ({
    //   notes: [
    //     ...prevState.notes.filter(n => n.id !== handledNoteId),
    //     handledNote
    //   ]
    // }))
    // console.log(this.state.notes);
  }
}
