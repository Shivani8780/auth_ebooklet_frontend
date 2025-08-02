import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import RegistrationHeader from './components/RegistrationHeader';
import RegistrationForm from './components/RegistrationForm';
import LoginPrompt from './components/LoginPrompt';
import SecurityBadge from '../user-login/components/SecurityBadge';

const UserRegistration = () => {
  return (
    <>
      <Helmet>
        <title>Create Account - AuthPortal</title>
        <meta name="description" content="Create your secure AuthPortal account with unique member verification." />
        <meta name="keywords" content="register, signup, create account, member verification, secure registration" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center w-full px-4 py-12">
            <div className="w-full max-w-md mx-auto">
              {/* Registration Card */}
              <div className="bg-card border border-border rounded-xl shadow-subtle p-8">
                <RegistrationHeader />
                <RegistrationForm />
                <LoginPrompt />
                <SecurityBadge />
              </div>
              
              {/* Additional Trust Indicators */}
              <div className="mt-6 text-center">
                <p className="text-xs text-muted-foreground">
                  Your data is protected by industry-standard encryption and security protocols
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default UserRegistration;