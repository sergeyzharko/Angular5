
import { OrderPipe } from './order-by.pipe';
import { News } from '../models/';

describe('NewsOrderPipe', () => {

  // This pipe is a pure, stateless function so no need for BeforeEach
  const pipe = new OrderPipe();

  const news: Array<News> = [{
    id: 1,
    createDate: new Date('27 November 2017'),
    text: 'News 3'
  },
  {
    id: 2,
    createDate: new Date('29 May 2017'),
    text: 'News 1'
  },
  {
    id: 3,
    text: 'News 2',
    createDate: new Date('1 July 2017')
  }];

  const news2: Array<News> = [
  {
    id: 2,
    createDate: new Date('29 May 2017'),
    text: 'News 1'
  },
  {
    id: 3,
    text: 'News 2',
    createDate: new Date('1 July 2017')
  },
  {
    id: 1,
    createDate: new Date('27 November 2017'),
    text: 'News 3'
  }];

  it('order news array', () => {
    news2.forEach( (value, i) => {
        expect(pipe.transform(news, 'createDate')[i].id).toBe(news2[i].id);
        expect(pipe.transform(news, 'createDate')[i].text).toBe(news2[i].text);
    });
  });

});
