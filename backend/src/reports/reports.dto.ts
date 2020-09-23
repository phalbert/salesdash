import { IsNotEmpty } from 'class-validator';

export class ReportDto {
  @IsNotEmpty()
  fileHash: string;

  @IsNotEmpty()
  records: number;
}

export class ChunkDto {
  @IsNotEmpty()
  fileHash: string;

  @IsNotEmpty()
  chunkString: string;

  chunkNumber: string;
}
