import messageIcon from '@icons/message.png';

const Header = () => {
  return (
    <header className='flex min-h-24 items-center justify-center border-b border-neutral-200'>
      <div className='flex items-center gap-2'>
        <h1 className='scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl'>
          <span className='text-red-600'>ТМЦ</span> SMS Конструктор
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
