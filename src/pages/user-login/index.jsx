import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import SignUpPrompt from './components/SignUpPrompt';
import SecurityBadge from './components/SecurityBadge';
import MockCredentials from './components/MockCredentials';

const UserLogin = () => {
  return (
    <>
      <Helmet>
        <title>Sign In - AuthPortal</title>
        <meta name="description" content="Sign in to your AuthPortal account with secure authentication and member verification." />
        <meta name="keywords" content="login, signin, authentication, secure access, member portal" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
              {/* Login Card */}
              <div className="bg-card border border-border rounded-xl shadow-subtle p-8">
                <LoginHeader />
                <LoginForm />
                <SignUpPrompt />
                <SecurityBadge />
                <MockCredentials />
              </div>
              
              {/* Additional Trust Indicators */}
              <div className="mt-6 text-center">
                <p className="text-xs text-muted-foreground">
                  Protected by industry-standard encryption and security protocols
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default UserLogin;