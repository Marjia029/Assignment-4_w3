// components/SignIn.tsx

import React from 'react';

const SignIn: React.FC = () => {
  return (
    <div className="signin-card bg-[#1B2640] rounded-lg p-6 text-white mb-4 flex justify-center items-center gap-4">
      <div className="loader-icon">
        <img src="/assets/sin-in-icon.png" alt="Sign-in Icon" />
      </div>
      <div className="merge flex flex-col items-center">
        <div className="signin-content text-center mb-4">
          <p>Members get our best prices when signed in!</p>
        </div>
        <button className="signin-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Sign in
        </button>
      </div>
    </div>
  );
};

export default SignIn;
