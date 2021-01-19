import { Lightning, Router, Utils } from "@lightningjs/sdk";
import MoviesList from "../components/MoviesList";
import { getImageURL } from "../lib/Utils.js";

export default class Main extends Lightning.Component {
  static _template() {
    return {
      Background: {
        src: Utils.asset("images/background-new.png"),
        w: 1920,
        h: 1080,
        colorTop: 0xff717171,
        colorBottom: 0xff000000,
        scale: 1.2,
        alpha: 0.8,
        transitions: {
          scale: { duration: 2, delay: 0.2, timingFunction: "ease-in" },
          alpha: { duration: 2, delay: 0.2, timingFunction: "ease-in" }
        }
      },
      Logo: {
        src: Utils.asset("images/logosmall.png"),
        w: 300,
        h: 50,
        x: 30,
        y: 10
      },

      Label: {
        x: 450,
        y: 50,
        text: { fontSize: 64 },
        transitions: {
          y: { timingFunction: "ease-in", duration: 2, delay: 0.2 }
        }
      },
      Genres: {
        x: 450,
        y: 120,
        colorLeft: 0xff8ecea2,
        colorRight: 0xff03b3e4,
        text: { fontSize: 32 },
        transitions: {
          y: { timingFunction: "ease-in", duration: 2, delay: 0.2 }
        }
      }
      ,
      List: { type: MoviesList, x: 300,y:200,  flex: { direction: "row", padding: 20, wrap:true },
      w: 1200}
    };
  }

  _init() {
    this.application.on("whenFocused", arrList => {
      const movieBackgrnd = arrList[2];
      this.tag("Background").patch({
        src: getImageURL(movieBackgrnd, 1280)
      });
      this.tag("Label").patch({ text: { text: `${arrList[0]}` } });
      this.tag("Genres").patch({ text: { text: `${arrList[1]}` } });
      this.startTransitions();
    });
  }

_active(){
  this.application.on("setBackground", val => {
    if (val) {
      this.tag("Label").patch({
        colorTop: 0xff717171,
        colorBottom: 0xff000000
      });
      this.tag("Genres").patch({
        colorTop: 0xff717171,
        colorBottom: 0xff000000
      });
    } else {
      this.tag("Label").patch({
        colorTop: 0xffffffff,
        colorBottom: 0xffffffff
      });
      this.tag("Genres").patch({
        colorTop: 0xffffffff,
        colorBottom: 0xffffffff,
        colorLeft: 0xff8ecea2,
        colorRight: 0xff03b3e4
      });
    }
  });
}

  startTransitions() {
    this.tag("Label").patch({ y: 50 });
    this.tag("Genres").patch({ y: 120 });
    this.tag("Label").setSmooth("y", 70);
    this.tag("Genres").setSmooth("y", 140);
  }


  _setBackgroundAlpha(val) {
    this.application.emit("setBackground", val);
  }

  _active() {
    this.application.on("Exit", popup => {
      console.log("popup", popup);
      if (popup) {
        this.widgets.popup.visible = true;
        this.tag("Logo").patch({
          colorTop: 0xff717171,
          colorBottom: 0xff000000
        });
        this._setBackgroundAlpha(true);
        Router.focusWidget("Popup");
      }
    });
    this.application.on("closepopup", popupClose => {
      if (popupClose === false) {
        this.widgets.popup.visible = false;
        this.tag("Logo").patch({
          colorTop: 0xffffffff,
          colorBottom: 0xffffffff
        });
        this._setBackgroundAlpha(false);
        Router.focusPage();
      } else {
        this.application.closeApp();
      }
    });
  }

  $changeBackground() {
    this.tag("Background").patch({ scale: 1.2, alpha: 0.8 });
    this.tag("Background").setSmooth("scale", 1);
    this.tag("Background").setSmooth("alpha", 1);
  }

  _handleUp() {
    Router.focusWidget("Menu");
  }

  _getFocused() {
    return this.tag("List");
  }

  set main(v) {
    this.tag("List").items = v.results.map(result => {
      let label = result.type === "tv" ? result.name : result.title;
      return {
        label: label,
        genres: result.genres,
        src: getImageURL(result.poster_path),
        itemType: result.type,
        itemId: result.id,
        backdrop: result.backdrop_path,
        average: result.vote_average
      };
    });
  }
}
