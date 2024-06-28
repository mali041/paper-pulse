import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../prisma';

export async function GET(req: NextRequest) {
  try {
    const payments = await prisma.payment.findMany();
    return NextResponse.json(payments, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { date, type, senderName, amount, receiverName } = await req.json();
    const newPayment = await prisma.payment.create({
      data: {
        date: new Date(date),
        type,
        senderName,
        amount,
        receiverName,
      },
    });
    return NextResponse.json(newPayment, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}
