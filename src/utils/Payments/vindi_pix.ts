import api from '@app/services/api';
import { User } from '@app/hooks/auth';

interface ReturnProps {
  id_transaction: string;
  pix_code: string;
  pix_qr_code: string;
}

export async function PayPix(
  user: User,
  price: number,
  product_id: number,
): Promise<ReturnProps> {
  let customer_id = 0;

  const existingCustomer = await api.get(
    `/payments/verifyCustomerExists?ssn=${user.ssn
      .replace('.', '')
      .replace('.', '')
      .replace('-', '')}`,
  );

  customer_id = Number(existingCustomer.data.id);

  if (customer_id === 0) {
    const data = {
      name: user.name,
      email: user.email,
      registry_code: user.ssn
        .replace('.', '')
        .replace('.', '')
        .replace('-', ''),
      address: {
        street: user.street,
        number: user.number,
        additional_details: user.complement,
        zipcode: user.zipCode,
        neighborhood: user.district,
        city: user.city,
        state: user.state,
        country: 'BR',
      },
    };

    try {
      const response = await api.post('/payments/createProfile', data);

      customer_id = Number(response.data.customer_id);
    } catch (error) {
      throw new Error();
    }
  }

  let billData = {};

  billData = {
    customer_id,
    payment_method_code: 'pix',
    bill_items: [
      {
        product_id,
        amount: price,
      },
    ],
  };

  const dataToReturn: ReturnProps = {
    id_transaction: '',
    pix_code: '',
    pix_qr_code: '',
  };

  try {
    const response = await api.post('/payments/payPix', billData);
    dataToReturn.id_transaction = String(response.data.paymentProps.id);
    dataToReturn.pix_code = String(response.data.paymentProps.pix_code);
    dataToReturn.pix_qr_code = String(response.data.paymentProps.pix_qr_code);
  } catch (error) {
    throw new Error();
  }

  return dataToReturn;
}
