'use client'; 
import { Grid } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { useEffect, useState } from 'react';
import Tablelist from '../../components/list_item';
import createAxiosInstance from '../../components/FetchApi';
import { IApiResponse, ISoulUser } from '../../Interfaces/SoulUser';
import CustomTable from '../../components/list_item/indexx';
import { useSearchParams } from 'next/navigation';


const headers = [
  { id: 'first_Name', label: 'First Name' },
  { id: 'last_Name', label: 'Last Name' },
  { id: 'middle_Name', label: 'Middle Name' },
  { id: 'contact', label: 'Contact' },
  { id: 'date_of_Birth', label: 'DOB' },
  { id: 'date_of_Passing', label: 'DOP' },
  { id: 'nick_Name', label: 'Nick Name' },
  { id: 'title', label: 'Title' }

];

const TypographyPage = () => {
  const [rows, setRows] = useState<ISoulUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const Params = useSearchParams();

  let userid = Params.get("id");


  useEffect(() => {
    const GetData = async () => {

      const axiosInstance = createAxiosInstance(BASE_URL,"application/json"); 
      try {
       const responce= await axiosInstance.get<IApiResponse>("api/Star/get_starts?UsrId="+userid);

       const dat:ISoulUser[]=responce.data.data  
console.log(dat);
      if (dat.length > 0) {


      setRows(dat);
      }
     

      } catch (error) {
        console.error('Error fetching data:', error);

     


      } finally {
        setLoading(false);
      }
    };

    GetData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer title="unfading heart" description="this is Unfading hearts">
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <DashboardCard title="Unfading Hearts">
            {/* <Tablelist rows={rows} /> */}
            <CustomTable headers={headers} rows={rows} btn={"QR"} />
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default TypographyPage;
