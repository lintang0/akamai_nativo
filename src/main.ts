
import cheerio from 'cheerio';

export async function responseProvider(request) {
  const $ = cheerio.load('<h2 class="title">Hello world</h2>');
 }

