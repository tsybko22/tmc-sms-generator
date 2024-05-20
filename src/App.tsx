import Header from '@/components/header';
import Editor from '@/components/sms-editor';
import Preview from '@/components/sms-preview';
import { ThemeProvider } from '@/hooks/useTheme';

const App = () => {
  return (
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      <div className='min-h-screen bg-background'>
        <Header />
        <main className='grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-0'>
          <Editor />
          <Preview />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
