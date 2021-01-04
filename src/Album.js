import React,{useState, useEffect} from 'react';

import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import axios from 'axios';
import { Credentials } from './Credentials';
import img from "./img/bluebgcrop.jpg";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://docs.google.com/document/d/1rFxAjElpi9-q0s5WNJ0e8P67lC4jjljycu9a-qZJGK8/edit?usp=drivesdk">
        Aayush Barfa
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 0 1rem #000 inset',
    overflow: 'auto',
    position: 'relative',

    '&:hover':{
      boxShadow: '0 4px 1rem -4px #000',
      transform: 'translate(-18px)',
    }
  },
  cardMedia: {
    paddingTop: '70.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Front() {

  const data=[
    {value:1, name: 'A'},
    {value:2, name: 'B'}
  ]
  
  const classes = useStyles();
  const spotify = Credentials(); 
  const [token, setToken] = useState(''); 
  const [Albums, setAlbum]= useState({selectedArtist:'', listOfAlbumsFromAPI:[]} );

  
    
  

  console.log('RENDERING Album.JS');
  useEffect(() => {
     axios('https://accounts.spotify.com/api/token', {
         headers: {
           'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)      
        },
        data: 'grant_type=client_credentials',
        method: 'POST'
       })
       .then(tokenResponse => {      
       setToken(tokenResponse.data.access_token);

       axios('https://api.spotify.com/v1/artists/22bE4uQ6baNwSHPVcDxLCe/albums?limit=50', {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
      })
      .then (albumResponse => {        
        setAlbum({
          selectedGenre: Albums.selectedGenre,
          listOfAlbumsFromAPI: albumResponse.data.items,
          
        })
      });

      
    });
    },[]);

    var s=0;
    console.log('API Called');


  return (
    <React.Fragment>
      <CssBaseline />
      

      <main>
        {/* Hero unit */}
        <div style={{
            backgroundImage: 'url('+img+')',
             backgroundRepeat: 'no-repeat',
             backgroundSize:'cover',
             backgroundPosition: 'center'
        }}
        className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography style={{color:"white" }} component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Rolling Stones
            </Typography>
            <Typography style={{color:"white"}}  variant="h6" align="center" color="textSecondary" paragraph>
            The Rolling Stones are an English rock band formed in London in 1962. As a diverging act to the popular pop rock of the early 1960s, the Rolling Stones pioneered the gritty, heavier-driven sound that came to define hard rock.
            </Typography>
            
          </Container>
        </div>

        <div style={{
             background: 'linear-gradient(to bottom,#00003a,black)',
             backgroundRepeat: 'no-repeat',
             backgroundSize:'cover',
             backgroundPosition: 'center'
        }}>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <h3 style={{color:"white" }}>Albums List</h3>
          <Grid container spacing={4}>
            {Albums.listOfAlbumsFromAPI.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={Albums.listOfAlbumsFromAPI[s].images[1].url}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {Albums.listOfAlbumsFromAPI[s].name}                      
                    </Typography>
                    <Typography>
                    {Albums.listOfAlbumsFromAPI[s++].release_date}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        </div>

      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Info 
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
         One place where you can find rolling stones
        </Typography>
        <Copyright />
        <div>
          <a href="mailto:Barfaaayush@gamil.com">Contect me</a>
        </div>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}