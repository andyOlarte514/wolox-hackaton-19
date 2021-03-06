// https://github.com/react-community/react-navigation/issues/458
// once that issue is resolved, the initial loading screen is no longer needed and should be removed
//  in favour of setting the initialRoute as a prop of the navigator
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import Routes from '@constants/routes';
import {stackNavConfig, screensNavOptions, tabNavConfig} from '@config/navigation';
import {inferRoute} from '@utils/navUtils';
import FindIt from '@games/FindIt';
import SoundTap from '@games/SoundTap';

export default createStackNavigator(
  {
    [Routes.Home]: {
      screen: SoundTap/* createBottomTabNavigator(
        {
          ...inferRoute({FindIt}),
          ...inferRoute({SoundTap}),
        },
        tabNavConfig,
      ) */,
      navigationOptions: screensNavOptions[Routes.Home]
    }
  },
  stackNavConfig,
);
