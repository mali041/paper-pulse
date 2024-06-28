import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../prisma';

export async function GET(req: NextRequest) {
  try {
    const wasteTypes = await prisma.wasteType.findMany();
    return NextResponse.json(wasteTypes, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();
    const newWasteType = await prisma.wasteType.create({
      data: {
        name,
      },
    });
    return NextResponse.json(newWasteType, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}
