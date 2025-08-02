import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import LoginForm from "pages/user-login/components/LoginForm";
import RegistrationForm from "pages/user-registration/components/RegistrationForm";
import NotFound from "pages/NotFound";
import PdfViewer from "pages/Pdf-view/PdfViewer";
import UserEbooklets from "pages/user-ebooklets/UserEbooklets";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/user-login" element={<LoginForm />} />
        <Route path="/user-registration" element={<RegistrationForm />} />
        <Route path="/pdf-viewer" element={<PdfViewer />} />
        <Route path="/user-ebooklets" element={<UserEbooklets />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
