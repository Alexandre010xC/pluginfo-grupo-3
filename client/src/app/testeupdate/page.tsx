// pages/test-update.tsx
import React from 'react';
import UpdatePage from '../updatepage/[id]/page';

const TestUpdatePage: React.FC = () => {
  // Simula um ID de produto para testar
  const testProductId = 7;

  return (
    <div>
      <h1>Teste</h1>
      <UpdatePage productId={testProductId} />
    </div>
  );
};

export default TestUpdatePage;
