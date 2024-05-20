import ThemeToggle from '@/components/theme-toggle';

import messageIcon from '@icons/message.png';

const Header = () => {
  return (
    <header className='flex min-h-24 flex-col items-center gap-2 border-b border-neutral-300/90 bg-background p-3 dark:border-neutral-700/90 sm:flex-row sm:justify-between'>
      <div className='flex items-center gap-2 sm:ml-auto sm:mr-auto'>
        <h1 className='text-2xl font-normal tracking-tight md:text-3xl lg:text-4xl'>
          <span className='font-bold text-red-600 dark:text-red-500/95'>ТМЦ</span> SMS
          Конструктор
        </h1>
        <img
          className='h-9 w-9'
          src={messageIcon}
          alt='Зображення повідомлення у вигляді хмари'
        />
      </div>
      <ThemeToggle />
    </header>
  );
};

export default Header;
