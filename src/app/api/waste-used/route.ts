import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../prisma';

export async function GET(req: NextRequest) {
  try {
    const wasteUsages = await prisma.wasteUsage.findMany();
    return NextResponse.json(wasteUsages, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { stackNo, wasteTypeId, usedQuantity, usageDate } = await req.json();
    const newWasteUsage = await prisma.wasteUsage.create({
      data: {
        stackNo,
        wasteTypeId,
        usedQuantity,
        usageDate: new Date(usageDate),
      },
    });
    return NextResponse.json(newWasteUsage, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}
