import React from 'react';
import DashboardGreeting from './dashboard-greeting';

const Dashboard: React.FC = () => {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-4">
      <DashboardGreeting />
    </section>
  );
};

export default Dashboard;
