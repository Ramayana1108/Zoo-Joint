export const userColumns = [
  {
    field: "abt_image",
    headerName: "Image",
    width: 400,
    height: 300,
   
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" width="400" 
       height="500" src={params.row.abt_image} />
        </div>
      );
    },
  },
  {
    field: "abt_email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "abt_address",
    headerName: "Address",
    width: 100,
  },
  {
    field: "abt_website",
    headerName: "Website Link",
    width: 100,
  },
  {
    field: "abt_description",
    headerName: "Description",
    width: 500,
  },
  
];
