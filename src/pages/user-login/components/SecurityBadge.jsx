import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadge = () => {
  return (
    <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border">
      <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
        <Icon name="Shield" size={16} color="currentColor" />
        <span>SSL Secured</span>
        <span className="text-border">•</span>
        <Icon name="Lock" size={16} color="currentColor" />
        <span>Privacy Protected</span>
      </div>
      
      <div className="mt-2 text-center">
        <button
          type="button"
          className="text-xs text-primary hover:text-primary/80 transition-smooth underline"
          onClick={() => {
            // Handle privacy policy
            alert('Privacy policy would open here');
          }}
        >
          Privacy Policy
        </button>
      </div>
    </div>
  );
};

export default SecurityBadge;