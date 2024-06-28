import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const payment = await prisma.payment.findUnique({
      where: { id: Number(id) },
    });
    if (!payment) {
      return NextResponse.json({ message: 'Payment not found' }, { status: 404 });
    }
    return NextResponse.json(payment, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { date, type, senderName, amount, receiverName } = await req.json();

  try {
    const updatedPayment = await prisma.payment.update({
      where: { id: Number(id) },
      data: { date: new Date(date), type, senderName, amount, receiverName },
    });
    return NextResponse.json(updatedPayment, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.payment.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: 'Payment deleted' }, { status: 204 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}
