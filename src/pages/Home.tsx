import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { ArrowRight, Sparkles, Shield, TrendingUp, BarChart2 } from 'lucide-react';

export function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-hero-pattern bg-cover bg-center">
          <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                <span className="block">Financial freedom</span>
                <span className="block gradient-text">through technology</span>
              </h1>
              <p className="mb-8 text-xl text-gray-300">
                VestBlock helps you optimize your credit, maximize your finances, and build
                wealth through our advanced AI analysis tools.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/signup" className="btn btn-primary">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link to="/login" className="btn btn-outline">
                  Log In
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="bg-gray-950 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold gradient-text">
                Advanced Financial Analysis
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-400">
                Leverage cutting-edge AI to analyze your financial data and unlock hidden opportunities
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="card hover:border-primary-600 hover:shadow-glow transition-all duration-300">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-900">
                  <BarChart2 className="h-6 w-6 text-primary-500" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-white">Credit Analysis</h3>
                <p className="text-gray-400">
                  Upload your credit report and receive detailed analysis and recommendations powered by AI.
                </p>
              </div>
              
              <div className="card hover:border-primary-600 hover:shadow-glow transition-all duration-300">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-900">
                  <Shield className="h-6 w-6 text-primary-500" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-white">Dispute Strategy</h3>
                <p className="text-gray-400">
                  Get customized strategies to dispute negative items and boost your credit score.
                </p>
              </div>
              
              <div className="card hover:border-primary-600 hover:shadow-glow transition-all duration-300">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-900">
                  <TrendingUp className="h-6 w-6 text-primary-500" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-white">Financial Opportunities</h3>
                <p className="text-gray-400">
                  Discover side hustles and credit card optimization strategies based on your profile.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-cta-pattern py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-gray-900/70 backdrop-blur-sm border border-gray-800 p-8 md:p-12 lg:p-16">
              <div className="md:flex md:items-center md:justify-between">
                <div className="md:max-w-2xl">
                  <h2 className="text-3xl font-bold text-white">
                    Ready to transform your financial future?
                  </h2>
                  <p className="mt-4 text-lg text-gray-300">
                    Join VestBlock today and start optimizing your credit and finances with our powerful AI tools.
                  </p>
                </div>
                <div className="mt-8 md:mt-0">
                  <Link to="/signup" className="btn btn-primary shadow-glow">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex items-center">
              <BarChart2 className="h-6 w-6 text-primary-500" />
              <span className="ml-2 text-lg font-bold text-white">VestBlock</span>
            </div>
            <p className="mt-4 text-sm text-gray-400 md:mt-0">
              &copy; {new Date().getFullYear()} VestBlock. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}