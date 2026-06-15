// Single entry point — import everything from here in your app.
// Example:
//   import { ScholarshipsPage, TrackerPage, useScholarships, useProfile } from '@/features/scholarships';

export { default as ScholarshipsPage }  from './pages/ScholarshipsPage';
export { default as TrackerPage }       from './pages/TrackerPage';
export { default as ProfilePage }       from './pages/ProfilePage';
export { default as AnalyticsPage }     from './pages/AnalyticsPage';
export { default as AdminPage }         from './pages/AdminPage';
export { default as ScholarshipCard }   from './components/ScholarshipCard';
export { default as DetailModal }       from './components/DetailModal';
export { useScholarships }              from './hooks/useScholarships';
export { useProfile }                   from './hooks/useProfile';
export { SCHOLARSHIPS }                 from './data/scholarships';
export * from './utils/helpers';

// Import the scoped CSS once (or do it in your root layout)
import './scholarships.css';
