import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../prisma';

export async function GET(req: NextRequest) {
  try {
    const suppliers = await prisma.supplier.findMany();
    return NextResponse.json(suppliers, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, phoneNo } = await req.json();
    const newSupplier = await prisma.supplier.create({
      data: {
        name,
        phoneNo,
      },
    });
    return NextResponse.json(newSupplier, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}