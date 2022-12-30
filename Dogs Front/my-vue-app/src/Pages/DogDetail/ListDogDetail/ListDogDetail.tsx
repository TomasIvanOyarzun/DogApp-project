
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import HeightIcon from '@mui/icons-material/Height';
import { DogApi } from '../../../feactures/dog/DogSlice';

interface Props {
    dog : DogApi | undefined
}
const ListDogDetail = ({dog} : Props) => {
  return (
    <List sx={{ width: '100%', maxWidth: 360 }}>
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <HeartBrokenIcon/>
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Life span" secondary={`lives approximately ${dog?.life_span}`} />
    </ListItem>
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <HorizontalRuleIcon  />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Weight" secondary={ `an approximate weight of ${dog?.weight} cm`}/>
    </ListItem>
    <ListItem>
      <ListItemAvatar>
        <Avatar>
        <HeightIcon/>
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Height" secondary={ `an approximate height of ${dog?.height} cm`} />
    </ListItem>


  </List>
  )
}

export default ListDogDetail