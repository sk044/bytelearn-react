// material
import { useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
// , useState
import { Grid, Card, Button, Container, Stack, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

export default function Blog(props) {
  const params = useParams();
  useEffect(() => {
    console.log(params.id);
    // const id = {props.match.params.id}
  }, []);

  ///
  const handleClickOpen = () => {
    // setOpen(true);
  };

  return (
    <Page title="Blog">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <Card>
              <div style={{ padding: '40px' }}>
                <h2>Title</h2>
                <p>Categories</p>
                <br />
                <br />
                <h3>Description</h3>
              </div>
              <div style={{ padding: '40px' }}>
                <Button
                  variant="contained"
                  component={RouterLink}
                  to="#"
                  onClick={handleClickOpen}
                  style={{ marginRight: '10px' }}
                >
                  Edit Post
                </Button>
                <Button variant="contained" component={RouterLink} to="#" onClick={handleClickOpen}>
                  Delete Post
                </Button>
              </div>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
