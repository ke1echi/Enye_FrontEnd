import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import ProgressView from './ProgressView';


const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
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
      console.log('response -> ', response);
      let data = await response.json();
      setUserProfile(data);
      console.log("data --> ", data);
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
  rowsPerPageOptions: []
};

console.log('records -> ', userProfile);
console.log('userProfile -> ', userProfile.records.profiles);
  
  return (
    <div className={classes.root}>
      { !isLoaded ? <ProgressView /> : (
        <MUIDataTable
          title={"Customer Profile"}
          data={userProfile.records.profiles}
          columns={columns}
          options={options}
        />
      )}
    </div>
  );
}