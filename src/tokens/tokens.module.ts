import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';
// import { TokenRepository } from './token.repository';
import { Tokens } from './entities/token.entity';
// import { DatabaseModule } from 'src/database.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tokens])],
  controllers: [TokensController],
  providers: [TokensService],
  // exports: [TokenRepository],
})
export class TokensModule {}
