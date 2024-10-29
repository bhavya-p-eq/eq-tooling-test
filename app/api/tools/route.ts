import { NextResponse } from 'next/server';
import { Tool } from '../../../types/tool';

const tools: Tool[] = [
    { type: 'chainsaw', code: 'CHNS', brand: 'Stihl' },
    { type: 'ladder', code: 'LADW', brand: 'Werner' },
    { type: 'jackhammer', code: 'JAKD', brand: 'DeWalt' },
    { type: 'jackhammer', code: 'JAKR', brand: 'Ridgid' },
];

export async function GET() {
    return NextResponse.json(tools);
}
