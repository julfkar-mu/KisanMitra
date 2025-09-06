import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Home from "@/pages/Home";
import CropDetail from "@/pages/CropDetail";
import DiseaseDetail from "@/pages/DiseaseDetail";
import AdminPanel from "@/pages/AdminPanel";
import NotFound from "@/pages/not-found";
import { Home as HomeIcon, Camera, Bookmark, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import "./lib/i18n";

function MobileBottomNavigation() {
  const { t } = useTranslation();
  const [location, navigate] = useLocation();

  const navItems = [
    { icon: HomeIcon, label: t('home'), path: '/', testId: 'nav-home' },
    { icon: Camera, label: t('scan'), path: '/scan', testId: 'nav-scan' },
    { icon: Bookmark, label: t('saved'), path: '/saved', testId: 'nav-saved' },
    { icon: User, label: t('profile'), path: '/profile', testId: 'nav-profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border md:hidden z-40">
      <div className="grid grid-cols-4 gap-1 p-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;
          
          return (
            <button
              key={item.path}
              className={`flex flex-col items-center py-2 touch-target transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => navigate(item.path)}
              data-testid={item.testId}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-hindi">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function Router() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pb-20 md:pb-0">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/crops/:id" component={CropDetail} />
          <Route path="/diseases/:id" component={DiseaseDetail} />
          <Route path="/admin" component={AdminPanel} />
          {/* Placeholder routes for mobile navigation */}
          <Route path="/scan">
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <Camera className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-xl font-semibold mb-2 font-hindi">स्कैन फीचर</h2>
                <p className="text-muted-foreground font-hindi">जल्द ही उपलब्ध होगा</p>
              </div>
            </div>
          </Route>
          <Route path="/saved">
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <Bookmark className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-xl font-semibold mb-2 font-hindi">सहेजे गए</h2>
                <p className="text-muted-foreground font-hindi">जल्द ही उपलब्ध होगा</p>
              </div>
            </div>
          </Route>
          <Route path="/profile">
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <User className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-xl font-semibold mb-2 font-hindi">प्रोफाइल</h2>
                <p className="text-muted-foreground font-hindi">जल्द ही उपलब्ध होगा</p>
              </div>
            </div>
          </Route>
          {/* Fallback to 404 */}
          <Route component={NotFound} />
        </Switch>
      </div>
      <MobileBottomNavigation />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
