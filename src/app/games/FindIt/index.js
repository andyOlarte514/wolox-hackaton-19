import createGame from '@components/createGame';

import Gameplay from './Gameplay';
import SoundTap from './SoundTap';

const instructions = 'Instrucciones de prueba.';

export default createGame({instructions, Gameplay, mode: 'portait'});
