import {Component, ElementRef, Input, OnInit, ChangeDetectionStrategy, OnChanges} from '@angular/core';

@Component({
  selector: 'ya-avatar',
  templateUrl: 'ya-avatar.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YaAvatar implements OnInit, OnChanges {

  @Input('username') username: string;
  
  letterSrc: string;
  background: string = 'red';
  fontSize: number = 49;
  padding: number = 28;
  letter: string = "?";
  size: number = 100;
  fontColor: string = '#FFFFFF';
  border: string;
  props: Object = null;

  private _el: HTMLElement;

  constructor(el: ElementRef) {
    this._el = el.nativeElement;
  }

  generateLetter() {
    if (!this.username) {
      throw Error("LetterAvatarDirective configdata not provides");
    }

    var letter = this.username.substr(0, 1).toUpperCase();
    this.fontColor = "#FFFFFF";
    var isSquare = false;
    var border =  "border:5px solid white";
    this.letter = letter;
    this.props = new Object();
    this.props['letter'] = letter;
    //this.props['fontSize'] = this.fontSize;
    if (isSquare) {
      this.props['borderradius'] = '0%';
    } else {
      this.props['borderradius'] = '50%';
    }
    this.props['border'] = border;    
    this.props['background'] =  this.getRandomColor(letter);
    
    return true;
  };


  alphabetcolors = ["#5A8770", "#B2B7BB", "#6FA9AB", "#F5AF29", "#0088B9", "#F18636", "#D93A37", "#A6B12E", "#5C9BBC", "#F5888D", "#9A89B5", "#407887", "#9A89B5", "#5A8770", "#D33F33", "#A2B01F", "#F0B126", "#0087BF", "#F18636", "#0087BF", "#B2B7BB", "#72ACAE", "#9C8AB4", "#5A8770", "#EEB424", "#407887"];


  getRandomColor(c: string) {

    if (c.charCodeAt(0) < 65) {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }    } else {
        let colorIndex = Math.floor((c.charCodeAt(0) - 65) % this.alphabetcolors.length);
        color = this.alphabetcolors[colorIndex];
    }
    return color;
  }


  colorize(str) {
    for (var i = 0, hash = 0; i < str.length; hash = str.charCodeAt(i++) + ((hash << 5) - hash));
    var color = Math.floor(Math.abs((Math.sin(hash) * 10000) % 1 * 16777216)).toString(16);
    return '#' + Array(6 - color.length + 1).join('0') + color;
  }

  ngOnInit() {
    this.generateLetter();
  }
  ngOnChanges(...args: any[]) {
    this.generateLetter();
  }
}