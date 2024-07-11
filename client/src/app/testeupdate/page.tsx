// pages/test-update.tsx
import React from 'react';
import UpdatePage from '../updatepage/page';

const TestUpdatePage: React.FC = () => {
  // Simula um ID de produto para testar
  const testProductId = 1;

  return (
    <div>
      <h1>Teste</h1>
      <UpdatePage productId={testProductId} />
    </div>
  );
};

export default TestUpdatePage;
