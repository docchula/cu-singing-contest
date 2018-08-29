import { Day } from './day';
import { Faculty } from './faculty';
import { SelectedSong } from './selected-song';

export interface User {
  accepted: boolean;
  profile: {
    title: string;
    fname: string;
    lname: string;
    nname: string;
    email: string;
    facebook: string;
    line: string;
    mobile: string;
    education: {
      educationLevel: string;
      year?: number;
    };
    faculty: Faculty;
  };
  days: {
    d1: Day;
    d2: Day;
    d3: Day;
    d4: Day;
    d5: Day;
  };
  slipUrl: string;
  slipChecked: boolean;
  selectedSong: SelectedSong;
  songChecked: boolean;
  $key?: string;
  firstDay: {
    preference: any;
    day: Day;
  };
  allowRound2: boolean;
  selectedSong2: SelectedSong;
}
