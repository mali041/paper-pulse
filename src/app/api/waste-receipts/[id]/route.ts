import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const wasteReceipt = await prisma.wasteReceipt.findUnique({
      where: { id: Number(id) },
    });
    if (!wasteReceipt) {
      return NextResponse.json({ message: 'Waste receipt not found' }, { status: 404 });
    }
    return NextResponse.json(wasteReceipt, { status: 200 });
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
    wasteTypeId,
    stackNo,
    vehicleWeightWithWaste,
    vehicleWeightWithoutWaste,
    netWeightOfWaste,
    unitPrice,
  } = await req.json();

  try {
    const updatedWasteReceipt = await prisma.wasteReceipt.update({
      where: { id: Number(id) },
      data: {
        receiptDate: new Date(receiptDate),
        supplierId,
        vehicleNo,
        wasteTypeId,
        stackNo,
        vehicleWeightWithWaste,
        vehicleWeightWithoutWaste,
        netWeightOfWaste,
        unitPrice,
      },
    });
    return NextResponse.json(updatedWasteReceipt, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.wasteReceipt.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: 'Waste receipt deleted' }, { status: 204 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}
