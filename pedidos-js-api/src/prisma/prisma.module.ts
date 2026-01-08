import { Module, Global } from "@nestjs/common"
import { PrismaService } from "./prisma.service"

@Global()
@Module({
  providers: [
    {
      provide: PrismaService,
      useFactory: () => {
        return PrismaService.getInstance()
      },
    },
  ],
  exports: [PrismaService]
})
export class PrismaModule { }