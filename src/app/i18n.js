import i18next from 'i18next';
import Routes from '@constants/routes';

// TODO: Replace here the screens titles

i18next.addResources('es', 'app', {
  es: {
    [Routes.FindIt]: 'FindIt',
    [Routes.SoundTap]: 'SoundTap',
    [Routes.Home]: 'Home',
  },
});
