 'use client';
import { useEffect, useState } from 'react';
import createAxiosInstance from '../../components/FetchApi';
import { Grid } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { IUser, IUserApiResp } from '../../Interfaces/SoulUser';
import CustomTable from '../../components/list_item/indexx';

// Define the headers for the table
const headers = [
  { id: 'first_Name', label: 'First Name' },
  { id: 'last_Name', label: 'Last Name' },
  { id: 'middle_Name', label: 'Middle Name' },
  { id: 'email', label: 'Email' },
  { id: 'city', label: 'City' },
  { id: 'country', label: 'Country' },
  { id: 'zip', label: 'Zip' },
  { id: 'language', label: 'Language' },
  { id: 'profile', label: 'Profile' },
  { id: 'isPurchased', label: 'IsPurchased' },
];

const TypographyPage = () => {
  const [rows, setRows] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


  useEffect(() => {
    const GetData = async () => {
      // Create Axios instance with credentials
      const axiosInstance = createAxiosInstance(BASE_URL, "application/json");
      try {
        // Make the request with credentials
        const response = await axiosInstance.get<IUserApiResp>("/api/Star/get_user");
        console.log(response);

        const data: IUser[] = response.data.data;
       console.log(data);

        if (data.length > 0) {
          setRows(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    GetData();
  }, [BASE_URL]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer title="Users" description="this is Users">
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <DashboardCard title="Users">
            <CustomTable headers={headers} rows={rows} btn={"Heart"} />
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default TypographyPage;
