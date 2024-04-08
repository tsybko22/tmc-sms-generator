import { useState } from 'react';

import { Button } from './ui/button';
import Separator from './ui/separator';
import TextBox from './ui/text-box';

import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

import doneIcon from '@icons/done.png';
import greatBritainIcon from '@icons/gb.png';
import sparklesIcon from '@icons/sparkles.png';
import ukraineIcon from '@icons/ua.png';

const dummyText =
  'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo, incidunt ratione non reprehenderit deleniti rem vitae optio nihil. Vel sit accusamus ad accusantium ducimus. Eos ipsam laudantium nisi soluta illo? Eligendi quo amet aspernatur pariatur doloribus saepe repellendus delectus quaerat illum vitae. Cupiditate ipsam eum amet quasi. Id, officiis. Delectus harum doloribus, adipisci nisi soluta ipsa quam velit ab cumque!';

const Preview = () => {
  const [isCopied, setIsCopied] = useState(false);
  const copy = useCopyToClipboard();

  const handleCopy = (text: string) => {
    if (isCopied) {
      return;
    }

    copy(text)
      .then(() => {
        setIsCopied(true);

        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch(() => {
        alert('Failed to copy!');
      });
  };

  return (
    <section className='flex flex-col items-center bg-neutral-200 p-5 lg:min-h-[calc(100vh-96px)] lg:justify-center'>
      <div className='w-full max-w-[600px]'>
        <div className='flex justify-between p-1'>
          <h3 className='self-center text-base font-medium lg:text-lg'>Повідомлення</h3>
          <span className='flex flex-shrink-0 gap-2'>
            <button className='text-[0px]'>
              <img
                className='h-7 w-7'
                src={greatBritainIcon}
                alt='Прапор Великої Британії'
              />
              Вибрати англійську мову
            </button>
            <Separator className='bg-neutral-300' orientation='vertical' />
            <button className='text-[0px]'>
              <img className='h-7 w-7' src={ukraineIcon} alt='Прапор України' />
              Вибрати українську мову
            </button>
          </span>
        </div>
        <TextBox className='mb-4'>{dummyText}</TextBox>
        <Button
          className={`min-w-[150px] ${isCopied ? 'bg-green-600 hover:bg-green-600' : ''}`}
          onClick={() => {
            handleCopy(dummyText);
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
