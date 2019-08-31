import createGame from '@components/createGame';

import Gameplay from './Gameplay';

const instructions = `
  Para este juego deberás presionar izquierda o derecha,
  dependiendo de si escuchas un sonido de un platillo o un tambor.
`;

export default createGame({instructions, Gameplay, mode: 'portait'});
