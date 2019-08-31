import React, { Component } from 'react';

import GameInstructions from '@components/GameInstructions';

import Tts from 'react-native-tts';

const generalInstructions = `
Si te ha sido claro, presiona el lado derecho de la pantalla para comennzar.
Si quieres que repita las instrucciones, presiona la pantalla del lado izquierdo.
`;


function createGame({ instructions, Gameplay }) {
  class Game extends Component {
    static defaultProps = {
      level: 1
    };

    state = { step: 'instructions' };

    handleSpeech = () => Tts.speak(instructions + generalInstructions);
    handleStart = () => this.setState({ step: 'playing' });
    handleFinish = (isVictory) => {}; // TODO: Finish this

    render() {
      const { step } = this.state;
      const { level } = this.props;
      if (step === 'instructions') {
        return (
          <GameInstructions
            instructions={instructions + generalInstructions}
            onSpeech={this.handleSpeech}
            onStart={this.handleStart}
          />
        );
      }
      return <Gameplay level={level} onFinish={this.handleFinish} />
    }
  }

  return Game;
}

export default createGame;