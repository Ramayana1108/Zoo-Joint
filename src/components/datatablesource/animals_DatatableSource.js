export const animalColumns = [
    {
      field: "animal_imageurl",
      headerName: "Image",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.animal_imageurl} />
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
  