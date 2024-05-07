import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const editMessage = (
  message: string,
  searchValue: string,
  replaceValue: string
): string => message.replace(new RegExp(searchValue, 'g'), replaceValue);

export function transliterateUkrToEng(text: string): string {
  const TRULESP: { [key: string]: string } = { ЗГ: 'ZgH', Зг: 'Zgh', зг: 'zgh' };
  const TRULESB: { [key: string]: string } = {
    Є: 'Ye',
    Ї: 'Yi',
    Й: 'Y',
    Ю: 'Yu',
    Я: 'Ya',
    є: 'ye',
    ї: 'yi',
    й: 'i',
    ю: 'yu',
    я: 'ya',
  };
  const TRULES: { [key: string]: string } = {
    А: 'A',
    Б: 'B',
    В: 'V',
    Г: 'H',
    Ґ: 'G',
    Д: 'D',
    Е: 'E',
    Є: 'Ie',
    Ж: 'Zh',
    З: 'Z',
    И: 'Y',
    І: 'I',
    Ї: 'I',
    Й: 'I',
    К: 'K',
    Л: 'L',
    М: 'M',
    Н: 'N',
    О: 'O',
    П: 'P',
    Р: 'R',
    С: 'S',
    Т: 'T',
    У: 'U',
    Ф: 'F',
    Х: 'Kh',
    Ц: 'Ts',
    Ч: 'Ch',
    Ш: 'Sh',
    Щ: 'Shch',
    Ь: '',
    Ю: 'Iu',
    Я: 'Ia',
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'h',
    ґ: 'g',
    д: 'd',
    е: 'e',
    є: 'ie',
    ж: 'zh',
    з: 'z',
    и: 'y',
    і: 'i',
    ї: 'i',
    й: 'i',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'kh',
    ц: 'ts',
    ч: 'ch',
    ш: 'sh',
    щ: 'shch',
    ь: '',
    ю: 'iu',
    я: 'ia',
    "'": '',
  };

  let str = text.trim();
  str = str.replace(/ЗГ|Зг|зг/g, (x) => TRULESP[x]);
  str = str.replace(
    /([\s-/.;,:])([ЄЇЙЮЯєїйюя])/g,
    (y, z) => y + TRULESB[z as keyof typeof TRULESB] || ''
  );
  str = str.replace(
    /[АБВГЗГЗгҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ’'абвгзгґдеєжзиіїйклмнопрстуфхцчшщьюя]/g,
    (x) => TRULES[x]
  );
  return str;
}
