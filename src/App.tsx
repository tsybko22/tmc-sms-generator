import Header from '@/components/header';
import Editor from '@/components/sms-editor';
import Preview from '@/components/sms-preview';

const App = () => {
  return (
    <div className='min-h-screen bg-neutral-200'>
      <Header />
      <main className='grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-0'>
        <Editor />
        <Preview />
      </main>
    </div>
  );
};

export default App;
