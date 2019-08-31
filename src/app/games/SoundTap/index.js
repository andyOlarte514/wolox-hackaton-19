import createGame from '@components/createGame';

import Gameplay from './Gameplay';

const instructions = `
  Repite las instrucciones que te diga.
`;

export default createGame({instructions, Gameplay, mode: 'portait'});
