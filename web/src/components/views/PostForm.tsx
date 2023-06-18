import { PostItem } from '@common/post/post.interface';
import { TextField, Button } from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { registry } from '@common/registry';

export default function PostForm() {
  const { dataService, authService, uiService } = registry;
  const [title, setTitle] = useState('');
  const [imageUrl, setImage] = useState('');
  const [price, setPrice] = useState(0);
  const [region, setRegion] = useState('');

  const onSubmitted = async (event: React.FormEvent) => {
    event.preventDefault();

    const data: PostItem = {
      title,
      imageUrl,
      owner: authService.user?.email ?? 'user',
      price,
      region,
    };

    await dataService.save({ table: 'Post', data });
    uiService.go('/');
  };

  return (
    <>
      <h1>내 물건 판매</h1>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1 },
        }}
        onSubmit={onSubmitted}
      >
        <TextField
          name="title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label={'제목'}
        ></TextField>

        <TextField
          name="price"
          fullWidth
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value as any)}
          label={'가격'}
        ></TextField>
        <TextField
          name="region"
          fullWidth
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          label={'거래 희망 장소'}
        ></TextField>
        <TextField
          name="image"
          fullWidth
          type="file"
          hidden
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (!e.target.files) return;

            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = (e) => {
              const dataUrl = e.target!.result as string;
              setImage(dataUrl);
            };
          }}
          InputLabelProps={{ shrink: true }}
          inputProps={{ accept: 'image/*' }}
          label={'이미지'}
        ></TextField>
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Button variant="outlined" type="submit">
            등록
          </Button>
        </div>
        {imageUrl && <img src={imageUrl} alt="Uploaded Image" height="300" />}
      </Box>
    </>
  );
}
