import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { noop } from 'rxjs';

export const swagger = (app: INestApplication, path = 'docs') => {
  const config = new DocumentBuilder()
    .setTitle('Spassu Books API')
    .setDescription('The Spassu Books API description')
    .addBearerAuth()
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  fs.writeFile('./swagger.json', JSON.stringify(document), 'utf-8', noop);

  SwaggerModule.setup(path, app, document);
};
