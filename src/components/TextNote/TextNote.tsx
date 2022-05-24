import React, {useRef} from 'react';
import Draggable from 'react-draggable';
import {Note} from '../../types/types';
import {DEFAULT_COLOR} from '../../utils/note.util';
import './textNote.scss';

const TextNote: React.FC<Note> = ({backgroundColor, content, color, size, x, y}) => {
  const ref = useRef(null);

  return (
    <Draggable nodeRef={ref} axis="both" defaultClassName="note text-note" defaultPosition={{x, y}} scale={1}>
      <div
        ref={ref}
        style={{
          backgroundColor,
          color: color ?? DEFAULT_COLOR,
          width: size,
          height: size,
        }}
      >
        <img src={content} />
      </div>
    </Draggable>
  );
};

export default TextNote;
