import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Link, Card, Grid, Typography, CardContent, Dialog } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import axios from 'axios';
import qs from 'querystring';
import TextField from '@material-ui/core/TextField';
import { fDate } from '../../../utils/formatTime';

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)'
});

const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
});

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number
};

export default function BlogPostCard({ post, index }) {
  const { title, createdAt } = post;
  const [open, setOpen] = useState(false);
  const [openedit, setOpenEdit] = useState(false);
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;
  const [inputFields, setinputFeilds] = useState([
    {
      title: post.title,
      categories: post.categories,
      content: post.content
    }
  ]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenEdit = (post) => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleCloseSubmitEdit = (e) => {
    e.preventDefault();
    const id = post._id;
    // data
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    const dataitem = {
      title: inputFields[0].title,
      categories: inputFields[0].categories,
      content: inputFields[0].content
    };

    console.log(qs.stringify(dataitem));

    axios
      .put(`https://bytelearn-server.herokuapp.com/api/posts/${id}`, qs.stringify(dataitem), {
        headers
      })
      .then((response) => {
        alert('Item updated Successfully !!');
        console.log('Status: ', response.status);
        console.log('Data: ', response.data);
      })
      .catch((error) => {
        console.error('Something went wrong!', error);
      });
    window.location.reload();
    setOpen(false);
  };

  const handleChangetype = (event) => {
    const values = [...inputFields];
    values[0][event.target.name] = event.target.value;
    setinputFeilds(values);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const id = post._id;
    console.log(id);
    if (id) {
      axios.delete(`https://bytelearn-server.herokuapp.com/api/posts/${id}`).then(() => {
        alert('Item deleted Successfully !!');
        setTimeout(() => {
          window.location.reload();
          setOpen(false);
        }, 2000);
      });
    }
  };

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2)
    }
  }))(MuiDialogContent);

  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1)
    }
  }))(MuiDialogActions);

  return (
    <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      {/* <p>{title}</p>
      <p>{createdAt}</p> */}
      <Card sx={{ position: 'relative' }}>
        <CardMediaStyle
          sx={{
            ...((latestPostLarge || latestPost) && {
              pt: 'calc(100% * 4 / 3)',
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
              }
            }),
            ...(latestPostLarge && {
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: 'calc(100% * 3 / 4.66)'
              }
            })
          }}
        >
          <CoverImgStyle alt={title} src="https://cdn.wallpapersafari.com/52/97/D9oxzk.jpg" />
        </CardMediaStyle>

        <CardContent
          sx={{
            pt: 4,
            ...((latestPostLarge || latestPost) && {
              bottom: 0,
              width: '100%',
              position: 'absolute'
            })
          }}
        >
          <Typography
            gutterBottom
            variant="caption"
            sx={{ color: 'text.disabled', display: 'block' }}
          >
            {fDate(createdAt)}
          </Typography>

          <TitleStyle
            color="inherit"
            variant="subtitle2"
            underline="hover"
            onClick={handleClickOpen}
            sx={{
              ...(latestPostLarge && { typography: 'h5', height: 60 }),
              ...((latestPostLarge || latestPost) && {
                color: 'common.white'
              })
            }}
          >
            {title}
          </TitleStyle>

          {/* // view */}
          <Dialog
            onClose={handleClose}
            fullWidth
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              {post && post.title}
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
                Categories: <span>{post.categories}</span>
              </Typography>
              <br />
              <br />
              <Typography gutterBottom>{post.content}</Typography>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleDelete} color="primary">
                Delete
              </Button>
              <Button autoFocus onClick={handleClickOpenEdit} color="primary">
                Edit
              </Button>
              <Button autoFocus onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>

          {/* // edit */}

          <Dialog open={openedit} onClose={handleCloseEdit} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create Item</DialogTitle>
            <DialogContent>
              <form>
                <TextField
                  autoFocus
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  name="title"
                  label="Title"
                  value={inputFields[0].title}
                  type="text"
                  onChange={handleChangetype}
                />

                <TextField
                  margin="dense"
                  label="Categories"
                  type="text"
                  name="categories"
                  value={inputFields[0].categories}
                  onChange={handleChangetype}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  name="content"
                  label="Content"
                  type="text"
                  value={inputFields[0].content}
                  onChange={handleChangetype}
                  fullWidth
                  multiline
                />
              </form>
              <br />
              <br />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEdit} color="primary">
                Cancel
              </Button>
              <Button onClick={handleCloseSubmitEdit} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </CardContent>
      </Card>
    </Grid>
  );
}
