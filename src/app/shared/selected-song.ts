import { Song } from './song';
export interface SelectedSong {
  mode: 'standard' | 'custom' | 'live';
  song: Song;
}
