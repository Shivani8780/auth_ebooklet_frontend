import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const LoginPrompt = () => {
  return (
    <div className="mt-8 text-center">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground">
            Already have an account?
          </span>
        </div>
      </div>
      
      <div className="mt-6">
        <Link to="/user-login">
          <Button
            variant="outline"
            size="lg"
            fullWidth
            iconName="LogIn"
            iconPosition="left"
          >
            Sign In
          </Button>
        </Link>
      </div>
      
      <p className="mt-4 text-sm text-muted-foreground">
        Access your secure account instantly
      </p>
    </div>
  );
};

export default LoginPrompt;