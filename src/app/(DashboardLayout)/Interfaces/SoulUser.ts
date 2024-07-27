



 export interface ISoulUser {
    id: string;
    type: string;
    first_Name: string;
    last_Name: string;
    middle_Name: string;
    contact: string;
    date_of_Birth: string;
    date_of_Passing: string;
    introductory_Note: string;
    isActive: boolean;
    isPublic: boolean;
    nick_Name: string;
    note: string;
    profile: string | null;
    title: string;
    user_Id: string;
  }



  export interface IApiResponse {
    message: string;
    isSuccess: boolean;
    data: ISoulUser[];
  }
  

  export interface IUser {
    
    Id:string,
email:string,
first_Name:string,
last_Name:string,
middle_Name:string,
city:string,
country:string,
zip:string,
language:string,
profile:string,
isPurchased:boolean

  }


  export interface IUserApiResp {
    message: string;
    isSuccess: boolean;
    data: IUser[];
  }