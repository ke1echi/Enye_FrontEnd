import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import ProgressView from './ProgressView';


const useStyles = makeStyles(theme => ({
  table: {
    "& thead": {
      "& th": {
        backgroundColor: "#EFEFEF",
        fontWeight: "bold",
        fontSize: "16px"
      }
    }
  } 
}));


export default function Home() {
  const classes = useStyles();
  const [isLoaded, setIsLoaded] = useState(false);
  const [userProfile, setUserProfile] = useState({
    records: {
      profiles: []
    }
  });

  useEffect(() => {
    (async () => {
      const response = await fetch(`https://api.enye.tech/v1/challenge/records`);
      let data = await response.json();
      setUserProfile(data);
    })();
    
    setIsLoaded(true);
  }, []);


const columns = [
  {
    name: "SN",
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta) => {
        return (tableMeta.rowIndex) + 1
      }
    }
   },
   {
    name: "FirstName",
    label: "FirstName",
    options: {
      filter: false,
      sort: true,
    }
  },
  {
    name: "LastName",
    label: "LastName",
    options: {
      filter: false,
      sort: true,
    }
  },
  {
    name: "Gender",
    label: "Gender",
    options: {
      filter: true,
      sort: false,
    }
  },
  {
    name: "Email",
    label: "Email",
    options: {
      filter: false,
      sort: false,
    }
  },
  {
    name: "PaymentMethod",
    label: "Payment Method",
    options: {
      filter: true,
      sort: false,
    }
  },
];

const options = {
  filterType: 'dropdown',
  rowsPerPage: 20,
  rowsPerPageOptions: [],
  textLabels: {
    body: {
      noMatch: "Please wait, fetching data...",
    },
  }
};

return (
  <div className={classes.root}>
    { !isLoaded ? <ProgressView /> : (
      <MUIDataTable className={classes.table}
        title={"Customer Profile"}
        data={userProfile.records.profiles}
        columns={columns}
        options={options}
      />
    )}
  </div>
)};