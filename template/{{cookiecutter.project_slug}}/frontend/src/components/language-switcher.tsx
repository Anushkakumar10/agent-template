{%- if cookiecutter.enable_i18n %}
"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { locales, defaultLocale, type Locale, getLocaleLabel } from "@/i18n";

/**
 * Strip the current locale prefix from a pathname and prepend the new locale.
 * Handles "as-needed" locale prefix mode where the default locale has no prefix.
 */
function switchLocalePath(pathname: string, currentLocale: string, newLocale: Locale): string {
  let pathWithoutLocale = pathname;
  if (currentLocale !== defaultLocale) {
    const prefix = `/${currentLocale}`;
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      pathWithoutLocale = pathname.slice(prefix.length) || "/";
    }
  }

  if (newLocale === defaultLocale) {
    return pathWithoutLocale;
  }
  return `/${newLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;
}

/**
 * Language switcher dropdown component.
 */
export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: Locale) => {
    router.push(switchLocalePath(pathname, locale, newLocale));
  };

  return (
    <div className="relative">
      <select
        value={locale}
        onChange={(e) => handleChange(e.target.value as Locale)}
        className="cursor-pointer appearance-none rounded-md border border-gray-300 bg-transparent px-3 py-1.5 pr-8 text-sm hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:hover:border-gray-500"
        aria-label="Select language"
      >
        {locales.map((loc) => (
          <option key={loc} value={loc}>
            {getLocaleLabel(loc)}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

/**
 * Compact language switcher with flag icons.
 */
export function LanguageSwitcherCompact() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const flags: Record<Locale, string> = {
    en: "🇬🇧",
    pl: "🇵🇱",
  };

  const handleChange = (newLocale: Locale) => {
    router.push(switchLocalePath(pathname, locale, newLocale));
  };

  return (
    <div className="flex gap-1">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleChange(loc)}
          className={`rounded-md px-2 py-1 text-lg transition-opacity ${
            locale === loc
              ? "bg-gray-100 opacity-100 dark:bg-gray-800"
              : "opacity-50 hover:opacity-75"
          }`}
          aria-label={getLocaleLabel(loc)}
          aria-pressed={locale === loc}
        >
          {flags[loc]}
        </button>
      ))}
    </div>
  );
}
{%- else %}
// i18n is disabled - no language switcher component
export function LanguageSwitcher() {
  return null;
}

export function LanguageSwitcherCompact() {
  return null;
}
{%- endif %}
