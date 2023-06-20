import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { PostItem } from '@common/post/post.interface';
import { registry } from '@common/registry';
import { DataOptions } from '@common/data/data.interface';
import { SubscriptionLike } from 'rxjs';
import React from 'react';
import carrotEmoji from '../../assets/carrotEmoji.jpg';

export default class PostBoard extends React.Component<any, { postItems: PostItem[] }> {
  constructor(props: any) {
    super(props);

    this.state = {
      postItems: [],
    };
  }

  subscription?: SubscriptionLike;

  async componentDidMount(): Promise<void> {
    const { dataService, authService } = registry;
    const options: DataOptions = {
      table: 'Post',
    };
    const result = await dataService.get<PostItem[]>(options);

    this.setState({
      postItems: result,
    });

    if (authService.user) {
      this.subscription?.unsubscribe();

      this.subscription = await dataService.subscribe(options, (changeItem) => {
        const newData = changeItem.data as PostItem[];

        this.setState({
          postItems: [...this.state.postItems, ...newData],
        });
      });
    }
  }

  componentWillUnmount(): void {
    this.subscription?.unsubscribe();
  }

  render() {
    return (
      <>
        <h1>서울특별시 마포구 상암동 중고거래 인기매물</h1>
        <ImageList cols={registry.uiService.isMobile ? 2 : 4} gap={20}>
          {this.state.postItems.map((item, idx) => (
            <ImageListItem
              key={idx}
              onClick={() => registry.uiService.go('PostDetail', item)}
              style={{ cursor: 'pointer' }}
            >
              <img
                style={{ borderRadius: '10%', maxHeight: '200px', minWidth: '160px', height: '200px' }}
                src={item.imageUrl}
                onError={(e) => ((e.target as HTMLImageElement).src = carrotEmoji)}
              />
              <ImageListItemBar title={item.title} subtitle={<span>by: {item.owner} </span>} position="below" />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>{item.price}원</span>
                <span style={{ fontSize: '8px' }}>{item.region} </span>
              </div>
            </ImageListItem>
          ))}
        </ImageList>
      </>
    );
  }
}
