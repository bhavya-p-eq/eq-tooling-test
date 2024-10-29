import { NextApiRequest, NextApiResponse } from 'next';
import { Rental } from '../../types/rental';
import { calculateRentalCost } from '../../utils/calculateRental';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const rental: Rental = req.body;
    console.log('passing rental', rental);
    const totalCost = calculateRentalCost(rental);
    res.status(200).json({ totalCost });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
