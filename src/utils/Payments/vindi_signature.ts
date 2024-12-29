import api from '../../services/api';
import { User } from '../../hooks/auth';
import env from '../../Config/Environment';
import GetCardFlag from './get_card_flag';

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

export async function PaySubscription(
  user: User,
  amount: number,
  product_id: number,
  cardProps: CardProps,
  payment_profile: string,
  plan_id: number,
): Promise<ReturnProps> {
  let gateway_token = '';
  let customer_id = 0;

  const existingCustomer = await api.get(
    `/profile/verifyCustomerExists?ssn=${user.ssn
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
      const response = await api.post('/profile/createProfile', data);

      customer_id = Number(response.data.customer_id);
    } catch (error) {
      throw new Error(error);
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
        '/profile/createPaymentProfile',
        paymentData,
      );
      gateway_token = String(response.data.gateway_token);
    } catch (error) {
      throw new Error(error);
    }
  }

  let billData = {};

  let productItems = [];

  for (var i = 0; i < amount; i++) {
    productItems.push({
      product_id: product_id,
      quantity: 1,
    });
  }

  billData = {
    plan_id,
    customer_id,
    payment_method_code: 'credit_card',
    product_items: productItems,
    payment_profile: {
      gateway_token: gateway_token,
      payment_method_code: 'credit_card',
      payment_company_code: GetCardFlag(cardProps.cardNumber),
    },
    invoice_split: false,
  };

  const dataToReturn = {
    paid: false,
    id_transaction: 0,
    payment_profile: '',
    customer_id: 0,
  };

  try {
    const response = await api.post('/profile/createSignature', billData);
    dataToReturn.paid = true;
    dataToReturn.id_transaction = Number(response.data.paymentProps.id);
    dataToReturn.payment_profile =
      payment_profile > ''
        ? ''
        : String(response.data.paymentProps.payment_profile_id);
    dataToReturn.customer_id =
      customer_id === 0 ? user.customer_id : customer_id;
  } catch (error) {
    throw new Error(error);
  }

  return dataToReturn;
}
