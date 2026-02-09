import pl from './pl.json';
import en from './en.json';

export type Locale = 'pl' | 'en';

const translations = { pl, en };

export function getTranslations(locale: Locale) {
  return translations[locale];
}

export const defaultLocale: Locale = 'pl';

export function getLocalizedPath(locale: Locale, path: string = ''): string {
  // Polish is the default locale (root), English has /en/ prefix
  if (locale === 'pl') {
    return path || '/';
  }
  return `/en${path}`;
}
