import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CustomCursor } from './components/CustomCursor';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { useTheme } from './hooks/useTheme';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('hero');

  return (
    <BrowserRouter>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <CustomCursor />

      <div className="flex min-h-screen flex-col bg-[#FAF7FD] text-[#21152F] dark:bg-[#180F24] dark:text-[#F3E8FF]">
        <Navbar
          theme={theme}
          onToggleTheme={toggleTheme}
          activeSection={activeSection}
        />

        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          <Routes>
            <Route
              path="/"
              element={<HomePage onActiveSectionChange={setActiveSection} />}
            />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
