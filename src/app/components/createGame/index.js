import React, {Component} from 'react';
import GameInstructions from '@components/GameInstructions';
import Orientation from 'react-native-orientation-locker';
import Tts from 'react-native-tts';

const generalInstructions = `
Si te ha sido claro, presiona el lado derecho de la pantalla para comennzar.
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
      Tts.speak(instructions + positionInstructions + generalInstructions);
    };

    handleStart = () => {
      Tts.stop();
      this.setState({step: 'playing'});
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
            instructions={instructions + positionInstructions + generalInstructions}
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
