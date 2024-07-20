import api from '../../services/api';
import { User } from '../../hooks/auth';
import GetCardFlag from './get_card_flag';
import env from '../../Config/Environment';

interface CardProps {
  cardName: string;
  cardNumber: string;
  cardCvc: string;
  cardExpiry: string;
}

interface ReturnProps {
  paid: boolean;
  id_transaction: number;
  payment_profile: string;
  customer_id: number;
}

export async function PayCreditCard(
  user: User,
  price: number,
  product_id: number,
  cardProps: CardProps,
  payment_profile: string,
): Promise<ReturnProps> {
  let gateway_token = '';
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

  if (payment_profile === '') {
    const paymentData = {
      holder_name: cardProps.cardName,
      registry_code: user.ssn
        .replace('.', '')
        .replace('.', '')
        .replace('-', ''),
      card_expiration: cardProps.cardExpiry,
      allow_as_fallback: true,
      card_number: cardProps.cardNumber,
      card_cvv: cardProps.cardCvc,
      payment_method_code: 'credit_card',
      payment_company_code: GetCardFlag(cardProps.cardNumber),
    };

    try {
      const response = await api.post(
        '/payments/createPaymentProfile',
        paymentData,
      );
      gateway_token = String(response.data.gateway_token);
    } catch (error) {
      throw new Error();
    }
  }

  let billData = {};

  if (gateway_token > '') {
    billData = {
      customer_id,
      payment_method_code: 'credit_card',
      bill_items: [
        {
          product_id,
          amount: price,
        },
      ],
      payment_profile: {
        gateway_token,
        payment_method_code: 'credit_card',
        payment_company_code: GetCardFlag(
          cardProps.cardNumber.replace(/\s/g, ''),
        ),
      },
    };
  } else {
    billData = {
      customer_id,
      payment_method_code: 'credit_card',
      bill_items: [
        {
          product_id,
          amount: price,
        },
      ],
      payment_profile: {
        id: Number(payment_profile),
      },
    };
  }

  const dataToReturn = {
    paid: false,
    id_transaction: 0,
    payment_profile: '',
    customer_id: 0,
  };

  try {
    const response = await api.post('/payments/payBill', billData);
    dataToReturn.paid = true;
    dataToReturn.id_transaction = Number(response.data.paymentProps.id);
    dataToReturn.payment_profile =
      payment_profile > ''
        ? ''
        : String(response.data.paymentProps.payment_profile_id);
    dataToReturn.customer_id =
      customer_id === 0 ? user.customer_id : customer_id;
  } catch (error) {
    throw new Error();
  }

  return dataToReturn;
}
