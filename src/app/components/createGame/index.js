import React, {Component} from 'react';
import GameInstructions from '@components/GameInstructions';
import Orientation from 'react-native-orientation-locker';
import {Vibration, StyleSheet} from 'react-native';
import Tts from 'react-native-tts';

const generalInstructions = `
El juego pretende fortalecer tu memoria a partir de patrones rítmicos, la idea 
es que nosotros generamos un patron de dos sonidos y tu lo debes replicar oprimiendo
la pantalla de lado izquierdo o derecho. Siendo el derecho el sonido más agudo y el izquierdo
el sonido mas grave.
Si te ha sido claro, presiona el lado derecho de la pantalla para comenzar.
Si quieres que repita las instrucciones, presiona la pantalla del lado izquierdo.
`;

const landscapeHelp = `
Deberás utilizar el celular de forma horizontal para jugar este juego.
`;

const portaitHelp = `
Deberás utilizar el celular de forma vertical para jugar este juego.
`;

const anyHelp = `
Puedes utilizar el celular de cualquier forma para este juego.
`;

function createGame({instructions, Gameplay, mode = 'any'}) {
  let positionInstructions = anyHelp;
  if (mode === 'landscape') {
    positionInstructions = landscapeHelp;
  } else if (mode === 'portait') {
    positionInstructions = portaitHelp;
  }
  class Game extends Component {
    static defaultProps = {
      level: 1,
    };
    state = {step: 'instructions'};

    handleSpeech = () => {
      Tts.stop();
      Tts.setDefaultLanguage('es-MX');
      Tts.speak(instructions + positionInstructions + generalInstructions);
      Vibration.vibrate(300);
    };

    handleStart = () => {
      Tts.stop();
      this.setState({step: 'playing'});
      Vibration.vibrate(300);
    };

    handleFinish = isVictory => {}; // TODO: Finish this

    componentDidMount() {
      if (mode === 'landscape') {
        Orientation.lockToLandscape();
      } else if (mode === 'portait') {
        Orientation.lockToPortrait();
      }
    }

    componentWillUnmount() {
      Orientation.unlockAllOrientations();
    }

    render() {
      const {step} = this.state;
      const {level} = this.props;
      if (step === 'instructions') {
        return (
          <GameInstructions
            title={instructions}
            instructions={positionInstructions + generalInstructions}
            onSpeech={this.handleSpeech}
            onStart={this.handleStart}
          />
        );
      }
      return <Gameplay level={level} onFinish={this.handleFinish} />;
    }
  }

  return Game;
}

export default createGame;
