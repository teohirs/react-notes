import React from 'react';
import {Note, WorkspaceProps} from '../../types/types';
import {getDefaultTextNote} from '../../utils/note.util';
import TextNote from '../TextNote/TextNote';
import './workspace.scss';

export const Workspace: React.FC<WorkspaceProps> = ({notes}) => (
  <div className="workspace">
    {notes?.map((note: Note, i: number) => (
      <TextNote key={i} {...note} />
    ))}
  </div>
);

export default Workspace;
