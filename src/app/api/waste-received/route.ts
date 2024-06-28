import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../prisma';

export async function GET(req: NextRequest) {
  try {
    const wasteReceived = await prisma.wasteReceived.findMany();
    return NextResponse.json(wasteReceived, { status: 200 });
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
      receiptId,
      wasteTypeId,
      unitPrice,
      netWeightOfWaste,
      totalAmountOfWaste,
      paymentReceived,
      balance,
    } = await req.json();
    const newWasteReceived = await prisma.wasteReceived.create({
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
    return NextResponse.json(newWasteReceived, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}
