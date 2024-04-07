import messageIcon from '@icons/message.png';

const Header = () => {
  return (
    <header className='flex min-h-24 items-center justify-center border-b border-neutral-200 bg-white'>
      <div className='flex items-center gap-2'>
        <h1 className='text-3xl font-normal tracking-tight lg:text-4xl'>
          <span className='font-bold text-red-600'>ТМЦ</span> SMS Конструктор
        </h1>
        <img
          className='h-9 w-9'
          src={messageIcon}
          alt='Зображення повідомлення у вигляді хмари'
        />
      </div>
    </header>
  );
};

export default Header;
