import React from 'react';
import Icon from '../../../components/AppIcon';

const RegistrationHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center mb-4">
        <div className="bg-primary/10 p-3 rounded-full">
          <Icon name="UserPlus" size={24} color="#1e40af" />
        </div>
      </div>
      
      <h1 className="text-2xl font-semibold text-foreground mb-2">
        Create Account
      </h1>
      
      <p className="text-muted-foreground text-sm">
        Join our secure platform with unique member verification
      </p>
    </div>
  );
};

export default RegistrationHeader;