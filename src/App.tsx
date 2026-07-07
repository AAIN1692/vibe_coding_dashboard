import { DateRangeFilter } from './components/filters/DateRangeFilter';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Header } from './components/layout/Header';
import { DashboardPage } from './pages/DashboardPage';

function App() {
  return (
    <DashboardLayout header={<Header filterSlot={<DateRangeFilter />} />}>
      <DashboardPage />
    </DashboardLayout>
  );
}

export default App;