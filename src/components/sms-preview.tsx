import { useState } from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from './ui/button';
import Separator from './ui/separator';
import TextBox from './ui/text-box';

import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { useMessageStore } from '@/hooks/useMessageStore';

import doneIcon from '@icons/done.png';
import greatBritainIcon from '@icons/gb.png';
import sparklesIcon from '@icons/sparkles.png';
import ukraineIcon from '@icons/ua.png';
import { Info } from 'lucide-react';

const Preview = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [alphabet, setAlphabet] = useState<'cyrillic' | 'latin'>('cyrillic');
  const { message } = useMessageStore();
  const copy = useCopyToClipboard();

  const handleCopy = (text: string) => {
    if (isCopied) {
      return;
    }
    const formattedText = text.replace(/\n\n|\n/g, ' ');

    copy(formattedText)
      .then(() => {
        setIsCopied(true);

        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch(() => {
        alert('Виникла помилка 😔');
      });
  };

  return (
    <section className='flex flex-col items-center bg-neutral-200 p-5 lg:min-h-[calc(100vh-96px)] lg:justify-center'>
      <div className='w-full max-w-[600px]'>
        <div className='flex justify-between p-1'>
          <h3 className='self-center text-base font-medium lg:text-lg'>Повідомлення</h3>
          <span className='flex flex-shrink-0 items-center gap-2'>
            <button
              className='text-[0px]'
              onClick={() => {
                setAlphabet('latin');
              }}
            >
              <img
                className='h-7 w-7'
                src={greatBritainIcon}
                alt='Прапор Великої Британії'
              />
              Вибрати англійську мову
            </button>
            <Separator className='bg-neutral-300' orientation='vertical' />
            <button
              className='text-[0px]'
              onClick={() => {
                setAlphabet('cyrillic');
              }}
            >
              <img className='h-7 w-7' src={ukraineIcon} alt='Прапор України' />
              Вибрати українську мову
            </button>
            <TooltipProvider delayDuration={150}>
              <Tooltip>
                <TooltipTrigger>
                  <Info className='h-5 w-5 opacity-40' />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    <strong>Це не перекладач.</strong>
                    <br />
                    Ця функція лише для того, щоб повідомлення було зручніше читати.
                    <br />
                    Якщо текст буде українською, то скопійований текст все одно буде
                    транслітом.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
        </div>
        <TextBox className='mb-4'>{message.text[alphabet]}</TextBox>
        <Button
          className={`min-w-[150px] ${isCopied ? 'bg-green-600 hover:bg-green-600' : ''}`}
          onClick={() => {
            handleCopy(message.text.latin);
          }}
        >
          {isCopied ? 'Скопійовано!' : 'Скопіювати'}
          {isCopied ? (
            <img className='ml-1 h-5 w-5' src={doneIcon} alt='Прапорець' />
          ) : (
            <img className='ml-1 h-5 w-5' src={sparklesIcon} alt='Блискітки' />
          )}
        </Button>
      </div>
    </section>
  );
};

export default Preview;
