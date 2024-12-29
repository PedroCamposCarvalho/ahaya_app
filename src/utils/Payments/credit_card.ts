import axios from 'axios';
import env from '../../Config/Environment';
import { User } from '../../hooks/auth';

interface FunctionProps {
  price: number;
  cardName: string;
  cardNumber: string;
  cardCvc: string;
  cardExpiry: string;
  productDescription: string;
}

async function CreditCardPayment(
  props: FunctionProps,
  user: User,
): Promise<string> {
  const headers = {
    'x-api-key': env.x_api_key,
    'Content-Type': 'application/json',
  };

  const data = {
    IsSandbox: true,
    Application: 'Beach Sports Center',
    Vendor: 'ANTONIO PRIMO FERREIRA NETO',
    CallbackUrl: 'https://callbacks.exemplo.com.br/api/Notify',
    PaymentMethod: '2',
    Customer: {
      Name: user.name,
      Identity: user.ssn,
      Phone: user.cellphone,
      Email: user.email,
      Address: {
        ZipCode: user.zipCode,
        Street: user.street,
        Number: user.number,
        Complement: user.complement,
        District: user.district,
        CityName: user.city,
        StateInitials: user.state,
        CountryName: 'Brazil',
      },
    },
    Products: [
      {
        Code: '001',
        Description: props.productDescription,
        UnitPrice: props.price,
        Quantity: 1,
      },
    ],
    PaymentObject: {
      Holder: props.cardName,
      CardNumber: props.cardNumber,
      ExpirationDate: props.cardExpiry,
      SecurityCode: props.cardCvc,
      InstallmentQuantity: 1,
    },
  };
  let id_transaction = '';

  const response = await axios.post(
    'https://payment.safe2pay.com.br/v2/Payment',
    data,
    {
      headers,
    },
  );
  if (response.data.ResponseDetail.Message === 'Pagamento Autorizado') {
    id_transaction = response.data.ResponseDetail.IdTransaction;
  }
  return id_transaction;
}

export default CreditCardPayment;
