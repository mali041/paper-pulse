import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const wasteReceived = await prisma.wasteReceived.findUnique({
      where: { id: Number(id) },
    });
    if (!wasteReceived) {
      return NextResponse.json({ message: 'Waste received not found' }, { status: 404 });
    }
    return NextResponse.json(wasteReceived, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const {
    receiptDate,
    supplierId,
    vehicleNo,
    receiptId,
    wasteTypeId,
    unitPrice,
    netWeightOfWaste,
    totalAmountOfWaste,
    paymentReceived,
    balance,
  } = await req.json();

  try {
    const updatedWasteReceived = await prisma.wasteReceived.update({
      where: { id: Number(id) },
      data: {
        receiptDate: new Date(receiptDate),
        supplierId,
        vehicleNo,
        receiptId,
        wasteTypeId,
        unitPrice,
        netWeightOfWaste,
        totalAmountOfWaste,
        paymentReceived,
        balance,
      },
    });
    return NextResponse.json(updatedWasteReceived, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.wasteReceived.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: 'Waste received deleted' }, { status: 204 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}
