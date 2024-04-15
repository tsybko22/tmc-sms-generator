import { useEffect, useMemo, useState } from 'react';

import { useMessageStore } from '@/hooks/useMessageStore';
import { type FormOption, type Message } from '@/types';

import ComboBox from '@/components/combobox';
import EditorForm from '@/components/editor-form';

import data from '@/data/sms.json';
import stepOneIcon from '@icons/step1.png';

const Editor = () => {
  const { setMessage, resetMessage } = useMessageStore();
  const [currentOption, setCurrentOption] = useState<string | null>(null);
  const options: FormOption[] = useMemo(
    () =>
      data.reduce<FormOption[]>((acc, item) => {
        acc.push({ label: item.name, value: item.name });
        return acc;
      }, []),
    []
  );
  const currentMessage: Message | undefined = data.find(
    (message) => message.name === currentOption
  );

  useEffect(() => {
    if (currentMessage) {
      setMessage(currentMessage);
    } else {
      resetMessage();
    }
  }, [currentMessage, resetMessage, setMessage]);

  return (
    <section className='custom-scrollbar flex flex-col items-center bg-white p-5 lg:max-h-[calc(100vh-96px)] lg:items-start lg:overflow-y-scroll lg:p-10'>
      <h2 className='text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl'>
        Конструктор
      </h2>
      <p className='mb-5 mt-7 flex items-center gap-2 text-base leading-7 lg:text-lg'>
        <img className='h-7 w-7' src={stepOneIcon} alt='Зображення цифри 1' />
        Оберіть необхідний шаблон в меню знизу (працює пошук по словам):
      </p>
      <ComboBox options={options} value={currentOption} setValue={setCurrentOption} />
      {currentMessage && <EditorForm message={currentMessage} />}
    </section>
  );
};

export default Editor;
