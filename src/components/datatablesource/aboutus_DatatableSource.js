export const userColumns = [
  {
    field: "abt_image",
    headerName: "Image",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.abt_image} />
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
