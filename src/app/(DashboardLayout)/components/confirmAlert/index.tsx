import { confirmAlert } from "react-confirm-alert";



const confirmDelete = (id:string,name:string,event:any) => {
    confirmAlert({
        title: 'Confirmation',
        message: 'Are you sure you want to delete this user?'+name,
        buttons: [
            {
                label: 'Yes',
                onClick: event
            },
            {
                label: 'No',
                onClick: () => {}
            }
        ]
    });
}

export default confirmDelete;