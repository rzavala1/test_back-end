import { useState } from 'react';
import { TextField, Grid, Alert } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import './App.css';

const axios = require('axios');

function App() {

  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const createAds = () => {
    setImage(undefined);
    setError(false);
    setLoading(true);
    var data = JSON.stringify({
      "price": price,
      "description": description
    });

    var config = {
      method: 'post',
      url: `${process.env.REACT_APP_SERVER_BACK_END}ads`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        setImage(response.data.image);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      });

  }

  const onChangePrice = (e) => {
    setPrice(e.target.value)
  }

  const onChangeDescription = (e) => {
    setDescription(e.target.value)
  }


  return (
    <div className="App App-body">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField id="price" label="Precio" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} value={price} onChange={onChangePrice} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-multiline-static"
            label="Descripcion"
            multiline
            rows={8}
            value={description} onChange={onChangeDescription}
          />
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            loading={loading}
            loadingPosition="start"
            onClick={createAds}
            startIcon={<SaveIcon />}
            variant="outlined"
          >
            Publicar
          </LoadingButton>
        </Grid>
        <Grid item xs={12}>
          {image && <img
            src={`${process.env.REACT_APP_SERVER_BACK_END}ads/images/${image}`}
            alt={"imagen"}
          />}
        </Grid>
      </Grid>
      {error && <Alert severity="error">Ocurrio un error, por favor intente de nuevo</Alert>}
      {image && <Alert severity="success">Se publico con éxito</Alert>}
    </div>
  );
}

export default App;
