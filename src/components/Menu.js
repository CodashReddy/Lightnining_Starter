import { Router, Lightning } from "@lightningjs/sdk";
import { Button, Column, FocusManager, Row } from '@lightningjs/ui-components';

export default class Menu extends Lightning.Component {
  static _template() {
    return {
      MainMenu: {
        Movies: {
          type: MenuItem,
          title: "Movies"
        },
        Series: {
          type: MenuItem,
          title: "Series",
          y: 80
        },
        Exit: {
          type: MenuItem,
          title: "Exit",
          y: 160
        },
        Search:{
          type: MenuItem,
          title: "Search",
          y: 240
        }
      }
    };
  }

  _init() {
    this.index = 0;
  }

  _handleUp() {
    if (this.index > 0) {
      this.index--;
    }
  }

  _handleDown() {
    if (this.index < this.tag("MainMenu").children.length - 1) {
      this.index++;
    }
  }

  _handleRight() {
    Router.focusPage();
  }

  get activeItem() {
    return this.tag("MainMenu").children[this.index];
  }

  _getFocused() {
    return this.activeItem;
  }

  _handleEnter() {
    Router.focusPage();
    if (this.activeItem.title === "Series") {
      Router.navigate("tv");
    } else if (this.activeItem.title === "Movies") {
      Router.navigate("main");
    } else if (this.activeItem.title === "Exit") {
      const popup = true;
      this.application.emit("Exit", popup);
    }else if(this.activeItem.title === 'Search'){
      Router.navigate('search/Wonder',false);
    }
  }
}


class MenuItem extends Lightning.Component {
  static _template() {
    return {
      FocusBox:{
        texture:lng.Tools.getRoundRect(200, 60, 4, 5, 0xff8ecea2, true, 0xff000000),
        Label: { x:40, y:15, text: { text: "Movies", fontSize: 30 ,textColor:0xff8ecea2} },
      },
    };
  }

  _init() {
    this.tag("Label").patch({ text: { text: this.title } });
  }

  pageTransition() {
    return 'up';
  }

  _active() {
    this.application.on("setBackground", val => {
      if (val) {
        this.tag("Label").patch({
          colorTop: 0xff717171,
          colorBottom: 0xff000000
        });
      } else {
        this.tag("Label").patch({
          colorTop: 0xffffffff,
          colorBottom: 0xffffffff
        });
      }
    });
  }

  _focus() {
    this.tag('Label').patch({text:{textColor:0xff00ffff}})
  }

  _unfocus() {
    this.tag('Label').patch({text:{textColor:0xff8ecea2}})
  }
}
