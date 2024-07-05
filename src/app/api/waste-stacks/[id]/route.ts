import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const wasteStack = await prisma.wasteStack.findUnique({
      where: { id: Number(id) },
    });
    if (!wasteStack) {
      return NextResponse.json({ message: 'Waste stack not found' }, { status: 404 });
    }
    return NextResponse.json(wasteStack, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { stackNo, wasteTypeId, totalQuantity } = await req.json();

  try {
    const updatedWasteStack = await prisma.wasteStack.update({
      where: { id: Number(id) },
      data: {
        stackNo,
        wasteTypeId,
        totalQuantity,
      },
    });
    return NextResponse.json(updatedWasteStack, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const wasteStackId = Number(id);

  try {
    await prisma.wasteStack.delete({ where: { id: wasteStackId } });

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    console.error("Error deleting wasteStack:", error);

    console.error("Error details:", {
      id,
      wasteStackId,
      error: error.message,
      stack: error.stack,
    });
    
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

