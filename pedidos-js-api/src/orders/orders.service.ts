import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { PrismaService } from "../prisma/prisma.service"
import { OrderView } from "./view/order.view"

@Injectable()
export class OrdersService {
  constructor(
    private readonly prismaService: PrismaService
  ) { }

  async create(createOrderDto: CreateOrderDto): Promise<OrderView> {
    const order = await this.prismaService.order.create({
      data: {
        title: createOrderDto.title,
        status: 'PENDING'
      }
    })
    return order
  }

  async findAll(): Promise<OrderView[]> {
    const orders = await this.prismaService.order.findMany()
    return orders
  }

  async findOne(id: string): Promise<OrderView> {
    const order = await this.prismaService.order.findUnique({
      where: { id }
    })

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`)
    }

    return order
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<OrderView> {
    const order = await this.prismaService.order.update({
      where: { id },
      data: updateOrderDto
    })

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`)
    }

    return order
  }

  async remove(id: string): Promise<OrderView> {
    const order = await this.prismaService.order.delete({
      where: { id }
    })

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`)
    }

    return order
  }
}
