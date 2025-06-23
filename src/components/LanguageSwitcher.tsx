// src/components/LanguageSwitcher.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation, matchPath } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, ChevronsUpDown } from 'lucide-react';
import { supportedLngs } from '../i18n'; // Mantenemos esto
import { routesConfig } from '../routes'; // CAMBIO: Importar desde '../routes'
import { useAlternateLinks } from '../context/AlternateLinksContext';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const alternateLinks = useAlternateLinks();

  const changeLanguage = (newLang: string) => {
    if (i18n.language === newLang) return;

    if (alternateLinks && alternateLinks[newLang]) {
      navigate(alternateLinks[newLang]);
      return;
    }

    const currentPath = location.pathname;

    if (currentPath === `/${i18n.language}` || currentPath === `/${i18n.language}/`) {
      navigate(`/${newLang}`);
      return;
    }

    let bestMatch: { routeKey: string, params: Record<string, string | undefined> } | null = null;

    for (const route of routesConfig) {
      const pathPatternCurrentLang = route.paths[i18n.language as keyof typeof route.paths];
      if (pathPatternCurrentLang) {
        const fullPattern = `/${i18n.language}/${pathPatternCurrentLang}`;
        const match = matchPath(fullPattern, currentPath);

        if (match) {
          bestMatch = { routeKey: route.key, params: match.params };
          break;
        }
      }
    }

    if (bestMatch) {
      const newPathSlugConfig = routesConfig.find(r => r.key === bestMatch!.routeKey)?.paths[newLang as keyof typeof routesConfig[0]['paths']];
      
      if (newPathSlugConfig) {
        let finalPath = `/${newLang}/${newPathSlugConfig}`;
        
        for (const paramName in bestMatch.params) {
          if (bestMatch.params[paramName]) {
            finalPath = finalPath.replace(`:${paramName}`, bestMatch.params[paramName]!);
          }
        }
        
        if (!finalPath.includes(':')) {
          navigate(finalPath);
          return;
        } else {
          console.warn(`No se pudieron reemplazar todos los parámetros para la ruta ${bestMatch.routeKey} en ${newLang}. Fallback a inicio.`);
        }
      }
    }
    navigate(`/${newLang}`);
  };

  const languageLabels: { [key: string]: string } = {
    es: 'Español',
    en: 'English',
    fr: 'Français',
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-white hover:bg-white/20 hover:text-white px-2 sm:px-3">
          <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline ml-2 font-medium">{languageLabels[i18n.language]}</span>
          <ChevronsUpDown className="hidden sm:inline ml-1 h-4 w-4 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm border-slate-300">
        {Object.keys(supportedLngs).map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => changeLanguage(lang)}
            className="cursor-pointer font-medium"
          >
            {languageLabels[lang]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};