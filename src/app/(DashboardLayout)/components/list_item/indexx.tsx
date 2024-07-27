import * as React from 'react';
import { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Button, TableHead } from '@mui/material';
import { useRouter } from 'next/navigation';
import {saveAs} from 'file-saver';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import confirmDelete from '../confirmAlert';
import createAxiosInstance from '../FetchApi';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;


 

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

interface TableHeader {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
}

interface CustomTableProps {
  headers: TableHeader[];
  rows: any[];
  rowsPerPageOptions?: number[];
  btn?:string

}

export default function CustomTable({ headers, rows, rowsPerPageOptions = [5, 10, 25] ,btn}: CustomTableProps ) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions[0]);
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const fetchqr=(qr:string)=>{
 
    const imageUrl = process.env.NEXT_PUBLIC_BASE_URL+'/uploads/qr/'+qr; // replace with your image URL
    // Use fetch to get the image blob
    fetch(imageUrl)
    .then(response => response.blob())
    .then(blob => {
      // Use FileSaver to save the blob
      const pngBlob = new Blob([blob], { type: 'image/png' });
      // Use FileSaver to save the blob
      saveAs(pngBlob, `${qr}.png`); // specify the filename with .png extensio

      // saveAs(blob, qr); // specify the filename
    })
    .catch(error => console.error('Error downloading image:', error));
  }


  const confirmUserDelete = (id:any,name:string) => {
    confirmAlert({
        title: 'Confirmation',
        message: 'Are you sure you want to delete this user?'+name,
        buttons: [
            {
                label: 'Yes',
                onClick: () => deleteUser(id)
            },
            {
                label: 'No',
                onClick: () => {}
            }
        ]
    });
};


const deleteUser = async (userid: string): Promise<void> => {

  const axiosInstance = createAxiosInstance(BASE_URL, "application/json");

  try {
    const response = await axiosInstance.post(`/api/Star/deleteuser?userid=${userid}`);
    console.log('Delete user response:', response.data);
  } catch (error: any) {
    console.error('Error deleting user:', error.response || error.message || error);
  }
}

  const deleteStar=async(starId:string)=>{
    const axiosInstance = createAxiosInstance(BASE_URL, "application/json");

    try {
      const response = await axiosInstance.post(`/api/Star/deletestar?starid=${starId}`);
      console.log('Delete user response:', response.data);
    } catch (error: any) {
      console.error('Error deleting user:', error.response || error.message || error);
    }
  }

  

  const confirmStarDelete = (id:any,name:string) => {
    confirmAlert({
        title: 'Confirmation',
        message: 'Are you sure you want to delete this user?'+name,
        buttons: [
            {
                label: 'Yes',
                onClick: () => deleteStar(id)
            },
            {
                label: 'No',
                onClick: () => {}
            }
        ]
    });
};


  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
           
            {headers.map((header) => (
              <TableCell
                key={header.id}
                style={{ minWidth: header.minWidth }}
                align={header.align ? header.align : 'left'}
              >
                {header.label}
              </TableCell>
))}
           
{btn==="Heart"?
(<><TableCell>Unfading Hearts</TableCell><TableCell>Delete User</TableCell></>):btn==="QR"?
(<><TableCell>Download</TableCell><TableCell>Delete Heart</TableCell></>):
(<></>)}

          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row, index) => (
            <TableRow key={index}>

              {headers.map((header) => (
               
               <TableCell key={header.id} align={header.align ? header.align : 'left'}>
               {row[header.id]}
             </TableCell>


                // row[header.id]==null?(<></>):(<> </>)
                
              ))}
              
           
{btn==="Heart"?
(<>
 <TableCell align="center">
      {/* <a href='/utilities/typography?id={row.id}' className='btn btn-primary' color="primary"></a> */}
                <Button variant="contained" color="primary" onClick={()=>{
router.push("/utilities/stars?id="+row.id);
                }}>

                {btn}
                </Button>
                
              </TableCell>

              <TableCell align="center">
                <Button variant="contained" color="error" onClick={()=>confirmUserDelete(row.id, row.first_Name)}>

Delete
                </Button>
                
              </TableCell>
</>):btn==="QR"?
(<>

    <TableCell align="center">
      {/* <a href='/utilities/typography?id={row.id}' className='btn btn-primary' color="primary"></a> */}
                <Button variant="contained" color="primary" onClick={() => fetchqr(row.id)}>
                  

                {btn}
                </Button>
                
              </TableCell>
              <TableCell align="center">
                {/* <Button variant="contained" color="error" onClick={()=>confirmStarDelete(row.id, row.first_Name)}> */}
                <Button variant="contained" color="error" onClick={()=>confirmStarDelete(row.id, row.first_Name)}>

Delete
                </Button>
                
              </TableCell>
</>):(<></>)}

            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={headers.length} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={rowsPerPageOptions}
              colSpan={headers.length}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
