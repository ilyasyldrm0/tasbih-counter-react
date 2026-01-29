import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import { en } from './en';
import { tr } from './tr';

const i18n = new I18n({
    en,
    tr,
});

i18n.enableFallback = true;

// Set the locale once at the beginning of your app.
const deviceLanguage = getLocales()[0]?.languageCode ?? 'en';
i18n.locale = deviceLanguage;

export default i18n;
