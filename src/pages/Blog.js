import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
// , useEffect
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
// material
import { Grid, Button, Container, Stack, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import { BlogPostCard } from '../components/_dashboard/blog';
//
import POSTS from '../_mocks_/blog';

// ----------------------------------------------------------------------

export default function Blog() {
  const [open, setOpen] = useState(false);
  const [inputFields, setinputField] = useState([
    {
      title: '',
      categories: '',
      content: ''
    }
  ]);

  ///
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangetype = (event) => {
    const values = [...inputFields];
    values[0][event.target.name] = event.target.value;
    setinputField(values);
  };

  const handleCloseSubmit = (e) => {
    e.preventDefault();

    // // data
    // const headers = {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // };

    // const dataitem = {
    //   type: inputFields[0].type,
    //   itemname: inputFields[0].itemname,
    //   category: inputFields[0].category,
    //   unit: inputFields[0].unit,
    //   code: inputFields[0].code,
    //   description: inputFields[0].description,
    //   price: inputFields[0].price,
    //   gst: inputFields[0].gst,
    //   intax,
    //   isInventory: false
    // };

    // console.log(qs.stringify(dataitem));

    // axios
    //   .post('https://solarladderserver.herokuapp.com/api/items', qs.stringify(dataitem), {
    //     headers
    //   })
    //   .then((response) => {
    //     alert('Item added Successfully !!');
    //     console.log('Status: ', response.status);
    //     console.log('Data: ', response.data);
    //   })
    //   .catch((error) => {
    //     console.error('Something went wrong!', error);
    //   });
    setOpen(false);
    // setTimeout(() => {
    //   window.location.reload();
    //   setOpen(false);
    // }, 2000);
  };

  return (
    <Page title="Dashboard: Blog | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Blog
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
            onClick={handleClickOpen}
          >
            New Post
          </Button>
        </Stack>

        {/* //// create */}
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Create Item</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="title"
              label="Title"
              value={inputFields.title}
              type="text"
              onChange={handleChangetype}
              fullWidth
            />

            <TextField
              autoFocus
              margin="dense"
              label="Categories"
              type="text"
              name="code"
              value={inputFields.categories}
              onChange={handleChangetype}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              name="content"
              label="Content"
              type="text"
              value={inputFields.content}
              onChange={handleChangetype}
              fullWidth
            />
            <br />
            <br />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleCloseSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>

        <Grid container spacing={3}>
          {POSTS.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
