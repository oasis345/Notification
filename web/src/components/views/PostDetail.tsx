import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { PostItem } from '@common/post/post.interface';
import carrotEmoji from '../../assets/carrotEmoji.jpg';
import { registry } from '@common/registry';

export default function PostDetail(postItem: PostItem) {
  return (
    <Card>
      <CardMedia component="img" sx={{ minHeight: 400 }} src={postItem.imageUrl ? postItem.imageUrl : carrotEmoji} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {postItem.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {postItem.description}
        </Typography>
      </CardContent>
      <CardActions>
        {postItem.owner === registry.authService.user?.email && (
          <Button
            size="small"
            onClick={() => {
              registry.dataService.remove({ table: 'post', dataId: postItem.id });
              registry.uiService.go('/');
            }}
          >
            삭제
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
