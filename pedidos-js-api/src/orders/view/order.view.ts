import { ApiProperty } from "@nestjs/swagger"

export class OrderView {
  @ApiProperty()
  id: string

  @ApiProperty()
  title: string

  @ApiProperty()
  status: string

  @ApiProperty()
  createdAt: Date
}