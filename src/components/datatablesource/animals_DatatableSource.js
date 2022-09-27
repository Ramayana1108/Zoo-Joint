import { autocompleteClasses } from "@mui/material";

export const animalColumns = [
    {
      field: "animal_imageurl",
      headerName: "Image",
      width:300,
      renderCell: (params) => {
        return (
          <div className="cellWithImg" >
            <img width="250" height="150" 
             className="cellImg" src={params.row.animal_imageurl} />
          </div>
        );
      },
    },
    {
      field: "animal_name",
      headerName: "Name",
      width: 230,
    },
  
    {
      field: "animal_enclosure",
      headerName: "Enclosure",
      width: 100,
    },
  ];
  