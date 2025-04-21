import { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { BarChart2, FileText, User, CreditCard, DollarSign, TrendingUp, Clock, Shield } from 'lucide-react';

export function Dashboard() {
  const { user } = useAuth();
  const [lastLogin, setLastLogin] = useState<string | null>(null);
  
  useEffect(() => {
    // In a real app, this would fetch data from Supabase
    const lastLoginDate = new Date();
    setLastLogin(lastLoginDate.toLocaleString());
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gray-950 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 border-b border-gray-800 pb-6">
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400">Welcome back, {user?.email}</p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Account Overview Card */}
            <div className="card">
              <div className="mb-4 flex items-center">
                <User className="mr-2 h-5 w-5 text-primary-500" />
                <h2 className="text-lg font-semibold text-white">Account Overview</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400">Email</span>
                  <span className="text-white">{user?.email}</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400">Account Type</span>
                  <span className="text-white">Basic</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400">Last Login</span>
                  <span className="text-white">{lastLogin}</span>
                </div>
              </div>
            </div>
            
            {/* Credit Analysis Card */}
            <div className="card">
              <div className="mb-4 flex items-center">
                <BarChart2 className="mr-2 h-5 w-5 text-primary-500" />
                <h2 className="text-lg font-semibold text-white">Credit Analysis</h2>
              </div>
              <div className="mb-4 text-center">
                <div className="mx-auto mb-3 h-24 w-24 rounded-full border-4 border-gray-800 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-300">?</span>
                </div>
                <p className="text-gray-400">No credit reports analyzed yet</p>
              </div>
              <Link to="/pro-analysis" className="btn btn-primary w-full">
                Analyze My Credit
              </Link>
            </div>
            
            {/* Upgrade Card */}
            <div className="card border-primary-900 bg-gradient-to-br from-gray-900 to-gray-950">
              <div className="mb-4 flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-primary-500" />
                <h2 className="text-lg font-semibold text-white">Upgrade to Pro</h2>
              </div>
              <div className="mb-4">
                <div className="mb-2 flex items-center">
                  <Shield className="mr-2 h-4 w-4 text-primary-500" />
                  <p className="text-gray-300">Advanced Credit Analysis</p>
                </div>
                <div className="mb-2 flex items-center">
                  <FileText className="mr-2 h-4 w-4 text-primary-500" />
                  <p className="text-gray-300">Custom Dispute Letters</p>
                </div>
                <div className="mb-2 flex items-center">
                  <DollarSign className="mr-2 h-4 w-4 text-primary-500" />
                  <p className="text-gray-300">Side Hustle Recommendations</p>
                </div>
              </div>
              <Link to="/pro-analysis" className="btn btn-primary w-full">
                Get Pro Analysis - $75
              </Link>
            </div>
          </div>
          
          {/* Additional Cards */}
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="card">
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-primary-900/50 p-3">
                  <FileText className="h-6 w-6 text-primary-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">0</h3>
                  <p className="text-sm text-gray-400">Reports Analyzed</p>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-secondary-900/50 p-3">
                  <TrendingUp className="h-6 w-6 text-secondary-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">-</h3>
                  <p className="text-sm text-gray-400">Credit Score Trend</p>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-accent-900/50 p-3">
                  <DollarSign className="h-6 w-6 text-accent-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">0</h3>
                  <p className="text-sm text-gray-400">Saved Recommendations</p>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-warning-900/50 p-3">
                  <Clock className="h-6 w-6 text-warning-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">30 days</h3>
                  <p className="text-sm text-gray-400">Next Analysis Due</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}