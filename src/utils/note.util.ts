import {Note} from '../types/types';

export const FG_COLORS = ['white', 'black'];
export const BG_COLORS = ['green', 'blue', 'red', 'lightblue', 'orange', 'magenta', 'grey', 'pink', 'purple'];
export const DEFAULT_COLOR = FG_COLORS[0];

export const getDefaultTextNote = (): Note => ({
  id: `newNote${getRandomNumber(100000)}`,
  backgroundColor: BG_COLORS[getRandomNumber(BG_COLORS.length)],
  content: 'I am a text note - drag me :-)',
  color: FG_COLORS[getRandomNumber(FG_COLORS.length)],
  size: 100,
  type: 'text',
  x: 50,
  y: 50,
});

const getRandomNumber = (max: number) => Math.floor(Math.random() * Math.floor(max));
