import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AppSidebar } from "./components/AppSidebar";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./app/home"; // This is now the authenticated home
import ReportsPage from "./app/reports";
import Transactions from "./app/transactions";
import BillsPage from "./app/bills";
import BudgetsPage from "./app/budgets";
import SavingGoals from "./app/savingGoals";
import ShoppingListPage from "./app/shoppingList";
import CategoriesPage from "./app/categories";
import AddAccount from "./app/pages/AddAccount";

import MarketingPage from "./app/(marketing)/page"; // Import the marketing page
import BlogPage from "./app/(marketing)/blog/page";
import PricingPage from "./app/(marketing)/pricing/page";
import { SidebarProvider } from "./components/ui/sidebar";
import { Toaster } from "./components/ui/toaster";
import AddTransaction from "./app/addTransaction";
import TransactionDetails from "./app/pages/TransactionDetails";
import AccountDetails from "./app/pages/AccountDetails";
import BudgetDetails from "./app/pages/BudgetDetails";
import AddBudget from "./app/pages/AddBudget";
import { currencies } from "./constants";
import { useAccountStore } from "./stores/accountStore";

function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const path = location.pathname;
 console.log({path})
  const pathsWithSidebar = [
    "",

    "/", // Changed to /home
    "/blog",
    "/pricing",
    
  ];
  
  const showSidebar = pathsWithSidebar.some((p) => !path.startsWith(p)) && path !== "/";
  const showNavbar = path === "/"

  return (
    <div className="flex w-screen overflow-hidden">
      {showSidebar && <AppSidebar path={path} />}
      <div className="flex min-h-screen flex-col flex-1 overflow-hidden">
        {showNavbar && <header className="container z-40 bg-background">
          <div className="flex h-20 items-center justify-between py-6">
            <div className="flex gap-6 md:gap-10">
              <a className="hidden items-center space-x-2 md:flex" href="/">
                
                <span className="hidden font-bold sm:inline-block">
                  Masroofy
                </span>
              </a>
              <nav className="hidden gap-6 md:flex">
                <a
                  className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground/60"
                  href="/#features"
                >
                  Features
                </a>
                <a
                  className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground/60"
                  href="/pricing"
                >
                  Pricing
                </a>
                <a
                  className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground/60"
                  href="/blog"
                >
                  Blog
                </a>
                <a
                  className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground/60"
                  href="/docs"
                >
                  Documentation
                </a>
              </nav>
              <button className="flex items-center space-x-2 md:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-command"
                >
                  <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                </svg>
                <span className="font-bold">Menu</span>
              </button>
            </div>
            <nav>
              <a
                className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md px-4"
                href="/home"
              >
                dashbaord
              </a>
            </nav>
          </div>
        </header>}

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

function App() {

  // @ts-ignore
 

  

  return (
    <SidebarProvider>
      <BrowserRouter>
      <AppLayout>
        <Routes>
          {/* Auth Routes (Public) */}
          

          {/* Protected Routes (Require Authentication) */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<MarketingPage />} /> {/* Landing page */}
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/home" element={<Home />} /> {/* Changed to /home */}
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/bills" element={<BillsPage />} />
            <Route path="/budgets" element={<BudgetsPage />} />
            <Route path="/savingGoals" element={<SavingGoals />} />
            <Route path="/shoppingList" element={<ShoppingListPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/account/new" element={<AddAccount />} />
            <Route path="/transaction/new" element={<AddTransaction />} />
            <Route path="/transaction/:id" element={<TransactionDetails  />} />

            <Route path="/account/:id" element={<AccountDetails />} />
            <Route path="/budget/:id" element={<BudgetDetails />} />
            <Route path="/budget/new" element={<AddBudget />} />


            {/* <Route path="/accounts" element={<AccountsListPage />} /> */}
          </Route>
        </Routes>
        <Toaster />
      </AppLayout>
      </BrowserRouter>
    </SidebarProvider>
  );
}

export default App;
