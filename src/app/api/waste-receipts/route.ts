import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../prisma';

export async function GET(req: NextRequest) {
  try {
    const wasteReceipts = await prisma.wasteReceipt.findMany();
    return NextResponse.json(wasteReceipts, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
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
    const newWasteReceipt = await prisma.wasteReceipt.create({
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
    return NextResponse.json(newWasteReceipt, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}
