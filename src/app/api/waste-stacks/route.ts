import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../prisma';

export async function GET(req: NextRequest) {
  try {
    const wasteStacks = await prisma.wasteStack.findMany();
    return NextResponse.json(wasteStacks, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { stackNo, wasteTypeId, totalQuantity } = await req.json();
    const newWasteStack = await prisma.wasteStack.create({
      data: {
        stackNo,
        wasteTypeId,
        totalQuantity,
      },
    });
    return NextResponse.json(newWasteStack, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}
