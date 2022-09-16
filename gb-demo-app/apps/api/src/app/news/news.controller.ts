import { Response } from 'express';
import { Body, Controller, Get, Header, Headers, HttpStatus, Post, Res } from '@nestjs/common';
import { v4 as uuidv4} from 'uuid';
import { IsNotEmpty } from 'class-validator';

interface News {
  id: number;
  title: string;
  description: string;
  createdAt: number;
}

export class CreateNewsDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

@Controller('news')
export class NewsController {
  private newsList: News[] = [];
  private cashResolve: News[] | null = null;
  private eTag: string = uuidv4();

  @Get()
  @Header('Access-Control-Expose-Headers', 'etag')
  async getNews(@Headers() headers: ParameterDecorator, @Res() res: Response) {
    if (headers['if-none-match'] && this.eTag && headers['if-none-match'] === this.eTag) {
      return res.status(HttpStatus.NOT_MODIFIED).end();
    }

    if (!this.cashResolve) {
      if (!this.newsList.length) {
        this.newsList = Object.keys([...Array(5)])
        .map(key => Number(key) + 1)
        .map(n => ({
          id: n,
          title: `Важная новость ${n}`,
//          description: (rand => ([...Array(rand(1000))].map(() => rand(10**16).toString(36).substring(rand(10))).join(' ')))(max => Math.ceil(Math.random() * max)),
          description: `This is a text of important news ${n}`,
          createdAt: Date.now()
        }))
      }
      this.cashResolve = [...this.newsList];
    }

    res.setHeader('etag', this.eTag);
    return res.status(HttpStatus.OK).json(this.cashResolve);
  }

  @Post()
  create(@Body() peaceOfNews: CreateNewsDto) {
    return new Promise(resolve => {
      setTimeout(() => {
        const newNews: News = {
          ...peaceOfNews,
          id: this.newsList.length + 1,
          createdAt: Date.now()
        };
        console.log('Новость успешно создана', peaceOfNews);
        this.newsList.push(newNews);
        this.cashResolve = null;                                   //!Вопрос к ревьюеру: в этом месте не произойдет утечки памяти?
        this.eTag = uuidv4();
        resolve(newNews);
      }, 100);
    });
  }
}
