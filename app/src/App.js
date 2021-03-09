import Footer from './components/Footer';
import Header from './components/Header';
import Router from './router';

function App() {
  return (
    <div className="antialiased bg-gray-300 flex flex-col min-h-screen text-gray-900">
      <Header />
      <main className="flex-1 mb-12">
        <Router />
      </main>
      <Footer />
    </div>
  );
}

export default App;
