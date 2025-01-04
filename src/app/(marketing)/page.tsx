import { cn } from "../../lib/utils"
import { buttonVariants } from "../../components/ui/button"
import { Link } from "react-router-dom"

const siteConfig = {
  name: "Masroofy",
  description:
    "Your all-in-one personal finance management solution for budgeting, expense tracking, and financial goal setting.",
  links: {
    github: "https://github.com/yourusername/masroofy",
  },
}

export default function IndexPage() {
  return (
    <>
      <section className="container mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <div className="flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <span className="rounded-2xl bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-800">
            Take Control of Your Finances
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Smart Money Management Made Simple
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Track expenses, manage budgets, set savings goals, and visualize your financial journey
            with Masroofy's intuitive tools and insights.
          </p>
          <div className="space-x-4">
            <Link to="/signup" className={cn(buttonVariants({ size: "lg" }))}>
              Start Free Trial
            </Link>
            <Link
              to="/demo"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              Live Demo
            </Link>
          </div>
        </div>
      </section>
      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Everything You Need
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Masroofy brings all your financial management needs into one elegant, easy-to-use platform.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
                <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z" />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">Smart Budgeting</h3>
                <p className="text-sm text-muted-foreground">
                  Create and manage custom budgets with intelligent categorization and real-time tracking.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">Bill Management</h3>
                <p className="text-sm text-muted-foreground">
                  Never miss a payment with automated bill tracking and smart reminders.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
                <path d="M12 0L1 7v2h22V7L12 0zm3 9h-2v11h2V9zm-4 0H9v11h2V9zm4-2h-2v1h2V7zm-4 0H9v1h2V7zm-4 2H5v11h2V9zm8 0h2v11h-2V9zm4-2h-2v1h2V7zm-12 0H5v1h2V7z"/>
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">Savings Goals</h3>
                <p className="text-sm text-muted-foreground">
                  Set and track personal savings goals with progress visualization and milestone rewards.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
                <path d="M4 19h16v2H4zm5-4h11v2H9zm-5-4h16v2H4zm5-4h11v2H9zM4 3h16v2H4z"/>
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">Shopping Lists</h3>
                <p className="text-sm text-muted-foreground">
                  Create and manage shopping lists with price tracking and budget integration.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
                <path d="M3 3v17a1 1 0 001 1h17v-2H5V3H3z M15.293 14.707a1 1 0 001.414 0l5-5-1.414-1.414L16 12.586l-2.293-2.293a1 1 0 00-1.414 0l-5 5 1.414 1.414L13 12.414l2.293 2.293z"/>
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">Visual Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Understand your spending patterns with beautiful charts and detailed reports.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
                <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">Transaction Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Effortlessly track and categorize all your financial transactions in one place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="get-started" className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Start Managing Your Money Better
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Join thousands of users who have transformed their financial life with Masroofy.
            Try it free for 30 days, no credit card required.
          </p>
          <div className="mt-6">
            <Link
              to="/signup"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}