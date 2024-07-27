'use client';
import { Paper} from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { createTheme, styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import createAxiosInstance from '../../components/FetchApi';
import CustomTable from '../../components/list_item/indexx';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });


const headers = [
  { id: 'qr', label: 'QR Code' },

];

const Shadow = () => {
  const [rows, setRows] = useState<[]>([]);

  const BASE_URL=process.env.NEXT_PUBLIC_BASE_URL;
 useEffect((


 )=>{

  const GetData = async()=>{

    const axiosInstance=createAxiosInstance(BASE_URL)
  try {
 const responce = await axiosInstance.get('api/Star/get_qr')
  
 const data=responce.data.data;

 setRows(data);

console.log(responce.data.data);
} catch (error) {
    
  }
  }
  
  GetData();
 },[])
 


  return (
    <PageContainer title="Shadow" description="this is Shadow">

      <DashboardCard title="QR Code">

      <CustomTable headers={headers} rows={rows} />

      </DashboardCard>
    </PageContainer>
  );
};

export default Shadow;
