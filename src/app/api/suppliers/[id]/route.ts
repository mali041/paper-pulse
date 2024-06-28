import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const supplier = await prisma.supplier.findUnique({
      where: { id: Number(id) },
    });
    if (!supplier) {
      return NextResponse.json({ message: 'Supplier not found' }, { status: 404 });
    }
    return NextResponse.json(supplier, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { name, phoneNo } = await req.json();

  try {
    const updatedSupplier = await prisma.supplier.update({
      where: { id: Number(id) },
      data: { name, phoneNo },
    });
    return NextResponse.json(updatedSupplier, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.supplier.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: 'Supplier deleted' }, { status: 204 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}
