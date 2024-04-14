// pages/_app.tsx

import SecretKeyGenerator from "@/components/SecretKeyGenerator";

import React from "react";

const secret_key = () => {
  return (
    <div>
      <SecretKeyGenerator />
    </div>
  );
};

export default secret_key;
