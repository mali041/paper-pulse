import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const wasteType = await prisma.wasteType.findUnique({
      where: { id: Number(id) },
    });
    if (!wasteType) {
      return NextResponse.json({ message: 'Waste type not found' }, { status: 404 });
    }
    return NextResponse.json(wasteType, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { name } = await req.json();

  try {
    const updatedWasteType = await prisma.wasteType.update({
      where: { id: Number(id) },
      data: { name },
    });
    return NextResponse.json(updatedWasteType, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.wasteType.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: 'Waste type deleted' }, { status: 204 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}
