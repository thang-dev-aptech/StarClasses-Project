import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import StatCard from '../components/ui/StatCard';
import LatestConsultItem from '../components/consults/LatestConsultItem';
import LatestTeacherItem from '../components/teachers/LatestTeacherItem';
import LatestCourseItem from '../components/courses/LatestCourseItem';

const DashboardPage = () => {
  const { setHeaderContent } = useOutletContext();

    
  useEffect(() => {
      setHeaderContent({
          title : 'Dashboard',
          desc : 'Welcome to Star Classes admin panel'
      });
  }, [setHeaderContent]);
  return (
      <div className="container-fluid">
        <h1>Dashboard</h1>
      </div>
    
  );
};

export default DashboardPage; 