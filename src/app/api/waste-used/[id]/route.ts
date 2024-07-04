import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const wasteUsage = await prisma.wasteUsage.findUnique({
      where: { id: Number(id) },
    });
    if (!wasteUsage) {
      return NextResponse.json({ message: 'Waste usage entry not found' }, { status: 404 });
    }
    return NextResponse.json(wasteUsage, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { stackNo, wasteTypeId, usedQuantity, usageDate } = await req.json();

  try {
    const updatedWasteUsage = await prisma.wasteUsage.update({
      where: { id: Number(id) },
      data: {
        stackNo,
        wasteTypeId,
        usedQuantity,
        usageDate: new Date(usageDate),
      },
    });
    return NextResponse.json(updatedWasteUsage, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const wasteUsageId = Number(id);

  try {
    await prisma.wasteUsage.delete({ where: { id: wasteUsageId } });

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    console.error("Error deleting wasteUsage:", error);

    console.error("Error details:", {
      id,
      wasteUsageId,
      error: error.message,
      stack: error.stack,
    });
    
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
